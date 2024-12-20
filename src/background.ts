import { handleMessage } from "./services/messageHandler";

chrome.runtime.onMessageExternal.addListener(
  (message, sender, sendResponse) => {
    handleMessage({ type: message, payload: sender }, sendResponse);
    return true;
  }
);