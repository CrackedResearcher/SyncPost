import { GoogleGenerativeAI } from "@google/generative-ai";
import React, { useState, useEffect} from "react";

const RunTool = () => {
  const isValidUrl = (url) => {
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)" +
        "((([a-zA-Z\\d]([a-zA-Z\\d-]*[a-zA-Z\\d])*)\\.)+[a-zA-Z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-zA-Z\\d%@_.~+&:]*)*" +
        "(\\?[;&a-zA-Z\\d%@_.,~+&:=-]*)?" +
        "(\\#[-a-zA-Z\\d_]*)?$",
      "i"
    );
    return !!urlPattern.test(url);
  };

  const [blogUrl, setBlogUrl] = useState("");
  const [fetchedBlog, setfetchedblog] = useState("");
  

  const fetchPostsLogic = async () => {
    try {
      let formattedUrl = blogUrl;
      if (!/^https?:\/\//i.test(blogUrl)) {
        formattedUrl = `https://${blogUrl}`;
      }
      const requestUrl = `https://r.jina.ai/${formattedUrl}`;
      const jinaApiKey = localStorage.getItem("jinaApiKey");
      const response = await fetch(requestUrl, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jinaApiKey}`,
          Accept: "application/json",
        },
      });
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Failed to fetch blog content. Status: ${response.status}, Error: ${errorText}`
        );
      }
      const data = await response.json();
      setfetchedblog(data.data.content);
      console.log("setting the blog post content: ", data.data.content);
      return data.data.content;
    } catch (err) {
      console.error("Error fetching the post:", err);
      return null; // Return null if the process fails
    }
  };

  const repurposeContentLogic = async (data) => {
    return new Promise(async (resolve) => {
      const apikey = localStorage.getItem("apiKey");
      const genai = new GoogleGenerativeAI(`${apikey}`);

      const repurposedContents = {
        twitter: null,
        linkedin: null,
        medium: null,
      };
      console.log("in the repurpose fxn yhr value of content is: ", data);

      for (let i = 1; i <= 3; i++) {
        let injectPrompt = "";

        switch (i) {
          case 1:
            injectPrompt = `You are a writing assistant capable of repurposing blog content into long-form posts for Twitter. Your task is not to rewrite the entire content, but to match the original writing style and repurpose it for Twitter’s longer format, without worrying about word limits. Twitter now supports longer tweets, so there is no need to focus on brevity. Additionally, do not use hashtags. Simply craft a well-written, repurposed post.

You will not reply with anything other than the repurposed blog post.`;
            break;
          case 2:
            injectPrompt = `You are a writing assistant capable of repurposing blog content into posts for LinkedIn. Your task is not to rewrite the entire content but to match the original writing style and adapt it for LinkedIn’s format. You are allowed to use hashtags where relevant. Focus on creating a well-written and engaging post that fits the tone and style of the original content.

You will not reply with anything other than the repurposed blog post.
`;
            break;
          case 3:
            injectPrompt = `You are a writing assistant capable of repurposing blog content into posts for Medium. Your task is not to rewrite the entire content but to match the original writing style and adapt it for Medium’s format. Do not include hashtags in the post. Focus on crafting a well-written, engaging article that aligns with the original tone and style.

You will not reply with anything other than the repurposed blog post.`;
            break;
          default:
            break;
        }

        const model = genai.getGenerativeModel({
          model: "gemini-1.5-flash",
          systemInstruction: injectPrompt,
        });

        const prompt = `Here's the blog content that you have to repurpose: ${data}`;

        try {
          const res = await model.generateContent(prompt);
          console.log("res value: ", res.response.text());

          switch (i) {
            case 1:
              repurposedContents.twitter = res.response.text();
              break;
            case 2:
              repurposedContents.linkedin = res.response.text();
              break;
            case 3:
              repurposedContents.medium = res.response.text();
              break;
            default:
              break;
          }
        } catch (error) {
          console.error(`Error generating content for platform ${i}:`, error);

          switch (i) {
            case 1:
              repurposedContents.twitter = null;
              break;
            case 2:
              repurposedContents.linkedin = null;
              break;
            case 3:
              repurposedContents.medium = null;
              break;
            default:
              break;
          }
          return resolve(null); 
        }
      }
      resolve(repurposedContents);
    });
  };

  // For the post logic, return `null` if the process fails
  const postToTwitterLogic = () =>
    new Promise((resolve) =>
      setTimeout(() => {
        console.log("Posted to Twitter successfully.");
        resolve(true);
      }, 1000)
    ).catch((err) => {
      console.error("Failed to post to Twitter:", err);
      return null;
    });


  const postToLinkedInLogic = () =>
    new Promise((resolve) =>
      setTimeout(() => {
        console.log("Posted to LinkedIn successfully.");
        resolve(true);
      }, 1000)
    ).catch((err) => {
      console.error("Failed to post to LinkedIn:", err);
      return null;
    });
    

  const postToMediumLogic = () =>
    new Promise((resolve) =>
      setTimeout(() => {
        console.log("Posted to Medium successfully.");
        resolve(true);
      }, 1000)
    ).catch((err) => {
      console.error("Failed to post to Medium:", err);
      return null;
    });

  const [stepStatus, setStepStatus] = useState({
    FetchingPosts: "Not Started",
    RepurposingContent: "Not Started",
    PostingToTwitter: "Not Started",
    PostingToLinkedin: "Not Started",
    PostingToMedium: "Not Started",
  });

  const handleStartProcess = async () => {
    setStepStatus((prevStatus) => ({
      ...prevStatus,
      FetchingPosts: "In Progress",
    }));

    const data = await fetchPostsLogic();
    if (!data) {
      setStepStatus((prevStatus) => ({
        ...prevStatus,
        FetchingPosts: "Failed",
      }));
      return;
    }

    setStepStatus((prevStatus) => ({
      ...prevStatus,
      FetchingPosts: "Success",
      RepurposingContent: "In Progress",
    }));

    const repurposedData = await repurposeContentLogic(data);
    if (!repurposedData) {
      setStepStatus((prevStatus) => ({
        ...prevStatus,
        RepurposingContent: "Failed",
      }));
      return;
    }

    setStepStatus((prevStatus) => ({
      ...prevStatus,
      RepurposingContent: "Success",
      PostingToTwitter: "In Progress",
    }));

    const twitterResult = await postToTwitterLogic();
    if (!twitterResult) {
      setStepStatus((prevStatus) => ({
        ...prevStatus,
        PostingToTwitter: "Failed",
      }));
      return;
    }

    setStepStatus((prevStatus) => ({
      ...prevStatus,
      PostingToTwitter: "Success",
      PostingToLinkedin: "In Progress",
    }));

    const linkedinResult = await postToLinkedInLogic();
    if (!linkedinResult) {
      setStepStatus((prevStatus) => ({
        ...prevStatus,
        PostingToLinkedin: "Failed",
      }));
      return;
    }

    setStepStatus((prevStatus) => ({
      ...prevStatus,
      PostingToLinkedin: "Success",
      PostingToMedium: "In Progress",
    }));

    const mediumResult = await postToMediumLogic();
    if (!mediumResult) {
      setStepStatus((prevStatus) => ({
        ...prevStatus,
        PostingToMedium: "Failed",
      }));
      return;
    }

    setStepStatus((prevStatus) => ({
      ...prevStatus,
      PostingToMedium: "Success",
    }));
  };

  return (
    <div className="runtool flex flex-col items-start md:items-center justify-center min-h-screen bg-white px-4">
      <h2 className="text-3xl font-bold mb-4 text-green-600">Let's Begin</h2>
      <p className="text-left mb-6 text-gray-600 text-sm md:text-center">
        Please input the URL of your blog post, then click on the button below
        to start the blog fetching, summarization, and posting process.
      </p>
      <input
        type="text"
        value={blogUrl}
        onChange={(e) => setBlogUrl(e.target.value)}
        placeholder="Enter your blog post URL"
        className="border border-gray-300 rounded-lg px-4 py-2 mb-6 w-full max-w-md"
        required
      />
      <button
        className={`bg-green-600 text-white rounded-lg px-4 py-2 hover:bg-green-700 mb-6 ${
          !blogUrl || !isValidUrl(blogUrl)
            ? "opacity-50 cursor-not-allowed"
            : ""
        }`}
        onClick={handleStartProcess}
        disabled={!blogUrl || !isValidUrl(blogUrl)}
        title={
          !blogUrl || !isValidUrl(blogUrl)
            ? "You need to enter a valid URL to start this process"
            : ""
        }
      >
        Start Process
      </button>
      <div className="w-full max-w-md">
        <h3 className="text-lg font-bold text-green-600 mb-2">
          Process Steps:
        </h3>
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 pl-3 text-left text-gray-700">Step</th>
              <th className="py-2 pl-3 text-left text-gray-700">Status</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(stepStatus).map((step) => (
              <tr key={step} className="border-b">
                <td className="py-2 pl-3 text-gray-700">
                  {step.replace(/([A-Z])/g, " $1")}
                </td>
                <td
                  className={`py-2 pl-3 font-bold text-left ${
                    stepStatus[step] === "Success"
                      ? "text-green-600"
                      : "text-red-400"
                  }`}
                  style={{ width: "150px" }}
                >
                  {stepStatus[step]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RunTool;
