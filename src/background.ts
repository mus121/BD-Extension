import { deleteFromSTorage } from "./utils";
import {
  fetchLinkedinProfileData,
  fetchLinkedinConnections,
} from "./utils/linkedin";

chrome.runtime.onInstalled.addListener(function (extension_detail) {
  // Save BD_Host in chrome.storage
  chrome.storage.local.set({ BD_Host: "http://localhost:3000" });

  chrome.alarms.create("ALARAMS_ON", { periodInMinutes: 1 });

  chrome.tabs.query({}, (keys_tabs) => {
    chrome.storage.local.get("BD_Host", (data) => {
      const BD_Host = data.BD_Host || "http://localhost:3000";

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

  if (extension_detail.reason == "install") {
    chrome.storage.local.clear();
    fetchLinkedinProfileData();
    fetchLinkedinConnections();
  }
  if (extension_detail.reason == "update") {
    fetchLinkedinProfileData();
    fetchLinkedinConnections();
  }
});

chrome.alarms.onAlarm.addListener((alarm) => {
  switch (alarm.name) {
    case "ALARAMS_ON": {
      fetchLinkedinProfileData();
      fetchLinkedinConnections();
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
      case "LINKEDINPROFILE": {
        fetchLinkedinProfileData()
          .then((response) => {
            sendResponse({ response });
          })
          .catch((error) => {
            sendResponse({ error: "Failed to fetch LinkedIn profile data" });
          });
      }
      case "LINKEDCONNECTION": {
        fetchLinkedinConnections()
          .then((response) => {
            sendResponse({ response });
          })
          .catch((error) => {
            sendResponse({ error: "Failed to fetch LinkedIn profile data" });
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
