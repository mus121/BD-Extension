export type LinkedinProfile = {
  miniProfile: {
    anti_abuse_metadata: {
      anti_abuse_uuid: string | null;
    };
    backgroundImage: {
      [key: string]: { artifacts: string[]; rootUrl: string | null };
    };
    dashEntityUrn: string | null;
    entityUrn: string | null;
    firstName: string | null;
    lastName: string | null;
    memorialized: boolean;
    objectUrn: string | null;
    occupation: string | null;
    picture: {
      "com.linkedin.common.VectorImage": {
        artifacts: {
          expiresAt: number;
          fileIdentifyingUrlPathSegment: string;
          width: number;
          height: number;
        }[];
        rootUrl: string | null;
      };
    };
    publicIdentifier: string | null;
    trackingId: string | null;
  };
  plainId: string | null;
  premiumSubscriber: boolean;
};

export type FilteredLinkedinProfile = {
  firstName: string | null;
  lastName: string | null;
  occupation: string | null;
  entityUrn: string | null;
  publicIdentifier: string | null;
  profilePicture: string | null;
};
