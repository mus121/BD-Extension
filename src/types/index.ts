export interface LinkedInProfile {
    firstName: string;
    lastName: string;
    publicIdentifier: string;
    headline?: string;
    location?: string;
    profilePicture?: {
      url: string;
      alt: string;
    };
    connections?: number;
  }
  
  export interface ApiResponse<T> {
    data?: T;
    error?: {
      code: number;
      message: string;
    };
  }
  
  export enum MessageTypes {
    FETCH_PROFILE = 'FETCH_PROFILE',
    FETCH_CONNECTIONS = 'FETCH_CONNECTIONS',
    SEARCH_PROFILES = 'SEARCH_PROFILES',
    AUTH_STATUS = 'AUTH_STATUS'
  }