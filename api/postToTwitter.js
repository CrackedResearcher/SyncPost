export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  
    const { tweetContent, accessToken } = req.body;
  
    if (!tweetContent || !accessToken) {
      return res.status(400).json({ message: 'Tweet content and access token are required' });
    }
  
    try {

      const response = await fetch('https://api.twitter.com/2/tweets', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: tweetContent,
        }),
      });
  

      if (!response.ok) {
        return res.status(response.status).json({ message: 'Failed to post to Twitter' });
      }
  
      const result = await response.json();
      return res.status(200).json({ message: 'Posted to Twitter successfully', result });
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error: error.toString() });
    }
  }