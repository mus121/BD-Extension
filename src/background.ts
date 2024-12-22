import { handleMessage } from "./services/messageHandler";
import { setLinkedInToken } from "./utils/token";
import { MessageType } from "./types/common";

// Initial setup
chrome.runtime.onInstalled.addListener(() => {
  setLinkedInToken();
  runTests();
});

// Monitor LinkedIn token changes
chrome.cookies.onChanged.addListener((changeInfo) => {
  if (
    changeInfo.cookie.name === "JSESSIONID" &&
    changeInfo.removed === false &&
    changeInfo.cookie.domain?.includes("linkedin.com")
  ) {
    setLinkedInToken();
  }
});

// Handle external messages
chrome.runtime.onMessageExternal.addListener(
  (message, sender, sendResponse) => {
    handleMessage({ type: message, payload: sender }, sendResponse);
    return true;
  }
);

// Test runner function
async function runTests() {
  console.log("Starting LinkedIn Extension Tests...");
  
  // Helper function to log test results
  const logTest = (testName: string, success: boolean, data?: any) => {
    console.log(`Test: ${testName}`);
    console.log(`Status: ${success ? "✅ Passed" : "❌ Failed"}`);
    if (data) {
      console.log("Response:", data);
    }
    console.log("-".repeat(50));
  };

  // Test 1: Check Extension
  try {
    const checkResponse: any = await new Promise((resolve) => {
      handleMessage(
        { type: MessageType.CHECK_EXTENSION },
        resolve
      );
    });
    logTest(
      "Check Extension",
      checkResponse.signal === true,
      checkResponse
    );
  } catch (error) {
    logTest("Check Extension", false, error);
  }

  // Test 2: Fetch Profile
  try {
    const profileResponse: any = await new Promise((resolve) => {
      handleMessage(
        { type: MessageType.FETCH_PROFILE },
        resolve
      );
    });
    logTest(
      "Fetch Profile",
      !!profileResponse.data || !!profileResponse.error,
      profileResponse
    );
  } catch (error) {
    logTest("Fetch Profile", false, error);
  }

  // Test 3: Fetch Connections with Pagination
  try {
    const connectionsResponse: any = await new Promise((resolve) => {
      handleMessage(
        {
          type: MessageType.FETCH_CONNECTIONS,
          payload: { start: 0, count: 10 }
        },
        resolve
      );
    });
    logTest(
      "Fetch Connections",
      !!connectionsResponse.data || !!connectionsResponse.error,
      connectionsResponse
    );
  } catch (error) {
    logTest("Fetch Connections", false, error);
  }

  // Test 4: Search Profiles
  try {
    const searchResponse: any = await new Promise((resolve) => {
      handleMessage(
        {
          type: MessageType.SEARCH_PROFILES,
          payload: "software engineer"
        },
        resolve
      );
    });
    logTest(
      "Search Profiles",
      !!searchResponse.data || !!searchResponse.error,
      searchResponse
    );
  } catch (error) {
    logTest("Search Profiles", false, error);
  }

  // Test 5: Error Case - Unknown Message Type
  try {
    const errorResponse: any = await new Promise((resolve) => {
      handleMessage(
        {
          type: "UNKNOWN_TYPE" as MessageType,
          payload: {}
        },
        resolve
      );
    });
    logTest(
      "Error Handling",
      errorResponse.error?.code === 400,
      errorResponse
    );
  } catch (error) {
    logTest("Error Handling", false, error);
  }

  // Optional: Test with specific search criteria
  try {
    const specificSearchResponse: any = await new Promise((resolve) => {
      handleMessage(
        {
          type: MessageType.SEARCH_PROFILES,
          payload: "CTO startup"
        },
        resolve
      );
    });
    logTest(
      "Specific Search",
      !!specificSearchResponse.data || !!specificSearchResponse.error,
      specificSearchResponse
    );
  } catch (error) {
    logTest("Specific Search", false, error);
  }

  console.log("Test Suite Completed!");
}

// Add keyboard shortcut to manually trigger tests


// Export for external use if needed
export { runTests };