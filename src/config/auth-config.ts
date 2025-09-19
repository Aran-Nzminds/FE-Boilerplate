import { LogLevel } from "@azure/msal-browser";

import type { Configuration } from "@azure/msal-browser";

const VITE_MICROSOFT_CLIENT_ID = import.meta.env.VITE_MICROSOFT_CLIENT_ID as string;
const VITE_MICROSOFT_TENANT_ID = import.meta.env.VITE_MICROSOFT_TENANT_ID as string;
const VITE_REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI as string;

export const msalConfig: Configuration = {
  auth: {
    clientId: VITE_MICROSOFT_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${VITE_MICROSOFT_TENANT_ID}`,
    redirectUri: VITE_REDIRECT_URI,
  },
  cache: {
    cacheLocation: "localStorage",
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: LogLevel, message: string) => {
        console.log(message, level);
      },
      logLevel: LogLevel.Info,
      piiLoggingEnabled: false,
    },
  },
};

export const loginRequest = {
  scopes: ["User.Read"],
};
