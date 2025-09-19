import axios from "axios";

/**
 * @description Centralized error handler for axios errors
 * @param error - The error thrown by axios or unknown source
 */
export function handleApiError(error: unknown) {
  if (axios.isAxiosError(error)) {
    console.error(`API Error on request: ${error.config?.url}`);
    if (error.response) {
      console.error(`Status: ${error.response.status}`);
      console.error("Response data:", error.response.data);
    }
    else if (error.request) {
      console.error("No response received:", error.request);
    }
    else {
      console.error("Axios error message:", error.message);
    }
  }
  else {
    console.error("Unexpected error:", error);
  }
}
