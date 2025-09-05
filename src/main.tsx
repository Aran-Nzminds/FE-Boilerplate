import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'; //! I will remove it probably - not needed
import App from './App.tsx';
import '@styles/variables.css';
import '@styles/global.css';
import { AuthProvider } from '@hooks/use-auth.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PublicClientApplication } from '@azure/msal-browser';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from './config/authConfig.ts';

const queryClient = new QueryClient();

const msalInstance = new PublicClientApplication(msalConfig);

createRoot(document.getElementById('root')!).render(
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
