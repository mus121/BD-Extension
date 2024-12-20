import { MessageType } from "../types/common";
import { LinkedInService } from "./linkedin";

export const handleMessage = async (
  message: { type: MessageType; payload?: any },
  sendResponse: (response: any) => void,
) => {
  switch (message.type) {
    case MessageType.FETCH_PROFILE:
      const profileResponse = await LinkedInService.getProfile();
      sendResponse(profileResponse);
      break;

    case MessageType.FETCH_CONNECTIONS:
      const connections = await LinkedInService.getConnections(
        message.payload.start,
        message.payload.count,
      );
      sendResponse(connections);
      break;

    case MessageType.SEARCH_PROFILES:
      const searchResponse = await LinkedInService.searchProfiles(
        message.payload,
      );
      sendResponse(searchResponse);
      break;

    default:
      sendResponse({ error: { code: 400, message: "Unknown message type" } });
  }
};
