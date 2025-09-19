import { PublicClientApplication } from "@azure/msal-browser";
import { MsalProvider } from "@azure/msal-react";
import { AuthProvider } from "@hooks/use-auth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./app";
import { msalConfig } from "./config/auth-config";
import "./index.css"; // ! I will remove it probably - not needed
import "@styles/variables.css";
import "@styles/global.css";

import "./lib/i18n.ts";

const queryClient = new QueryClient();

const msalInstance = new PublicClientApplication(msalConfig);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <MsalProvider instance={msalInstance}>
          <App />
        </MsalProvider>
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
);
