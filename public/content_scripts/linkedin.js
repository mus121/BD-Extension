function setupLinkedInTokens() {
  const JSESSIONID_REGEX = /JSESSIONID=["']?(.*?)["']?;/;

  function extractAndStoreToken() {
    try {
      const match = document.cookie.match(JSESSIONID_REGEX);
      if (match && chrome.runtime?.id) {
        chrome.storage.local.set({ csrf_token: match[1] });
      }
    } catch (error) {
      console.error("Error extracting LinkedIn token:", error);
    }
  }

  extractAndStoreToken();

  const interval = setInterval(extractAndStoreToken, 5000);
  clearInterval(interval);
}

setupLinkedInTokens();
