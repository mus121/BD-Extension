setBDAuth_Token();
const interval = setInterval(() => {
  setBDAuth_Token();
}, 2000);

function setBDAuth_Token() {
  try {
    if (document.cookie.includes("SESSION_TOKEN=") && chrome.runtime?.id) {
      var authToken = document.cookie.split("SESSION_TOKEN=")[1];
      chrome.storage.local.set({ AUTH_TOKEN: authToken });
      console.log("hellllllllllllll");
    } else {
      clearInterval(interval);
    }
  } catch (err) {
    // clearInterval(interval);
  }
}
