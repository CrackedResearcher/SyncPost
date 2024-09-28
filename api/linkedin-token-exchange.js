// api/linkedin-token-exchange.js
export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  
    const { code } = req.body;
  
    if (!code) {
      return res.status(400).json({ message: 'Code is required' });
    }
  
    const redirectUri = process.env.VITE_REDIRECT_URI; // Ensure this is set in Vercel
    const clientId = process.env.VITE_LINKEDIN_CLIENT_ID; // Your LinkedIn Client ID
    const clientSecret = process.env.VITE_LINKEDIN_CLIENT_SECRET; // Your LinkedIn Client Secret
  
    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: redirectUri,
      client_id: clientId,
      client_secret: clientSecret,
    });
  
    try {
      const response = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        return res.status(response.status).json(data);
      }
  
      return res.status(200).json(data);
    } catch (error) {
      console.error('Error exchanging token:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }