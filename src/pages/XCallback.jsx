import React, { useEffect, useState } from 'react';

const XCallback = () => {
  const x_client_id = import.meta.env.VITE_X_CLIENT_ID;
  const x_client_secret = import.meta.env.VITE_X_CLIENT_SECRET;
  const x_callback_url = import.meta.env.VITE_XREDIRECT_URI || `${window.location.origin}/xcallback`;
  const [status, setStatus] = useState('Processing authentication...');

  useEffect(() => {
    const fetchAccessToken = async (code) => {
      const codeVerifier = localStorage.getItem('twitter_code_verifier');
      if (!codeVerifier) {
        setStatus('Error: No code verifier found');
        return;
      }

      try {
        console.log('Fetching access token with code:', code);
        const response = await fetch('https://api.twitter.com/2/oauth2/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            grant_type: 'authorization_code',
            code,
            redirect_uri: x_callback_url,
            client_id: x_client_id,
            code_verifier: codeVerifier,
            client_secret: x_client_secret,
          }),
        });

        const responseText = await response.text();
        console.log('Token exchange response:', responseText);

        if (response.ok) {
          const data = JSON.parse(responseText);
          localStorage.setItem('twitter_access_token', data.access_token);
          setStatus('Access token stored successfully! Redirecting to guide...');
          setTimeout(() => {
            window.location.href = '/guide';
          }, 2000);
        } else {
          setStatus(`Error fetching access token: ${response.status} ${response.statusText}`);
          console.error('Error response:', responseText);
        }
      } catch (error) {
        setStatus(`Error: ${error.message}`);
        console.error('Fetch error:', error);
      }
    };

    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const error = params.get('error');
    const errorDescription = params.get('error_description');

    if (code) {
      fetchAccessToken(code);
    } else if (error) {
      setStatus(`Authentication error: ${error} - ${errorDescription}`);
      console.error('Authentication error:', error, errorDescription);
    } else {
      setStatus('No authorization code or error found');
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-gray-900 text-green-400 font-mono p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl mb-4">{status}</h1>
        <p>Please wait while we process your authentication.</p>
      </div>
    </div>
  );
};

export default XCallback;