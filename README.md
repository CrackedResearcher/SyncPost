# SyncPost

Sync your blog posts across all your social media accounts with AI.

---
<img width="140" height="70" alt="image" src="https://github.com/user-attachments/assets/b7c618db-a8a8-4cc7-9936-7fb474fe2b1f">

<a href="https://sync-post.vercel.app" target="_blank"><img src="https://img.shields.io/badge/Try%20Now-%2300C853.svg?style=flat-square&logo=googlechrome&logoColor=white"/></a> 

<a href="https://twitter.com/0xayush1" target="_blank"><img src="https://img.shields.io/badge/Follow%20Me-%231DA1F2.svg?style=flat-square&logo=twitter&logoColor=white"/></a>

---

<img width="1181" alt="Screenshot 2024-09-29 at 3 51 05 PM" src="https://github.com/user-attachments/assets/3ed53ebf-3b7d-46fd-b174-cf9808664ca9">


## Table of Contents

- [What is SyncPost?](#what-is-syncpost)
- [Features](#features)
- [Supported Platforms](#supported-platforms)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)



## What is SyncPost?

SyncPost is an AI-powered tool designed for bloggers who want to share their content effortlessly across social media platforms. Many bloggers find it challenging to repurpose their posts for various channels due to time constraints. SyncPost solves this problem by automating the process.

With SyncPost, you can simply publish your blog posts and run the tool. The AI will automatically repurpose your content for all your connected social media accounts and post it directly.



## Features


- **Easy Cross-Posting**: Sync your blog posts to all your social media accounts with just one click.

- **Smart Content Repurposing**: Uses AI (OpenAI or Gemini) to shorten and adjust your content for different platforms, ensuring it connects with various audiences.

- **Fetch Latest Posts Automatically**: SyncPost grabs your newest blog posts from your site or RSS feed, so you never miss an update. You can also enter your blog post link, and it will work (this feature is supported as of now).

- **Safe Data Storage**: Your API key and information are kept securely in your browser, ensuring that only you can access them.

- **Link to Original Content**: Each post created by SyncPost includes a link back to your original blog post, helping to drive more visitors to your site.


## Supported Platforms

Cross-post your content effortlessly to major social media platforms, including:

- **Twitter/X**
- **LinkedIn**
- **Medium**

More platform support soon.


## Tech Stack

This project was made possible with the help of these technologies:

| Technology                        | Purpose                                          | Link                                  |
|-----------------------------------|--------------------------------------------------|---------------------------------------|
| Google Gemini 1.5 Flash API       | For LLM                                          | [Link](https://ai.google.dev)         |
| Jina AI                           | For creating LLM-ready data                      | [Link](https://jina.ai)               |
| X API                             | To connect to Twitter for posting via API        | [Link](https://developer.x.com)       |
| LinkedIn API                      | To connect to LinkedIn for posting via API       | [Link](https://developer.linkedin.com)|
| Medium API                        | To connect for posting via API                   | [Link](https://medium.com)            |



## Installation

Follow these steps to get SyncPost up and running:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/CrackedResearcher/SyncPost.git
   ```
2. **Navigate to the project directory**:
   ```bash
   cd SyncPost
   ```
3. **Install the required dependencies**:
   ```bash
   npm install
   ```



## Usage

To use SyncPost, follow these steps:

1. **Connect Your Accounts**: Link all your social media accounts to SyncPost.
2. **Add Your AI API Key**: Enter your OpenAI or Gemini API key.
3. **Publish a New Blog Post**: Write and publish a new blog post on your platform or RSS feed.
4. **Run SyncPost**: Launch SyncPost to automatically fetch your latest post and repurpose it for your connected accounts.

<img width="558" alt="Screenshot 2024-09-29 at 3 52 27 PM" src="https://github.com/user-attachments/assets/bf5e5d51-f43b-49fa-b250-cd056d926bae">


## Configuration

To configure SyncPost:

- **API Key**: Enter your OpenAI or Gemini API key in the settings. (Support for OpenAI coming soon)
- **Account Links**: Connect your social media accounts via the dashboard. (You will need to give permission for this)
- **Jina AI API Key**: You need to generate a Jina AI API key; it is required for getting LLM-ready data.



## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or suggestions.



## License

This project is licensed under the [MIT License](LICENSE).



## Contact

For inquiries or feedback, you can reach me on [X](https://x.com/0xayush1).
