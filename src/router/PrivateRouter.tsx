import { ReactNode, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { CircularProgress, Box } from "@mui/material";

interface PrivateRouteProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  const isLoginPage = router.pathname === "/";

  useEffect(() => {
    if (status === "unauthenticated" && !isLoginPage) {
      router.replace("/");
    }
  }, [status, isLoginPage, router]);

  useEffect(() => {
    if (status === "authenticated" && isLoginPage) {
      router.replace("/tasks");
    }
  }, [status, isLoginPage, router]);

  if (status === "loading") {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return <>{children}</>;
}
