// src/authConfig.ts
import { Configuration, LogLevel } from '@azure/msal-browser';

export const msalConfig: Configuration = {
  auth: {
    clientId: '92ce754c-636e-453c-bca6-18f8e580c8be',
    authority: 'https://login.microsoftonline.com/1dba69c3-3657-4fb5-ba43-307d3fc6abf9',
    redirectUri: 'http://localhost:5173',
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
  system: {
    loggerOptions: {
      loggerCallback: (level: LogLevel, message: string) => {
        console.log(message,level);
      },
      logLevel: LogLevel.Info,
      piiLoggingEnabled: false,
    },
  },
};

export const loginRequest = {
  scopes: ['User.Read'],
};
