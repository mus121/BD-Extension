import { ApiResponse, LinkedinProfileApiResponse } from "@/types/apis/linkedin";
import { FilteredLinkedinProfile } from "@/types/apis/linkedin/TLIProfile";
import { linkedinApiCall } from "@/utils/linkedin";

export const liProfile = async (): Promise<LinkedinProfileApiResponse> => {
  const response: ApiResponse<LinkedinProfileApiResponse> =
    await linkedinApiCall<LinkedinProfileApiResponse>("/voyager/api/me", {
      method: "GET",
    });

  if ("error" in response) {
    throw new Error(
      `API Error: ${response.message || "Unknown error"} (Code: ${
        response.code
      })`
    );
  }

  // Filter LProfile
  // const filterLiProfile = response?.miniProfile;
  // const firstName = filterLiProfile?.firstName;
  // const lastName = filterLiProfile?.lastName;
  // const occupation = filterLiProfile?.occupation;
  // const entityUrn = filterLiProfile?.entityUrn;
  // const publicIdentifier = filterLiProfile?.publicIdentifier;
  // const picture =
  //   filterLiProfile?.picture?.["com.linkedin.common.VectorImage"]?.rootUrl;
  // const absolutePicture =
  //   filterLiProfile?.picture?.["com.linkedin.common.VectorImage"]
  //     ?.artifacts?.[0]?.fileIdentifyingUrlPathSegment;
  // const profilePicture =
  //   picture && absolutePicture ? picture + absolutePicture : null;

  // return {
  //   firstName,
  //   lastName,
  //   occupation,
  //   entityUrn,
  //   publicIdentifier,
  //   profilePicture,
  // };

  return response;
};
