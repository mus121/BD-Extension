import { ApiResponse, SearchProfilesApiResponse } from "@/types/apis/linkedin";
import { linkedinApiCall } from "@/utils/linkedin";

export const liGlobalySearch = async (searchTerm: string, page: number = 0) => {
  const resultsPerPage = 10;
  const start = page * resultsPerPage;
  const response: any = await linkedinApiCall(
    `/voyager/api/graphql?variables=(start:${start},origin:GLOBAL_SEARCH_HEADER,query:(keywords:${searchTerm},flagshipSearchIntent:SEARCH_SRP,queryParameters:List((key:resultType,value:List(PEOPLE)),(key:searchId,value:List(df200630-b31a-4170-b80e-98f1f0b0ffe0))),includeFiltersInResponse:false))&queryId=voyagerSearchDashClusters.cd5ee9d14d375bf9ca0596cfe0cbb926`,
    {
      method: "GET",
    }
  );
  console.log({ response }, "smaj aye ");
  const elements = response.data.searchDashClustersByAll?.elements || [];
  const totalCount = response.data.searchDashClustersByAll?.paging || [];
  // Transform the data into an array of profiles
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
      };
    })
  );

  const filteredProfiles = profiles.filter(
    (profile: {
      name: string;
      imageUrl: string;
      location: string;
      headline: string;
      totalcount: any;
    }) =>
      profile.name !== "N/A" &&
      profile.imageUrl !== "N/A" &&
      profile.location !== "N/A" &&
      profile.headline !== "N/A" &&
      profile.totalcount !== "N/A"
  );

  console.log("Filtered Profiles Data:", filteredProfiles);

  return filteredProfiles;
};
