import { BD_HOST, LI_HOST } from "./constants";
import { ExternalMessageEnum } from "./types/common";
import { linkedinApiCall } from "./utils/linkedin";

chrome.runtime.onInstalled.addListener(function () {
  chrome.tabs.query({}, (keys_tabs) => {
    const LinkedIn = keys_tabs.filter((key) => {
      return key.url.includes(LI_HOST);
    });
    const BD_Tabs = keys_tabs.filter((key) => {
      return key.url.includes(BD_HOST);
    });
    if (LinkedIn.length > 0) {
      const tab = LinkedIn[0];
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["/content_scripts/linkedin.js"],
      });
    } else {
      chrome.tabs.create({
        url: LI_HOST,
      });
    }
    if (BD_Tabs.length > 0) {
      const tab = BD_Tabs[0];
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["/content_scripts/bd.js"],
      });
    }
  });
});

chrome.runtime.onMessageExternal.addListener(
  (message: string, _sender, sendResponse) => {
    const { type, endpoint, options } = JSON.parse(message) as {
      type: ExternalMessageEnum;
      endpoint: string;
      options: RequestInit;
    };
    switch (type) {
      case ExternalMessageEnum.MESSAGE: {
        sendResponse({
          signal: true,
        });
        break;
      }
      case ExternalMessageEnum.CLI: {
        linkedinApiCall(endpoint, options)
          .then((response) => {
            sendResponse(response);
          })
          .catch((error) => {
            sendResponse({ error: "Failed to fetch LinkedIn API data" });
          });
        break;
      }
      default:
        break;
    }
  }
);
