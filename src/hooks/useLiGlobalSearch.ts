import { ApiResponse, SearchProfilesApiResponse } from "@/types/apis/linkedin";
import { linkedinApiCall } from "@/utils/linkedin";

export const liGlobalSearch = async (
  searchTerm: string
): Promise<SearchProfilesApiResponse> => {
  if (!searchTerm) {
    throw new Error("Search term is required!");
  }

  const encodedSearchTerm = encodeURIComponent(searchTerm);

  const response: ApiResponse<SearchProfilesApiResponse> =
    await linkedinApiCall<SearchProfilesApiResponse>(
      `/voyager/api/graphql?variables=(query:${encodedSearchTerm})&queryId=voyagerSearchDashTypeahead.eeea0c1dfdf533272e9de4e98a59d725`,
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
