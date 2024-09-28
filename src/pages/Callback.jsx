import React, { useEffect, useState } from 'react';

const Callback = () => {
  const [status, setStatus] = useState('Authenticating...');

  const handleOAuthCallback = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const linkedInCode = urlParams.get('code');
    const error = urlParams.get('error');

    if (error) {
      setStatus(`Authentication failed: ${error}`);
      return;
    }

    if (linkedInCode) {
      try {
        await exchangeAuthCodeForLinkedInToken(linkedInCode);
      } catch (error) {
        setStatus(`Failed to exchange token: ${error.message}`);
      }
    } else {
      setStatus('No authentication code found in URL');
    }
  };

  const exchangeAuthCodeForLinkedInToken = async (code) => {
    const response = await fetch('/api/linkedin-token-exchange', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      throw new Error('Failed to exchange token');
    }

    const data = await response.json();
    if (data.access_token) {
      localStorage.setItem('linkedinAccessToken', data.access_token);
      setStatus('LinkedIn access token stored successfully!');
      setTimeout(() => { window.location.href = '/'; }, 2000);
    } else {
      throw new Error('No access token received');
    }
  };

  useEffect(() => {
    handleOAuthCallback();
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

export default Callback;