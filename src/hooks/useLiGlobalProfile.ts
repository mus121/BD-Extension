import {
  ApiResponse,
  LiSearchProfilesApiResponse,
} from "@/types/apis/linkedin";
import { GlobalProfile } from "@/types/apis/linkedin/TProfile";
import { linkedinApiCall } from "@/utils/linkedin";

export const liGlobalySearch = async (searchTerm: string, page: number = 0) => {
  const resultsPerPage = 10;
  const start = page * resultsPerPage;
  const response: ApiResponse<LiSearchProfilesApiResponse> =
    await linkedinApiCall<LiSearchProfilesApiResponse>(
      `/voyager/api/graphql?variables=(start:${start},origin:GLOBAL_SEARCH_HEADER,query:(keywords:${searchTerm},flagshipSearchIntent:SEARCH_SRP,queryParameters:List((key:resultType,value:List(PEOPLE)),(key:searchId,value:List(df200630-b31a-4170-b80e-98f1f0b0ffe0))),includeFiltersInResponse:false))&queryId=voyagerSearchDashClusters.cd5ee9d14d375bf9ca0596cfe0cbb926`,
      {
        method: "GET",
      }
    );

  if ("error" in response) {
    throw new Error(
      `API Error: ${response.message || "Unknown error"} (Code: ${
        response.code
      })`
    );
  }

  const elements = response.data.searchDashClustersByAll?.elements || [];
  const totalCount = response.data.searchDashClustersByAll?.paging || [];
  const profiles = elements.flatMap((element: any) =>
    (element.items || []).map((item: any) => {
      const entityResult = item.item.entityResult;

      return {
        name: entityResult?.image?.accessibilityText || "N/A",
        imageUrl:
          entityResult?.image?.attributes?.[0]?.detailData
            ?.nonEntityProfilePicture?.vectorImage?.artifacts?.[0]
            ?.fileIdentifyingUrlPathSegment || "N/A",
        location: entityResult?.secondarySubtitle?.text || "N/A",
        headline: entityResult?.primarySubtitle?.text || "N/A",
        totalcount: totalCount || "N/A",
        public_Identifier: entityResult?.navigationUrl,
        entityUrn: entityResult?.entityUrn,
      };
    })
  );

  const filteredProfiles = profiles.filter(
    (profile: GlobalProfile) =>
      profile.name !== "N/A" &&
      profile.imageUrl !== "N/A" &&
      profile.location !== "N/A" &&
      profile.headline !== "N/A" &&
      profile.totalcount !== "N/A" &&
      profile.public_Identifier !== "N/A" &&
      profile.entityUrn !== "N/A"
  );

  return filteredProfiles;
};
