import { ApiResponse, LiDropDownApiResponse } from "@/types/apis/linkedin";
import { DropDownProfiles } from "@/types/apis/linkedin/TProfile";
import { linkedinApiCall } from "@/utils/linkedin";

export const liDropDownSearch = async (
  searchTerm: string
): Promise<LiDropDownApiResponse> => {
  if (!searchTerm) {
    throw new Error("Search term is required!");
  }

  const encodedSearchTerm = encodeURIComponent(searchTerm);

  const response: ApiResponse<LiDropDownApiResponse> =
    await linkedinApiCall<LiDropDownApiResponse>(
      `/voyager/api/graphql?variables=(start:0,origin:GLOBAL_SEARCH_HEADER,query:(keywords:${encodedSearchTerm},flagshipSearchIntent:SEARCH_SRP,queryParameters:List((key:resultType,value:List(PEOPLE))),includeFiltersInResponse:false))&queryId=voyagerSearchDashClusters.cd5ee9d14d375bf9ca0596cfe0cbb926`,
      {
        method: "GET",
      }
    );

  // Check if the response is an error
  if ("error" in response) {
    throw new Error(
      `API Error: ${response.message || "Unknown error"} (Code: ${
        response.code
      })`
    );
  }

  const elements = response?.data?.searchDashClustersByAll?.elements || [];

  const profiles = elements.flatMap((element: any) => {
    const items = element?.items || [];
    return items.map((item: any) => {
      const entityLockupView = item?.item?.entityResult;

      let publicIdentifier = "";
      const navigationUrl = entityLockupView?.navigationUrl || "N/A";
      if (navigationUrl.includes("linkedin.com/in/")) {
        const parts = navigationUrl.split("linkedin.com/in/");
        if (parts.length > 1) {
          publicIdentifier = parts[1].split(/[?#]/)[0];
        }
      }

      const image =
        entityLockupView?.image?.attributes?.[0]?.detailData
          ?.nonEntityProfilePicture?.vectorImage?.artifacts?.[0]
          ?.fileIdentifyingUrlPathSegment || "/assets/images/Avatar.png";

      const imageUrl = image.startsWith("http")
        ? image
        : `https://media.licdn.com/${image}`;

      return {
        title: entityLockupView?.title?.text || "N/A",
        subtitle: entityLockupView?.primarySubtitle?.text || "N/A",
        image: imageUrl,
        entityUrn: entityLockupView?.entityUrn || "N/A",
        publicIdentifier,
      };
    });
  });
  const filteredProfiles = profiles.filter(
    (profile: DropDownProfiles) =>
      profile.title !== "N/A" &&
      profile.subtitle !== "N/A" &&
      profile.image !== "/assets/images/Avatar.png" &&
      profile.entityUrn !== "N/A" &&
      profile.publicIdentifier !== ""
  );

  return filteredProfiles;
};
