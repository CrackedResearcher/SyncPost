// api/twitter-token-exchange.js
export default async function handler(req, res) {
    // Allow only POST requests
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  
    const { code } = req.body;
  
    // Check if the code is provided
    if (!code) {
      return res.status(400).json({ message: 'Code is required' });
    }
  
    const x_client_id = process.env.VITE_X_CLIENT_ID; // Your Twitter Client ID
    const x_client_secret = process.env.VITE_X_CLIENT_SECRET; // Your Twitter Client Secret
    const x_callback_url = process.env.VITE_XREDIRECT_URI || `${process.env.BASE_URL}/xcallback`; // Redirect URI
  
    // Prepare the request body
    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: x_callback_url,
      client_id: x_client_id,
      client_secret: x_client_secret,
    });
  
    try {
      // Make the POST request to Twitter's token endpoint
      const response = await fetch('https://api.twitter.com/2/oauth2/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params.toString(),
      });
  
      // Parse the response
      const data = await response.json();
  
      // Check if the response is OK
      if (!response.ok) {
        return res.status(response.status).json(data);
      }
  
      // Return the access token and other data
      return res.status(200).json(data);
    } catch (error) {
      console.error('Error exchanging token:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }