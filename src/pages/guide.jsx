import React, { useState, useEffect } from "react";

const Guide = () => {
    const clientId = import.meta.env.VITE_LINKEDIN_CLIENT_ID;
    const redirectUri =
      import.meta.env.VITE_REDIRECT_URI || `${window.location.origin}/callback`;
    const x_callback_url =
      import.meta.env.VITE_XREDIRECT_URI || `${window.location.origin}/xcallback`;
    const x_client_id = import.meta.env.VITE_X_CLIENT_ID;
  
    const [mediumToken, setMediumToken] = useState("");
  
    const generateRandomState = () => {
      return (
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
      );
    };

  const initiateLinkedInAuth = () => {
    const linkedInAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
      redirectUri
    )}&state=${Date.now()}&scope=openid%20profile%20email%20w_member_social`;
    window.location.href = linkedInAuthUrl;
  };

  const initiateTwitterAuth = () => {
    const randomState = generateRandomState();
    const codeVerifier = generateCodeVerifier();
    const codeChallenge = generateCodeChallenge(codeVerifier);

    // Store the code verifier in localStorage to use it in the callback
    localStorage.setItem('twitter_code_verifier', codeVerifier);

    const xAuthUrl = `https://twitter.com/i/oauth2/authorize?response_type=code&client_id=${x_client_id}&redirect_uri=${encodeURIComponent(
      x_callback_url
    )}&scope=tweet.read%20tweet.write%20users.read&state=${randomState}&code_challenge=${codeChallenge}&code_challenge_method=S256`;
    
    console.log("Redirecting to Twitter Auth URL:", xAuthUrl);
    window.location.href = xAuthUrl;
  };

  const generateCodeVerifier = () => {
    const array = new Uint32Array(56/2);
    window.crypto.getRandomValues(array);
    return Array.from(array, dec => ('0' + dec.toString(16)).substr(-2)).join('');
  };

  const generateCodeChallenge = (verifier) => {
    return base64URLEncode(sha256(verifier));
  };

  const sha256 = async (plain) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    const hash = await window.crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hash))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  };

  const base64URLEncode = (str) => {
    return btoa(String.fromCharCode.apply(null, new Uint8Array(str)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=/g, '');
  };

  const handleSaveToken = () => {
    localStorage.setItem("mediumToken", mediumToken);
    alert("Token saved successfully!");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-gray-900 text-green-400 font-mono p-8 rounded-lg shadow-lg w-full max-w-3xl">
        <h1 className="text-4xl font-bold mb-6 mt-6 text-green-300">
          Token Generation Guide
        </h1>
        <p className="mb-10">
          All tokens generated below will be automatically stored. Simply click
          the buttons, complete the desired steps and then return back to the
          original form, and submit it.
        </p>
        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-green-300">Medium</h2>
          <ol className="list-decimal list-inside mb-4">
            <li>
              Go to&nbsp;
              <a
                href="https://medium.com/me/settings"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Medium Settings Page
              </a>
            </li>
            <li>Scroll down to the "Integration tokens" section</li>
            <li>Click on "Get integration token"</li>
            <li>Copy the generated token</li>
            <li>
              Paste the token in the box below and click on save
              <div className="flex items-center mt-2">
                <input
                  type="text"
                  value={mediumToken}
                  onChange={(e) => setMediumToken(e.target.value)}
                  className="border border-green-400 mt-5 rounded-lg px-2 py-2 mr-2 text-green-300 bg-black"
                  placeholder="Paste your token here"
                />
                <button
                  onClick={handleSaveToken}
                  className="bg-green-600 text-white mt-5 rounded-lg px-4 py-2 hover:bg-green-700"
                >
                  Save
                </button>
              </div>
            </li>
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-green-300">
            LinkedIn
          </h2>
          <ol className="list-decimal list-inside mb-4">
            <li>Make sure you're logged into your LinkedIn account</li>
            <li>Click the "Generate LinkedIn Token" button below</li>
            <li>You'll be redirected to LinkedIn's authorization page</li>
            <li>Review the permissions and click "Allow"</li>
            <li>
              You'll be redirected back to our app, and your token will be
              stored
            </li>
          </ol>
          <button
            onClick={initiateLinkedInAuth}
            className="bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700 mt-4"
          >
            Generate LinkedIn Token
          </button>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-2 text-green-300">
            Twitter (X)
          </h2>
          <ol className="list-decimal list-inside mb-4">
            <li>Ensure you're logged into your Twitter account</li>
            <li>Click the "Generate Twitter Token" button below</li>
            <li>You'll be taken to Twitter's authorization page</li>
            <li>Review the permissions and click "Authorize app"</li>
            <li>
              You'll be brought back to our app, and your token will be stored
            </li>
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
