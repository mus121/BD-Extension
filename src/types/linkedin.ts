export interface LinkedInProfile {
  firstName: string;
  lastName: string;
  publicIdentifier: string;
  headline: string;
  occupation?: string;
  profilePicture?: any;
  location?: string;
}

export interface Connection {
  firstName: string;
  lastName: string;
  headline?: string;
  publicIdentifier: string;
  profilePicture?: string;
}

export interface SearchResult {
  profiles: Array<{
    name: string;
    subtitle?: string;
    profilePicture?: string;
  }>;
  total: number;
}

export interface ApiResponse<T> {
  data?: T;
  error?: {
    code: number;
    message: string;
  };
}
