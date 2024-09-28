import React, { useEffect, useState } from 'react';

const XCallback = () => {
  const x_client_id = import.meta.env.VITE_X_CLIENT_ID;
  const x_client_secret = import.meta.env.VITE_X_CLIENT_SECRET;
  const x_callback_url = import.meta.env.VITE_XREDIRECT_URI || `${window.location.origin}/xcallback`;

  const [status, setStatus] = useState('Processing authentication...');

  useEffect(() => {
    const fetchAccessToken = async (code) => {
      const clientId = x_client_id;
      const clientSecret = x_client_secret;
      const redirectUri = x_callback_url;

      const base64Credentials = btoa(`${clientId}:${clientSecret}`);

      try {
        const response = await fetch('https://api.x.com/2/oauth2/token', {
          method: 'POST',
          headers: {
            'Authorization': `Basic ${base64Credentials}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: redirectUri,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('access_token', data.access_token);
          setStatus('Access token stored successfully! Redirecting to guide...');

          setTimeout(() => {
            window.location.href = '/guide';
          }, 2000); 
        } else {
          setStatus(`Error fetching access token: ${response.statusText}`);
        }
      } catch (error) {
        setStatus(`Error: ${error.message}`);
      }
    };

    const params = new URLSearchParams(window.location.search);
    const code = params.get('code'); 

    if (code) {
      fetchAccessToken(code); 
    } else {
      setStatus('No authorization code found');
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