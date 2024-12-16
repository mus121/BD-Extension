export type LiConnections = {
  elements?: {
    connectedMemberResolutionResult?: {
      firstName?: string;
      lastName?: string;
      headline?: string;
      publicIdentifier?: string;
      entityUrn?: string;
      profilePicture?: {
        displayImageReference?: {
          vectorImage?: {
            rootUrl?: string;
            artifacts?: { fileIdentifyingUrlPathSegment?: string }[];
          };
        };
      };
    };
  }[];
};
export type ApiError = {
  error: boolean;
  code: number;
  message?: string;
};
