import React from 'react';
import { useNavigate } from 'react-router-dom';

const Intro = () => {
    const navigate = useNavigate();

    const GotoInfoPage = () => {
        navigate("/info");
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <div className="bg-gray-900 text-green-400 font-mono p-8 rounded-lg shadow-lg w-full max-w-3xl">
                <h1 className="text-4xl font-bold mb-6 mt-6 text-green-300">We Heard You!</h1>
                <p className="text-lg mb-15">
                    Most of us have blogs, and we love publishing new content on them. But let's face it, we don’t always have the time to cross-post 
                    and repurpose our blog posts for all the social media platforms we’re on.
                </p>

                <h2 className="text-2xl font-semibold mb-6 text-green-300">
                    <code>Introducing SyncPost •</code>
                </h2>
                <pre className="whitespace-pre-wrap bg-gray-800 p-4 rounded-md text-green-300 overflow-auto mb-15">
                    <code>
                        SyncPost helps you solve this problem effortlessly.
                        From now on, whenever you publish a new blog post, simply run this tool once. 
                        It will automatically detect your latest post, repurpose it using AI for all your 
                        connected social media accounts, and post it for you—all in one go. Plus, it works entirely within your browser, locally.
                    </code>
                </pre>

                <h2 className="text-2xl font-semibold mb-6 text-green-300">Here's What You Need to Do Next:</h2>
                <ol className="text-lg list-decimal list-inside mb-7 space-y-4">
                    <li><strong className="text-red-400">Connect Your Accounts:</strong> Link all your social media accounts to SyncPost.</li>
                    <li><strong className="text-red-400">Add Your AI API Key:</strong> Enter your OpenAI or Gemini API key. This will be used for repurposing your content. (Don't worry—all your data is stored locally in your browser.)</li>
                    <li><strong className="text-red-400">Publish a New Blog Post:</strong> Write and publish a new blog post on your platform or RSS feed.</li>
                    <li><strong className="text-red-400">Run SyncPost:</strong> Launch SyncPost, which will automatically fetch your latest post, repurpose it using AI, and post it to your connected accounts.</li>
                    <li><strong className="text-red-400">Check for Traffic:</strong> Monitor the increase in traffic and engagement as your content reaches a broader audience!</li>
                </ol>

                <button className="py-3 px-5 my-10 border-2 border-red-50 rounded-lg" onClick={GotoInfoPage}>
                    Get Started Now
                </button>

                <h2 className="text-2xl font-semibold mb-6 text-green-300">In a Nutshell, Here's How SyncPost Works:</h2>
                <ol className="text-lg list-decimal list-inside mb-8 space-y-4">
                    <li><strong className="text-red-400">Fetching Latest Posts:</strong> Automatically retrieves the most recent posts from your blog or RSS feed.</li>
                    <li><strong className="text-red-400">AI-Powered Summarization:</strong> Uses LLMs (from OpenAI/Gemini) to summarize and repurpose your content for each platform, ensuring tailored posts for every audience.</li>
                    <li><strong className="text-red-400">Cross-Posting to Social Media:</strong> Seamlessly posts to platforms like:
                        <ul className="list-disc list-inside mt-2 ml-6">
                            <li className="text-red-400">Twitter/X</li>
                            <li className="text-red-400">Linkedin</li>
                            <li className="text-red-400">Medium</li>
                        </ul>
                    </li>
                </ol>

                <p className="text-lg mb-8">
                    Each post includes a link back to your original blog post, ensuring that your content stays visible and drives traffic to your site.
                </p>
            </div>
        </div>
    );
}

export default Intro;