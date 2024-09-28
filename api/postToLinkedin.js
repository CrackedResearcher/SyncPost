export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  
    const { postContent, accessToken, linkedinId } = req.body;
  
    if (!postContent || !accessToken || !linkedinId) {
      return res.status(400).json({ message: 'Post content, access token, and LinkedIn ID are required' });
    }
  
    const postData = {
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
  
    try {
      const response = await fetch("https://api.linkedin.com/v2/ugcPosts", {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        return res.status(response.status).json({ message: errorData.message });
      }
  
      return res.status(200).json({ message: 'Posted to LinkedIn successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error: error.toString() });
    }
  }