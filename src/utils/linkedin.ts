import { fetchStorageItem, isOneDayOld, saveToStorage } from ".";
import {
  TUserBasicInfo,
  extractUserBasicInfo,
  TMeProfile,
} from "../types/linkedin/me";

export const linkedinApiCall = async <ResponseType>(
  endpoint: string,
  options: RequestInit
): Promise<ResponseType | null | { error: boolean; code: number }> => {
  const csrfToken = await fetchStorageItem<string>("csrf_token");

  if (csrfToken) {
    return await fetch(`${process.env.LINKEDIN_HOST_URL}${endpoint}`, {
      ...options,
      headers: {
        ...options.headers,
        "csrf-token": csrfToken,
      },
    })
      .then((response) => {
        if (response.status > 300) {
          throw new Error(`error_${response.status}`);
        }
        return response.json() as ResponseType;
      })
      .catch((error) => {
        // Improve error handling here:
        if (error instanceof Error) {
          const errorDetails = {
            message: error.message,
            stack: error.stack,
          };
          console.error(
            "Error occurred while calling LinkedIn API:",
            errorDetails
          );
        } else {
          console.error(
            "Error occurred while calling LinkedIn API:",
            JSON.stringify(error, null, 2)
          );
        }
        if (error.message.startsWith("error_")) {
          const [, errorCode] = error.message.split("_");
          return {
            error: true,
            code: Number(errorCode),
          };
        }
        return null;
      });
  }
  return null;
};

// const fetchCachedUserProfile = async (): Promise<null | TUserBasicInfo> => {
//   const lastFetchedTimestamp = await fetchStorageItem("lastFetchedTimestamp");
//   const cachedProfile = await fetchStorageItem("cachedProfile");

//   if (
//     typeof cachedProfile === "string" &&
//     typeof lastFetchedTimestamp === "string" &&
//     !isOneDayOld(Number(lastFetchedTimestamp))
//   ) {
//     return JSON.parse(cachedProfile) as TUserBasicInfo;
//   }

//   await saveToStorage("lastFetchedTimestamp", Date.now().toString());

//   const profileResponse = await linkedinApiCall<TMeProfile>("/voyager/api/me", {
//     method: "GET",
//   });

//   if (
//     profileResponse &&
//     "userProfile" in profileResponse &&
//     profileResponse.userProfile.publicIdentifier
//   ) {
//     const userBasicInfo = extractUserBasicInfo(profileResponse);
//     await saveToStorage("cachedProfile", JSON.stringify(userBasicInfo));
//     return userBasicInfo;
//   }

//   throw new Error("An unknown error occurred while fetching the profile.");
// };

export const fetchLinkedinProfileData = async () => {
  //   const me = await fetchCachedUserProfile(); // Fetch the user's data

  // Call LinkedIn API to get the profile data
  const response = await linkedinApiCall("/voyager/api/me", {
    method: "GET",
  });

  console.log("LinkedIn Profile Data:", response);
  return response;
};

export const fetchLinkedinConnections = async () => {
  //   const me = await fetchCachedUserProfile(); // Fetch the user's data

  // Call LinkedIn API to get the profile data
  const response = await linkedinApiCall(
    "/voyager/api/relationships/dash/connections?decorationId=com.linkedin.voyager.dash.deco.web.mynetwork.ConnectionListWithProfile-16&count=8&q=search&sortType=RECENTLY_ADDED&start=0",
    {
      method: "GET",
    }
  );

  console.log("Linkedin Profile Connections", response);
  return response;
};
