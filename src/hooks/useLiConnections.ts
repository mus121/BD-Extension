import { ApiResponse, LiConnectionsApiResponse } from "@/types/apis/linkedin";
import { linkedinApiCall } from "@/utils/linkedin";

export const liConnections = async (
  start = 0
): Promise<LiConnectionsApiResponse> => {
  const response: ApiResponse<LiConnectionsApiResponse> =
    await linkedinApiCall<LiConnectionsApiResponse>(
      `/voyager/api/relationships/dash/connections?decorationId=com.linkedin.voyager.dash.deco.web.mynetwork.ConnectionListWithProfile-16&count=10&q=search&sortType=RECENTLY_ADDED&start=${
        start * 10
      }`,
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
  // Return successful response
  return response;
};
