export type TDropDownProfiles = {
  navigationUrl?: string;
  title?: {
    text?: string;
  };
  primarySubtitle?: {
    text?: string;
  };
  image?: {
    attributes?: Array<{
      detailData?: {
        nonEntityProfilePicture?: {
          vectorImage?: {
            artifacts?: Array<{
              fileIdentifyingUrlPathSegment?: string;
            }>;
          };
        };
      };
    }>;
  };
  entityUrn?: string;
};

export type Item = {
  item?: {
    entityResult?: TDropDownProfiles;
  };
};

export type Element = {
  items?: Array<Item>;
};

export type Profile = {
  title: string;
  subtitle: string;
  image: string;
  entityUrn: string;
  publicIdentifier: string;
};
