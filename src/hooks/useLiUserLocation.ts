// import { ApiResponse, LinkedinProfileApiResponse } from "@/types/apis/linkedin";
import { linkedinApiCall } from "@/utils/linkedin";

export const liUserLocation = async (publicIdentifier: string) => {
  const response = await linkedinApiCall(
    `/voyager/api/graphql?includeWebMetadata=true&variables=(vanityName:${encodeURIComponent(
      publicIdentifier
    )})&queryId=voyagerIdentityDashProfiles.545b6b61da02e06975ba277b722ad219`,
    {
      method: "GET",
    }
  );
  console.log("LOcations", response);
  return response;
};
