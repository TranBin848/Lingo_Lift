import { useAuthStore } from "../../stores/useAuth.Store";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const ProtectedRoute = () => {
  const { loading, refresh, fetchMe } = useAuthStore();
  const [starting, setStarting] = useState(true);
  const location = useLocation();

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      try {
        // If there's no accessToken in-memory, try refresh using cookie
        if (!useAuthStore.getState().accessToken) {
          try {
            await refresh();
          } catch {
            // refresh failed or no valid refresh token; continue to redirect later
          }
        }

        // If we have an access token but no user data, fetch it
        if (
          useAuthStore.getState().accessToken &&
          !useAuthStore.getState().user
        ) {
          try {
            await fetchMe();
          } catch {
            // fetching user failed; clear state
            // call clearState if available
            const s = useAuthStore.getState() as unknown as {
              clearState?: () => void;
            };
            s.clearState?.();
          }
        }
      } finally {
        if (mounted) setStarting(false);
      }
    };

    init();

    return () => {
      mounted = false;
    };
  }, [refresh, fetchMe]);

  // While we attempt refresh/fetch, avoid flashing protected UI
  if (loading || starting) return null;

  // If not authenticated, redirect to login and preserve attempted location
  if (!useAuthStore.getState().accessToken) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
