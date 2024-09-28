import React, {useState, useEffect} from "react";

const Guide = () => {
    const val = "776buooj1tfxec"
    const initiateLinkedInAuth = () => {
      const linkedInAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${val}&redirect_uri=${encodeURIComponent('http://localhost:5173/callback')}&state=${Date.now()}&scope=r_liteprofile%20r_emailaddress%20w_member_social`;
      window.location.href = linkedInAuthUrl;
    };
  
    const initiateTwitterAuth = () => {
      // This part needs to be implemented with the actual request to get the request token
      const twitterAuthUrl = `https://api.twitter.com/oauth/authorize?oauth_token=REQUEST_TOKEN`;
      window.location.href = twitterAuthUrl;
    };
  
    // Function to handle the OAuth callback
    const handleOAuthCallback = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const linkedInCode = urlParams.get('code');
      const twitterToken = urlParams.get('oauth_token');
      const twitterVerifier = urlParams.get('oauth_verifier');
  
      if (linkedInCode) {
        await exchangeAuthCodeForLinkedInToken(linkedInCode);
      } else if (twitterToken && twitterVerifier) {
        await exchangeAuthCodeForTwitterToken(twitterToken, twitterVerifier);
      }
    };
  
    const exchangeAuthCodeForLinkedInToken = async (code) => {
      const response = await fetch('https://www.linkedin.com/oauth/v2/accessToken', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'authorization_code',
          code: code,
          redirect_uri: encodeURIComponent('http://localhost:5173/callback'), // Your actual redirect URI
          client_id: "776buooj1tfxec", // Access your client ID
          client_secret: "WPL_AP1.s4zHhvsAdug4a6Ez.zi3s0g==", // Access your client secret
        }),
      });
  
      const data = await response.json();
      if (data.access_token) {
        localStorage.setItem('linkedinAccessToken', data.access_token);
        alert('LinkedIn access token stored successfully!');
      } else {
        console.error('Failed to obtain LinkedIn access token:', data);
      }
    };
  
    const exchangeAuthCodeForTwitterToken = async (token, verifier) => {
      // Implement the token exchange for Twitter
      // This typically requires a server to securely handle the request
      alert('Twitter token exchange is not implemented yet.');
    };
  
    // Call handleOAuthCallback when the component mounts
    React.useEffect(() => {
      handleOAuthCallback();
    }, []);
  
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="bg-gray-900 text-green-400 font-mono p-8 rounded-lg shadow-lg w-full max-w-3xl">
          <h1 className="text-4xl font-bold mb-6 mt-6 text-green-300">Token Generation Guide</h1>
  
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-2 text-green-300">Medium</h2>
            <ol className="list-decimal list-inside mb-4">
              <li>
                Go to 
                <a href="https://medium.com/me/settings" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline"> Medium Settings Page</a>
              </li>
              <li>Scroll down to the "Integration tokens" section</li>
              <li>Click on "Get integration token"</li>
              <li>Copy the generated token</li>
              <li>Paste the token into the Medium token field in our app</li>
            </ol>
          </section>
  
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-2 text-green-300">LinkedIn</h2>
            <ol className="list-decimal list-inside mb-4">
              <li>Make sure you're logged into your LinkedIn account</li>
              <li>Click the "Generate LinkedIn Token" button below</li>
              <li>You'll be redirected to LinkedIn's authorization page</li>
              <li>Review the permissions and click "Allow"</li>
              <li>You'll be redirected back to our app, and your token will be stored</li>
            </ol>
            <button 
              onClick={initiateLinkedInAuth}
              className="bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700 mt-4"
            >
              Generate LinkedIn Token
            </button>
          </section>
  
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-2 text-green-300">Twitter (X)</h2>
            <ol className="list-decimal list-inside mb-4">
              <li>Ensure you're logged into your Twitter account</li>
              <li>Click the "Generate Twitter Token" button below</li>
              <li>You'll be taken to Twitter's authorization page</li>
              <li>Review the permissions and click "Authorize app"</li>
              <li>You'll be brought back to our app, and your token will be stored</li>
            </ol>
            <button 
              onClick={initiateTwitterAuth}
              className="bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700 mt-4"
            >
              Generate Twitter Token
            </button>
          </section>
        </div>
      </div>
    );
  };
  
  export default Guide;