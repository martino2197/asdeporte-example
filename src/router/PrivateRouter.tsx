// router/PrivateRoute.tsx
import { ReactNode, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

interface PrivateRouteProps {
  children: ReactNode;
}

export default function PrivateRoute({ children }: PrivateRouteProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Identificamos si estamos en la ruta de login ("/")
  const isLoginPage = router.pathname === "/";

  // Efecto 1: Si NO está autenticado y NO estamos en "/", forzar a "/"
  useEffect(() => {
    if (status === "unauthenticated" && !isLoginPage) {
      router.replace("/");
    }
  }, [status, isLoginPage, router]);

  // Efecto 2: Si está autenticado y estamos en "/", redirigimos a "/tasks"
  useEffect(() => {
    if (status === "authenticated" && isLoginPage) {
      router.replace("/tasks");
    }
  }, [status, isLoginPage, router]);

  // Mostrar algo mientras se verifica la sesión
  if (status === "loading") {
    return <p>Cargando sesión...</p>;
  }

  // Renderizar la página (sea "/" o cualquier otra),
  // ya sea el login o el contenido protegido.
  return <>{children}</>;
}
