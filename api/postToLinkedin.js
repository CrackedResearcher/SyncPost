// pages/api/postToLinkedIn.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    console.error('Method not allowed:', req.method);
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { accessToken } = req.body;

  // Ensure all required fields are provided
  if (!accessToken) {
    console.error('Missing required field: accessToken');
    return res.status(400).json({ message: 'Access token is required.' });
  }

  try {
    // Fetch user's LinkedIn profile to get the URN
    const userProfileResponse = await fetch('https://api.linkedin.com/v2/userinfo', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (!userProfileResponse.ok) {
      const errorDetails = await userProfileResponse.json();
      console.error('Failed to fetch LinkedIn profile:', errorDetails);
      throw new Error('Failed to fetch LinkedIn profile');
    }

    const userProfile = await userProfileResponse.json();
    const linkedinId = userProfile.sub;

    // Return the user's LinkedIn URN
    const urn = `urn:li:person:${linkedinId}`;
    console.log('Fetched LinkedIn URN successfully:', urn);
    return res.status(200).json({ message: 'Fetched LinkedIn URN successfully', urn });
  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ message: 'Server error', error: error.toString() });
  }
}