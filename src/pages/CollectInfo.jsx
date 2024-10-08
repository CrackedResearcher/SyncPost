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
  const [jinaApiKey, setJinaApiKey] = useState(""); 

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("socialMediaIds", JSON.stringify(socialMediaIds));
    localStorage.setItem("apiKey", apiKey);
    localStorage.setItem("jinaApiKey", jinaApiKey); 

    setSocialMediaIds({
      twitter: "",
      linkedin: "",
      medium: "",
    });
    setApiKey("");
    setJinaApiKey(""); 

    alert("Data submitted successfully!");
    navigate("/open");
  };

  const clearLocalStorage = () => {
    localStorage.removeItem("socialMediaIds");
    localStorage.removeItem("apiKey");
    localStorage.removeItem("jinaApiKey");
    localStorage.removeItem("tokens"); 
    localStorage.removeItem("tokenData");
    localStorage.removeItem("tokenType");
    localStorage.removeItem("refreshToken");

    setSocialMediaIds({
      twitter: "",
      linkedin: "",
      medium: "",
    });
    setApiKey("");
    setJinaApiKey(""); 


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
            Jina AI API Key (generate one{" "}
            <a
              href="https://jina.ai"
              className="text-green-600 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
            ):
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
            Refresh tokens (imp) → generate these{" "}
            <Link
              to="/guide"
              className="text-green-600 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </Link>
            
          </label>
         
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
