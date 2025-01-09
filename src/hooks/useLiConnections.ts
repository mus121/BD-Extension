import { ApiResponse, LiConnectionsApiResponse } from "@/types/apis/linkedin";
import { FilterMutualApiResponse } from "@/types/apis/linkedin/TMutualConnection";
import { linkedinApiCall } from "@/utils/linkedin";

export const liConnections = async (
  start = 0
): Promise<FilterMutualApiResponse> => {
  const response: ApiResponse<LiConnectionsApiResponse> =
    await linkedinApiCall<LiConnectionsApiResponse>(
      `/voyager/api/relationships/dash/connections?decorationId=com.linkedin.voyager.dash.deco.web.mynetwork.ConnectionListWithProfile-16&count=10&q=search&sortType=RECENTLY_ADDED&start=${
        start * 10
      }`,
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

  const elements = response.elements || [];

  const filterMutualConnections = elements
    .map((element) => {
      const firstName =
        element.connectedMemberResolutionResult?.firstName || "N/A";
      const lastName =
        element.connectedMemberResolutionResult?.lastName || "N/A";
      const headLine =
        element.connectedMemberResolutionResult?.headline || "N/A";
      const entityUrn =
        element.connectedMemberResolutionResult?.entityUrn || "N/A";
      const publicIdentifier =
        element.connectedMemberResolutionResult?.publicIdentifier || "N/A";

      const artifact =
        element.connectedMemberResolutionResult?.profilePicture
          ?.displayImageReference?.vectorImage?.artifacts?.[0];
      const completeImageUrl = artifact
        ? element.connectedMemberResolutionResult?.profilePicture
            ?.displayImageReference?.vectorImage?.rootUrl +
          artifact.fileIdentifyingUrlPathSegment
        : "/assets/images/LiDefault.png";

      return {
        firstName,
        lastName,
        completeImageUrl,
        headLine,
        entityUrn,
        publicIdentifier,
      };
    })
    .filter(
      (connection) =>
        connection.firstName !== "N/A" &&
        connection.lastName !== "N/A" &&
        connection.headLine !== "N/A"
    );

  return filterMutualConnections;
};
