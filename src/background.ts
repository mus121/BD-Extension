import { handleMessage } from "./services/messageHandler";
import { setLinkedInToken } from "./utils/token";

chrome.runtime.onInstalled.addListener(() => {
  setLinkedInToken();
});

chrome.cookies.onChanged.addListener((changeInfo) => {
  if (
    changeInfo.cookie.name === "JSESSIONID" &&
    changeInfo.removed === false &&
    changeInfo.cookie.domain?.includes("linkedin.com")
  ) {
    setLinkedInToken();
  }
});
chrome.runtime.onMessageExternal.addListener(
  (message, sender, sendResponse) => {
    handleMessage({ type: message, payload: sender }, sendResponse);
    return true;
  },
);
