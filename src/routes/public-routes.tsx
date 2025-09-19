import { useAuth } from "@hooks/use-auth";
import { Navigate } from "react-router-dom";

export function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
}
