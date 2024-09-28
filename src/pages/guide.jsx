import React from "react";

const Guide = () => {
  const clientId = import.meta.env.VITE_LINKEDIN_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_REDIRECT_URI || `${window.location.origin}/callback`;

  const initiateLinkedInAuth = () => {
    const linkedInAuthUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&state=${Date.now()}&scope=r_liteprofile%20r_emailaddress%20w_member_social`;
    window.location.href = linkedInAuthUrl;
  };

  const initiateTwitterAuth = () => {
    // Implement Twitter auth initiation
    alert('Twitter auth not implemented yet');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-gray-900 text-green-400 font-mono p-8 rounded-lg shadow-lg w-full max-w-3xl">
        {/* ... (rest of your JSX remains the same) ... */}
        <button
          onClick={initiateLinkedInAuth}
          className="bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700 mt-4"
        >
          Generate LinkedIn Token
        </button>
        {/* ... */}
        <button
          onClick={initiateTwitterAuth}
          className="bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700 mt-4"
        >
          Generate Twitter Token
        </button>
        {/* ... */}
      </div>
    </div>
  );
};

export default Guide;