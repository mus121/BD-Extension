export type SearchProfile = {
  data: any;
  suggestionType?: boolean;
  entityLockupView?: {
    title?: { text: string };
    subtitle?: { text: string };
    image?: {
      attributes: Array<{
        detailData?: {
          nonEntityProfilePicture?: {
            vectorImage?: {
              artifacts: Array<{ fileIdentifyingUrlPathSegment: string }>;
            };
          };
        };
      }>;
    };
  };
  response?: {
    data: {
      searchDashTypeaheadByGlobalTypeahead: {
        elements: Array<{
          entityLockupView: {
            title?: { text: string };
            subtitle?: { text: string };
            image?: {
              attributes: Array<{
                detailData?: {
                  nonEntityProfilePicture?: {
                    vectorImage?: {
                      artifacts: Array<{
                        fileIdentifyingUrlPathSegment: string;
                      }>;
                    };
                  };
                };
              }>;
            };
          };
        }>;
      };
    };
  };
};
