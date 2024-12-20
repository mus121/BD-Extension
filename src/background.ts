import { BD_HOST, LI_HOST } from "./constants";
import { ExternalMessageEnum } from "./types/common";
import { deleteFromSTorage } from "./utils";
import { liGlobalSearch } from "@/hooks/useLiGlobalSearch";
import { liProfile } from "@/hooks/useLiProfile";
import { liConnections } from "@/hooks/useLiConnections";
import { liTotalConnectionCount } from "@/hooks/useLiTotalConnectionCount";
import { liUserLocation } from "@/hooks/useLiUserLocation";
import { liGlobalySearch } from "@/hooks/useLiGlobalProfile";
// import { liEducation } from "@/hooks/useLiEducation";

chrome.runtime.onInstalled.addListener(function (extension_detail) {
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
  if (extension_detail.reason == "install") {
    chrome.storage.local.clear();
    // const publicIdentifier = "mustafa-kamal-250796252";
    // liUserLocation(publicIdentifier);
    // liProfile();
    // liGlobalySearch("Mustafa kamal");
    // liEducation();
  }
  if (extension_detail.reason == "update") {
    // const publicIdentifier = "mustafa-kamal-250796252";
    // liUserLocation(publicIdentifier);
    // liProfile();
    // liGlobalySearch("Mustafa kamal");
    // liEducation();
  }
});

chrome.alarms.onAlarm.addListener((alarm) => {
  switch (alarm.name) {
    case "ALARAMS_ON": {
      // const publicIdentifier = "mustafa-kamal-250796252";
      // liProfile();
      // liUserLocation(publicIdentifier);
      // liGlobalySearch("Mustafa kamal");
      break;
    }
    default:
      break;
  }
});

chrome.runtime.onMessageExternal.addListener(
  (
    message: {
      type: string;
      start?: number;
      searchTerm?: string;
      publicIdentifier?: string;
      page?: number;
    },
    _sender,
    sendResponse
  ) => {
    const { type, start, searchTerm, publicIdentifier, page } = message;

    console.log({ message });
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

        liGlobalSearch(searchTerm)
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

      case ExternalMessageEnum.LI_LOCATION: {
        liUserLocation(publicIdentifier)
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

      case ExternalMessageEnum.LI_GLOBAL_PROFILES: {
        liGlobalySearch(searchTerm, page).then((response) => {
          sendResponse({ response });
        });
        // .catch((error) => {
        //   sendResponse({
        //     error: "Failed to fetch LinkedIn Search Profile data",
        //   });
        // });
        break;
      }

      // have to discuss
      case "AUTHENTICATION_LOGOUT": {
        deleteFromSTorage("AUTH_TOKEN");
        break;
      }
      default:
        break;
    }
  }
);
