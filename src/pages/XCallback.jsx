import React, { useEffect, useState } from 'react';

const XCallback = () => {
  const x_client_id = import.meta.env.VITE_X_CLIENT_ID;
  const x_client_secret = import.meta.env.VITE_X_CLIENT_SECRET;
  const x_callback_url = import.meta.env.VITE_XREDIRECT_URI || `${window.location.origin}/xcallback`;
  const [status, setStatus] = useState('Processing authentication...');

  useEffect(() => {
    const fetchAccessToken = async (code) => {
      try {
        const response = await fetch('https://api.twitter.com/2/oauth2/token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: x_callback_url,
            client_id: x_client_id,
            code_verifier: 'challenge',
            client_secret: x_client_secret,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('twitter_access_token', data.access_token);
          setStatus('Access token stored successfully! Redirecting to guide...');
          setTimeout(() => {
            window.location.href = '/guide';
          }, 2000);
        } else {
          const errorData = await response.json();
          setStatus(`Error fetching access token: ${errorData.error_description || response.statusText}`);
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