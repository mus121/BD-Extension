import { deleteFromSTorage } from "./utils";
import { fetchLinkedinProfileData } from "./utils/linkedin";

chrome.runtime.onInstalled.addListener(function (details) {
  // Save BD_Host in chrome.storage
  chrome.storage.local.set({ BD_Host: "https://localhost:3000" });

  chrome.alarms.create("ALARAMS_ON", { periodInMinutes: 1 });

  chrome.tabs.query({}, (keys_tabs) => {
    chrome.storage.local.get("BD_Host", (data) => {
      const BD_Host = data.BD_Host || "https://localhost:3000";

      const LinkedIn = keys_tabs.filter((key) => {
        return key.url.includes("https://www.linkedin.com");
      });

      const BD_Tabs = keys_tabs.filter((key) => {
        return key.url.includes(BD_Host);
      });

      if (LinkedIn.length > 0) {
        const tab = LinkedIn[0];
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ["/content_scripts/linkedin.js"],
        });
      } else {
        chrome.tabs.create({
          url: "https://www.linkedin.com",
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

  if (details.reason == "install") {
    chrome.storage.local.clear();
    fetchLinkedinProfileData();
  }
  if (details.reason == "update") {
    fetchLinkedinProfileData();
  }
});

chrome.alarms.onAlarm.addListener((alarm) => {
  switch (alarm.name) {
    case "ALARAMS_ON": {
      fetchLinkedinProfileData();
      break;
    }

    default:
      break;
  }
});

chrome.runtime.onMessageExternal.addListener(
  (message: { type: string }, _sender, sendResponse) => {
    const { type } = message;

    switch (type) {
      case "MESSAGE": {
        return sendResponse({
          signal: true,
        });
      }
      case "AUTHENTICATION_LOGOUT": {
        deleteFromSTorage("AUTH_TOKEN");
        break;
      }
      default:
        break;
    }
  }
);
