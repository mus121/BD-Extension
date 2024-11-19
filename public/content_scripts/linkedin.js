setLinekincrfToken();
const interval = setInterval(() => {
  setLinekincrfToken();
}, 5000);

function setLinekincrfToken() {
  try {
    const JSESSIONID_REGEX = new RegExp('JSESSIONID=["]*(.*?)["]*;');
    if (document.cookie.match(JSESSIONID_REGEX) && chrome.runtime?.id) {
      var csrf_token = document.cookie.match(JSESSIONID_REGEX)[1];
      chrome.storage.local.set({ csrf_token: csrf_token });
    } else {
      clearInterval(interval);
    }
  } catch (err) {
    // clearInterval(interval);
  }
}
