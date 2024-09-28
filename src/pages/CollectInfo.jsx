import React, { useState } from "react";
import "../form.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const CollectInfo = () => {
  const navigate = useNavigate();

  const [socialMediaIds, setSocialMediaIds] = useState({
    twitter: "",
    linkedin: "",
    medium: "",
  });
  const [apiKey, setApiKey] = useState("");
  const [jinaApiKey, setJinaApiKey] = useState(""); // New state for Jina AI API key
  const [tokenType, setTokenType] = useState(""); // For selecting the token type
  const [refreshToken, setRefreshToken] = useState(""); // For entering the refresh token
  const [tokens, setTokens] = useState(
    JSON.parse(localStorage.getItem("tokens")) || {} // Load saved tokens from local storage
  );

  const handleTokenSave = () => {
    if (tokenType && refreshToken) {
      // Save the new token in local state
      const updatedTokens = { ...tokens, [tokenType]: refreshToken };
      setTokens(updatedTokens);

      // Save to local storage
      localStorage.setItem("tokens", JSON.stringify(updatedTokens));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Save the token type and value before submitting
    handleTokenSave();

    // Store other data in local storage
    localStorage.setItem("socialMediaIds", JSON.stringify(socialMediaIds));
    localStorage.setItem("apiKey", apiKey);
    localStorage.setItem("jinaApiKey", jinaApiKey); // Store Jina AI API key

    setSocialMediaIds({
      twitter: "",
      linkedin: "",
      medium: "",
    });
    setApiKey("");
    setJinaApiKey(""); // Reset Jina AI API key
    setTokenType(""); // Reset token type
    setRefreshToken(""); // Reset refresh token

    alert("Data submitted successfully!");
    navigate("/open");
  };

  const clearLocalStorage = () => {
    localStorage.removeItem("socialMediaIds");
    localStorage.removeItem("apiKey");
    localStorage.removeItem("jinaApiKey"); // Remove Jina AI API key
    localStorage.removeItem("tokens"); // Remove all saved tokens
    localStorage.removeItem("tokenData");
    localStorage.removeItem("tokenType");
    localStorage.removeItem("refreshToken");

    setSocialMediaIds({
      twitter: "",
      linkedin: "",
      medium: "",
    });
    setApiKey("");
    setJinaApiKey(""); // Reset Jina AI API key
    setTokenType(""); // Reset token type
    setRefreshToken(""); // Reset refresh token
    setTokens({}); // Clear tokens state

    alert("Local storage cleared!");
  };

  return (
    <div className="formField flex items-center justify-center min-h-screen bg-gradient-to-r from-green-200 to-green-400 px-4">
      <form
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-green-600 text-center">
          SyncPost Setup
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Social Media IDs:</label>
          <input
            type="text"
            placeholder="Twitter ID"
            value={socialMediaIds.twitter}
            onChange={(e) =>
              setSocialMediaIds({ ...socialMediaIds, twitter: e.target.value })
            }
            className="border border-gray-300 rounded-lg p-2 w-full mb-2 focus:border-green-600"
          />
          <input
            type="text"
            placeholder="LinkedIn ID"
            value={socialMediaIds.linkedin}
            onChange={(e) =>
              setSocialMediaIds({ ...socialMediaIds, linkedin: e.target.value })
            }
            className="border border-gray-300 rounded-lg p-2 w-full mb-2 focus:border-green-600"
          />
          <input
            type="text"
            placeholder="Medium ID"
            value={socialMediaIds.medium}
            onChange={(e) =>
              setSocialMediaIds({ ...socialMediaIds, medium: e.target.value })
            }
            className="border border-gray-300 rounded-lg p-2 w-full mb-2 focus:border-green-600"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            OpenAI or Gemini API Key:
          </label>
          <input
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            required
            className="border border-gray-300 rounded-lg p-2 w-full focus:border-green-600"
          />
        </div>

        {/* New Jina AI API Key Field */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Jina AI API Key (generate one <a href="https://jina.ai" className="text-green-600 underline" target="_blank" rel="noopener noreferrer">here</a>):
          </label>
          <input
            type="text"
            value={jinaApiKey}
            onChange={(e) => setJinaApiKey(e.target.value)}
            required
            className="border border-gray-300 rounded-lg p-2 w-full focus:border-green-600"
          />
        </div>

        {/* Compact Token Type and Input */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
          Refresh tokens: (generate these <Link to="/guide" className="text-green-600 underline">here</Link>)
          </label>
          <div className="flex">
            <select
              value={tokenType}
              onChange={(e) => setTokenType(e.target.value)}
              required
              className="border border-gray-200 rounded-l-lg p-2 w-2/5 text-sm"
            >
              <option value="" disabled>
                Select token type
              </option>
              <option value="twitter">Twitter</option>
              <option value="linkedin">LinkedIn</option>
              <option value="medium">Medium</option>
            </select>
            <input
              type="text"
              placeholder="Enter Token"
              value={refreshToken}
              onChange={(e) => setRefreshToken(e.target.value)}
              required
              className="border border-l-0 border-gray-300 rounded-r-lg p-2 w-3/5 focus:border-green-600"
              onBlur={handleTokenSave} // Save the token when user finishes entering the token
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700 w-full"
        >
          Submit
        </button>

        {/* Clear Local Storage Link */}
        <p className="mt-4 text-center text-gray-600 text-sm">
          If you have previously set this up and wish to reset it,&nbsp;
          <span
            className="underline cursor-pointer"
            onClick={clearLocalStorage}
          >
            Click here
          </span>
          &nbsp;(this will remove all your stored data)
        </p>
      </form>
    </div>
  );
};

export default CollectInfo;