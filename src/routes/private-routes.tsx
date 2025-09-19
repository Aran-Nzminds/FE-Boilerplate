import { useAuth } from "@hooks/use-auth";
import Layout from "@layout/layout";
import { Navigate, useLocation } from "react-router-dom";

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Layout>{children}</Layout>;
}
