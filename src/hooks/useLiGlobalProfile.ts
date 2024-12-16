import { ApiResponse, SearchProfilesApiResponse } from "@/types/apis/linkedin";
import { linkedinApiCall } from "@/utils/linkedin";
export const liGlobalySearch = async (searchTerm: string) => {
  if (!searchTerm) {
    throw new Error("Search term is required!");
  }
  const response = await linkedinApiCall(
    `/voyager/api/graphql?variables=(start:20,origin:GLOBAL_SEARCH_HEADER,query:(keywords:${searchTerm},flagshipSearchIntent:SEARCH_SRP,queryParameters:List((key:resultType,value:List(PEOPLE)),(key:searchId,value:List(df200630-b31a-4170-b80e-98f1f0b0ffe0))),includeFiltersInResponse:false))&queryId=voyagerSearchDashClusters.cd5ee9d14d375bf9ca0596cfe0cbb926`,
    {
      method: "GET",
    }
  );

  console.log("Global Serach", response);
  return response;
};
