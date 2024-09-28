// pages/api/postToLinkedIn.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { postContent, accessToken } = req.body;

  // Ensure all required fields are provided
  if (!postContent || !accessToken) {
    return res.status(400).json({ message: 'Post content and access token are required.' });
  }

  try {
    // Fetch user's LinkedIn profile to get the URN
    const userProfileResponse = await fetch('https://api.linkedin.com/v2/me', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!userProfileResponse.ok) {
      throw new Error('Failed to fetch LinkedIn profile');
    }

    const userProfile = await userProfileResponse.json();
    const linkedinId = userProfile.id; // Get the LinkedIn ID from the response

    // Prepare the request to post to LinkedIn
    const response = await fetch('https://api.linkedin.com/rest/posts', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        author: `urn:li:person:${linkedinId}`, // Use the URN format
        commentary: postContent,
        visibility: 'PUBLIC',
        distribution: {
          feedDistribution: 'MAIN_FEED',
          targetEntities: [],
          thirdPartyDistributionChannels: [],
        },
        lifecycleState: 'PUBLISHED',
        isReshareDisabledByAuthor: false,
      }),
    });

    // Check if the response is OK
    if (!response.ok) {
      return res.status(response.status).json({ message: 'Failed to post to LinkedIn' });
    }

    const result = await response.json();
    return res.status(200).json({ message: 'Posted to LinkedIn successfully', result });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error: error.toString() });
  }
}