const exchangeAuthCodeForLinkedInToken = async (code) => {
    const response = await fetch('/api/linkedin-token-exchange', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to exchange token');
    }
  
    const data = await response.json();
    if (data.access_token) {
      localStorage.setItem('linkedinAccessToken', data.access_token);
      setStatus('LinkedIn access token stored successfully!');
      setTimeout(() => { window.location.href = '/'; }, 2000);
    } else {
      throw new Error('No access token received');
    }
  };