export const LINKEDIN_API = {
  BASE_URL: process.env.LINKEDIN_HOST_URL,
  ENDPOINTS: {
    ME: "/voyager/api/me",
    CONNECTIONS: "/voyager/api/relationships/dash/connections",
    SEARCH: "/voyager/api/graphql",
  },
};

export const ALARM_INTERVALS = {
  DATA_SYNC: 1, // minutes
};
