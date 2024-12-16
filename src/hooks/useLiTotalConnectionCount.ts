import { ApiResponse, ConnectionCountApiResponse } from "@/types/apis/linkedin";
import { linkedinApiCall } from "@/utils/linkedin";

export const liTotalConnectionCount =
  async (): Promise<ConnectionCountApiResponse> => {
    const response: ApiResponse<ConnectionCountApiResponse> =
      await linkedinApiCall<ConnectionCountApiResponse>(
        "/voyager/api/search/dash/clusters?decorationId=com.linkedin.voyager.dash.deco.search.SearchClusterCollection-1&count=0&origin=Communities&q=all&query=(queryParameters:(resultType:List(CONNECTIONS)),flagshipSearchIntent:MYNETWORK_CURATION_HUB)&start=0",
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
    // Return the successful response
    return response;
  };
