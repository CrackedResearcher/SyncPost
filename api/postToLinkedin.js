// pages/api/postToLinkedIn.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    console.error('Method not allowed:', req.method);
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { postContent, accessToken } = req.body;

  // Ensure all required fields are provided
  if (!postContent || !accessToken) {
    console.error('Missing required fields:', { postContent, accessToken });
    return res.status(400).json({ message: 'Post content and access token are required.' });
  }

  try {
    // Fetch user's LinkedIn profile to get the URN
    const userProfileResponse = await fetch('https://api.linkedin.com/v2/userinfo', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!userProfileResponse.ok) {
      const errorDetails = await userProfileResponse.json();
      console.error('Failed to fetch LinkedIn profile:', errorDetails);
      throw new Error('Failed to fetch LinkedIn profile');
    }

    const userProfile = await userProfileResponse.json();
    const linkedinId = userProfile.sub; 

    const data = {
      author: `urn:li:person:${linkedinId}`,
      lifecycleState: "PUBLISHED",
      specificContent: {
        "com.linkedin.ugc.ShareContent": {
          shareCommentary: {
            text: postContent,
          },
          shareMediaCategory: "NONE",
        },
      },
      visibility: {
        "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
      },
    };
    
    // Convert the data object to a JSON string
    const jsonData = JSON.stringify(data);
    
    // Calculate the content length
    const contentLength = new TextEncoder().encode(jsonData).length;
    
    const response = await fetch('https://api.linkedin.com/v2/ugcPosts', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
        'Content-Length': contentLength.toString(), // Set Content-Length header
      },
      body: jsonData,
    });

    // Check if the response is OK
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Failed to post to LinkedIn:', errorData);
      return res.status(response.status).json({ message: `Failed to post to LinkedIn: ${errorData.errors[0].message}` });
    }

    const result = await response.json();
    console.log('Posted to LinkedIn successfully:', result);
    return res.status(200).json({ message: 'Posted to LinkedIn successfully', result });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ message: 'Server error', error: error.toString() });
  }
}