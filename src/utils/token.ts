import { LINKEDIN_API } from "../constants";
import { storage } from "./storage";

export const setLinkedInToken = () => {
  chrome.cookies.getAll({ url: LINKEDIN_API.BASE_URL }, (cookies) => {
    const jsessionIdCookie = cookies.find(
      (cookie) => cookie.name === "JSESSIONID"
    );
    if (jsessionIdCookie) {
      storage.set("csrf_token", jsessionIdCookie.value.replace(/['"]+/g, ""));
    }
  });
};
