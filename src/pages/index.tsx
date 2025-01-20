import { NextPage } from "next";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { Button, Typography } from "@mui/material";

const HomePage: NextPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Typography variant="h6">Cargando...</Typography>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <Typography variant="h5" className="mb-4">
        ¡Bienvenido!
      </Typography>
      <Typography variant="body1" className="mb-8">
        Inicia sesión para continuar
      </Typography>

      <div className="space-x-4">
        <Button
          variant="contained"
          color="primary"
          onClick={() => signIn("google")}
        >
          Iniciar sesión con Google
        </Button>

        <Button
          variant="contained"
          color="secondary"
          onClick={() => signIn("github")}
        >
          Iniciar sesión con GitHub
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
