import { fetchStorageItem } from ".";

export const linkedinApiCall = async <ResponseType>(
  endpoint: string,
  options: RequestInit
): Promise<ResponseType | null | { error: boolean; code: number }> => {
  const csrfToken = await fetchStorageItem<string>("csrf_token");

  if (csrfToken) {
    return await fetch(`${process.env.LINKEDIN_HOST_URL}${endpoint}`, {
      ...options,
      headers: {
        ...options.headers,
        "csrf-token": csrfToken,
      },
    })
      .then((response) => {
        if (response.status > 300) {
          throw new Error(`error_${response.status}`);
        }
        return response.json() as ResponseType;
      })
      .catch((error) => {
        // Improve error handling here:
        if (error instanceof Error) {
          const errorDetails = {
            message: error.message,
            stack: error.stack,
          };
          console.error(
            "Error occurred while calling LinkedIn API:",
            errorDetails
          );
        } else {
          console.error(
            "Error occurred while calling LinkedIn API:",
            JSON.stringify(error, null, 2)
          );
        }
        if (error.message.startsWith("error_")) {
          const [, errorCode] = error.message.split("_");
          return {
            error: true,
            code: Number(errorCode),
          };
        }
        return null;
      });
  }
  return null;
};
