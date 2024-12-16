import { ApiError, LiConnections } from "@/types/apis/linkedin/connection";
import { LinkedinProfile } from "@/types/apis/linkedin/profile";
import { SearchProfile } from "@/types/apis/linkedin/searchProfile";
import { Cluster } from "@/types/apis/linkedin/totalconnections";

export type LinkedinProfileApiResponse = {
  profile: LinkedinProfile;
};

export type LiConnectionsApiResponse = {
  elements: LiConnections[];
  paging: {
    count: number;
    start: number;
    total: number;
  };
};

export type SearchProfilesApiResponse = {
  profiles: SearchProfile[];
  total: number;
};

export type ConnectionCountApiResponse = {
  clusters: Cluster[];
  paging: {
    count: number;
    start: number;
    total: number;
  };
};

export type ApiResponse<T> = T | ApiError;
