import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const XCallback = () => {
  const [status, setStatus] = useState('Processing authentication...');
  const navigate = useNavigate();
  const location = useLocation();


  useEffect(() => {
    const handleCallback = async () => {
      const params = new URLSearchParams(location.search);
      const code = params.get('code');
      const state = params.get('state');
  
      if (code && state) {
        const storedState = localStorage.getItem('twitterOAuthState');
        if (state !== storedState) {
          setStatus('Invalid state. Authentication failed.');
          return;
        }
  
        try {
          const response = await fetch('/api/twitter-callback', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              code,
              codeVerifier: localStorage.getItem('twitterOAuthCodeChallenge'),
            }),
          });
  
          if (!response.ok) {
            throw new Error('Failed to exchange code for tokens');
          }
  
          const { access_token, refresh_token } = await response.json();
  
          localStorage.setItem('twitterAccessToken', access_token);
          localStorage.setItem('twitterRefreshToken', refresh_token);
  
          // Clear OAuth state and code challenge
          localStorage.removeItem('twitterOAuthState');
          localStorage.removeItem('twitterOAuthCodeChallenge');
  
          setStatus('Authentication successful. Redirecting...');
          navigate('/guide');
        } catch (error) {
          console.error('Error during token exchange:', error);
          setStatus('Authentication failed. Please try again.');
        }
      } else {
        setStatus('Invalid callback parameters');
      }
    };
  
    handleCallback();
  }, [location, navigate]);

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