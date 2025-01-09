import {
  ApiError,
  LiConnections,
} from "@/types/apis/linkedin/TMutualConnection";
import { LinkedinProfile } from "@/types/apis/linkedin/TLIProfile";
import { Cluster } from "@/types/apis/linkedin/TTotalConnections";
import { TGlobalProfilesResponse } from "@/types/apis/linkedin/TGlobalProfilesResponse";
import { TDropDownProfiles } from "@/types/apis/linkedin/TDropDownProfiles";
import { LiLocation } from "./TLiLocation";

export type LinkedinProfileApiResponse = {
  miniProfile: any;
  profile: LinkedinProfile;
};

export type LiConnectionsApiResponse = {
  data: any;
  elements: LiConnections[];
};

export type LiSearchProfilesApiResponse = {
  data: any;
  profiles: TGlobalProfilesResponse[];
};

export type LiDropDownApiResponse = {
  data: any;
  profiles: TDropDownProfiles[];
};

export type LiLocationApiResponse = {
  element: LiLocation;
};
export type ConnectionCountApiResponse = {
  metadata: any;
  clusters: Cluster[];
  paging: {
    count: number;
    start: number;
    total: number;
  };
};

export type ApiResponse<T> = T | ApiError;
export { TDropDownProfiles };
