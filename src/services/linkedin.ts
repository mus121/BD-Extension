import { LINKEDIN_API } from "../constants";
import {
  ApiResponse,
  LinkedInProfile,
  Connection,
  SearchResult,
} from "../types/linkedin";
import { storage } from "../utils/storage";

export class LinkedInService {
  private static async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<ApiResponse<T>> {
    try {
      const csrfToken = await storage.get<string>("csrf_token");
      if (!csrfToken) {
        throw new Error("CSRF token not found");
      }

      const response = await fetch(`${LINKEDIN_API.BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          ...options.headers,
          "csrf-token": csrfToken,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return { data };
    } catch (error) {
      return {
        error: {
          code: 500,
          message:
            error instanceof Error ? error.message : "Unknown error occurred",
        },
      };
    }
  }

  static async getProfile(): Promise<ApiResponse<LinkedInProfile>> {
    return this.makeRequest<LinkedInProfile>(LINKEDIN_API.ENDPOINTS.ME);
  }

  static async getConnections(
    start = 0,
    count = 10,
  ): Promise<ApiResponse<Connection[]>> {
    return this.makeRequest<Connection[]>(
      `${LINKEDIN_API.ENDPOINTS.CONNECTIONS}?decorationId=com.linkedin.voyager.dash.deco.web.mynetwork.ConnectionListWithProfile-16&q=search&start=${start}&count=${count}&sortType=RECENTLY_ADDED`,
    );
  }

  static async searchProfiles(
    query: string,
  ): Promise<ApiResponse<SearchResult>> {
    const encodedQuery = encodeURIComponent(query);
    return this.makeRequest<SearchResult>(
      `${LINKEDIN_API.ENDPOINTS.SEARCH}?variables=(query:${encodedQuery})&queryId=voyagerSearchDashTypeahead.eeea0c1dfdf533272e9de4e98a59d725`,
    );
  }
}
