import React, { useEffect, useState } from 'react';

const XCallback = () => {
  const [status, setStatus] = useState('Processing authentication...');

  useEffect(() => {
    const fetchAccessToken = async (code) => {
      try {
        console.log('Exchanging code for access token:', code);
        const response = await fetch('/api/twitter-token-exchange', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code }),
        });

        const data = await response.json();
        if (response.ok) {
          localStorage.setItem('twitter_access_token', data.access_token);
          setStatus('Access token stored successfully! Redirecting to guide...');
          setTimeout(() => {
            window.location.href = '/guide';
          }, 2000);
        } else {
          setStatus(`Error fetching access token: ${data.message}`);
          console.error('Error response:', data.message);
        }
      } catch (error) {
        setStatus(`Error: ${error.message}`);
        console.error('Fetch error:', error);
      }
    };

    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const error = params.get('error');

    if (code) {
      fetchAccessToken(code);
    } else if (error) {
      setStatus(`Authentication error: ${error}`);
      console.error('Authentication error:', error);
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