export type TGlobalProfilesResponse = {
  response?: {
    data?: {
      searchDashClustersByAll?: {
        elements?: Array<{
          items?: Array<{
            item: {
              entityResult?: {
                image?: {
                  accessibilityText?: string;
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
                secondarySubtitle?: {
                  text?: string;
                };
                primarySubtitle?: {
                  text?: string;
                };
                navigationUrl?: string;
                entityUrn?: string;
              };
            };
          }>;
        }>;
        paging?: {
          count: number;
          start: number;
          total: number;
        };
      };
    };
  };
};
