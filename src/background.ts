import { deleteFromSTorage } from "./utils";
import {
  fetchLinkedinProfileData,
  fetchLinkedinConnections,
  connectionCount,
  searchProfiles,
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
    const start = 0;
    fetchLinkedinProfileData(start);
    fetchLinkedinConnections();
    connectionCount();
    // searchProfiles();
  }
  if (extension_detail.reason == "update") {
    const start = 0;
    fetchLinkedinProfileData(start);
    fetchLinkedinConnections();
    connectionCount();
    // searchProfiles();
  }
});
chrome.alarms.onAlarm.addListener((alarm) => {
  switch (alarm.name) {
    case "ALARAMS_ON": {
      const start = 0;
      fetchLinkedinProfileData(start);
      fetchLinkedinConnections();
      connectionCount();
      // searchProfiles();
      break;
    }
    default:
      break;
  }
});

chrome.runtime.onMessageExternal.addListener(
  (message: { type: string; start?: number, searchTerm?: string }, _sender, sendResponse) => {
    const { type, start, searchTerm } = message;
    switch (type) {
      case "MESSAGE": {
        return sendResponse({
          signal: true,
        });
        break;
      }
      case "LINKEDINPROFILE": {
        fetchLinkedinProfileData(start)
          .then((response) => {
            sendResponse({ response });
          })
          .catch((error) => {
            sendResponse({ error: "Failed to fetch LinkedIn profile data" });
          });
        break;
      }
      case "LINKEDCONNECTION": {
        fetchLinkedinConnections(start)
          .then((response) => {
            sendResponse({ response });
          })
          .catch((error) => {
            sendResponse({ error: "Failed to fetch LinkedIn Connection data" });
          });
        break;
      }
      case "LINKEDTOTALCONNECTION": {
        connectionCount()
          .then((response) => {
            sendResponse({ response });
          })
          .catch((error) => {
            sendResponse({
              error: "Failed to fetch LinkedIn Total Connection data",
            });
          });
        break;
      }

      case "SEARCHPROFILE": {
        const { searchTerm } = message;

        searchProfiles(searchTerm)
          .then((response) => {
            sendResponse({ response });
          })
          .catch((error) => {
            sendResponse({
              error: "Failed to fetch LinkedIn Search Profile data",
            });
          });
        break;
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
