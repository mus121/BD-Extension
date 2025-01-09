import { ApiResponse, LiLocationApiResponse } from "@/types/apis/linkedin";
import { linkedinApiCall } from "@/utils/linkedin";

export const liUserLocation = async (publicIdentifier: string) => {
  const response: ApiResponse<LiLocationApiResponse> =
    await linkedinApiCall<LiLocationApiResponse>(
      `/voyager/api/graphql?includeWebMetadata=true&variables=(vanityName:${encodeURIComponent(
        publicIdentifier
      )})&queryId=voyagerIdentityDashProfiles.545b6b61da02e06975ba277b722ad219`,
      {
        method: "GET",
      }
    );

  const filterLocation =
    (response as any)?.data.identityDashProfilesByMemberIdentity?.elements?.[0]
      ?.geoLocation?.geo?.defaultLocalizedName || "";
  return filterLocation;
};
