import { ApiResponse, LinkedinProfileApiResponse } from "@/types/apis/linkedin";
import { linkedinApiCall } from "@/utils/linkedin";

export const liProfile = async (): Promise<LinkedinProfileApiResponse> => {
  const response: ApiResponse<LinkedinProfileApiResponse> =
    await linkedinApiCall<LinkedinProfileApiResponse>("/voyager/api/me", {
      method: "GET",
    });

  // Check if the response is an error
  if ("error" in response) {
    throw new Error(
      `API Error: ${response.message || "Unknown error"} (Code: ${
        response.code
      })`
    );
  }
  console.log("Profile Response", response);
  return response;
};
