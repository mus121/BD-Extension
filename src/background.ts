import { BD_HOST, LI_HOST } from "./constants";
import { ExternalMessageEnum } from "./types/common";
import { deleteFromSTorage } from "./utils";
import { liDropDownSearch } from "@/hooks/useLiDropdownSearch";
import { liProfile } from "@/hooks/useLiProfile";
import { liConnections } from "@/hooks/useLiConnections";
import { liTotalConnectionCount } from "@/hooks/useLiTotalConnectionCount";
import { liUserLocation } from "@/hooks/useLiUserLocation";
import { liGlobalySearch } from "@/hooks/useLiGlobalProfile";
import { LiMessage } from "./types/apis/linkedin/TLiMessage";

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
  (message: LiMessage, _sender, sendResponse) => {
    const { type, start, searchTerm, publicIdentifier, page } = message;
    switch (type) {
      case ExternalMessageEnum.MESSAGE: {
        sendResponse({
          signal: true,
        });
        break;
      }
      case ExternalMessageEnum.LI_PROFILE: {
        liProfile()
          .then((response) => {
            sendResponse({ response });
          })
          .catch((error) => {
            sendResponse({ error: "Failed to fetch LinkedIn profile data" });
          });
        break;
      }
      case ExternalMessageEnum.LI_CONNECTION: {
        liConnections(start)
          .then((response) => {
            sendResponse({ response });
          })
          .catch((error) => {
            sendResponse({ error: "Failed to fetch LinkedIn Connection data" });
          });
        break;
      }
      case ExternalMessageEnum.LI_TOTAL_CONNECTION: {
        liTotalConnectionCount()
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

      case ExternalMessageEnum.LI_GLOBAL_DROPDOWN: {
        const { searchTerm } = message;

        liDropDownSearch(searchTerm)
          .then((response) => {
            sendResponse({ response });
          })
          .catch((error) => {
            sendResponse({
              error: "Failed to fetch LinkedIn Dropdown Profile data",
            });
          });
        break;
      }

      case ExternalMessageEnum.LI_LOCATION: {
        liUserLocation(publicIdentifier)
          .then((response) => {
            sendResponse({ response });
          })
          .catch((error) => {
            sendResponse({
              error: "Failed to fetch LinkedIn Location data",
            });
          });
        break;
      }

      case ExternalMessageEnum.LI_GLOBAL_PROFILES: {
        liGlobalySearch(searchTerm, page)
          .then((response) => {
            sendResponse({ response });
          })
          .catch((error) => {
            sendResponse({
              error: "Failed to fetch LinkedIn Global Search Profile data",
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
