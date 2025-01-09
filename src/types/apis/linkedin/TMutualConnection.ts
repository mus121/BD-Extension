export type LiConnections = {
  connectedMemberResolutionResult: any;
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
            rootUrl: string;
            artifacts: { fileIdentifyingUrlPathSegment: string }[];
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

export type FilterMutualApiResponse = {
  firstName: string;
  lastName: string;
  completeImageUrl: string;
  headLine: string;
  entityUrn: string;
  publicIdentifier: string;
}[];
