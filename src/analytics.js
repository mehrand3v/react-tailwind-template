// src/services/analytics.js

import { analytics } from "@/services/firebase"; // Import analytics from firebase.js
import { logEvent } from "firebase/analytics";

export const ANALYTICS_EVENTS = {
  PAGE_VIEW: "page_view",
  USER_SIGN_IN: "login",
  USER_SIGN_UP: "sign_up",
  BUTTON_CLICK: "button_click",
  FORM_SUBMIT: "form_submit",
  ERROR_OCCURRED: "error_occurred",
  FEATURE_USED: "feature_used",
  // Add more event names as needed
};

// Helper function to safely log events with error handling
const safeLogEvent = async (eventName, eventParams = {}) => {
  try {
    if (analytics) {
      await logEvent(analytics, eventName, eventParams);
      console.log(`Event '${eventName}' logged successfully.`); // Add success log
    } else {
      console.warn(
        `Analytics is not initialized. Event '${eventName}' not logged.`
      );
    }
  } catch (error) {
    console.error(`Error logging event: ${eventName}`, error);
  }
};

// Log custom events
export const logCustomEvent = (eventName, eventParams = {}) => {
  return safeLogEvent(eventName, eventParams);
};

// Log page view events
export const logPageView = (pageName, pageParams = {}) => {
  return safeLogEvent(ANALYTICS_EVENTS.PAGE_VIEW, {
    page_title: pageName,
    ...pageParams,
  });
};

// Log button click events
export const logUserSignIn = (method = "email") => {
  return safeLogEvent(ANALYTICS_EVENTS.USER_SIGN_IN, { method });
};

// Log form submit events
export const logUserSignUp = (method = "email") => {
  return safeLogEvent(ANALYTICS_EVENTS.USER_SIGN_UP, { method });
};
