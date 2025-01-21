import { NextPage } from "next";
import { useSession, signIn } from "next-auth/react";
import {
  Button,
  Typography,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import Image from "next/image";
import asdeporteLogoSVG from "@/assets/asdeporte-logo-black.svg";

const HomePage: NextPage = () => {
  const { status } = useSession();

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 space-y-6">
      <Card className="shadow-lg p-8 w-full max-w-md">
        <CardContent className="space-y-6 flex flex-col items-center">
          <Image
            src={asdeporteLogoSVG}
            alt="Asdeporte Logo SVG"
            width={150}
            height={150}
            className="mb-4"
          />
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            className="font-bold text-primary"
          >
            ¡Bienvenido a Asdeporte!
          </Typography>
          <Typography variant="body1" align="center" color="textSecondary">
            Inicia sesión para acceder a tu cuenta y gestionar tus eventos
            deportivos.
          </Typography>
          <div className="space-y-4 w-full">
            <Button
              fullWidth
              variant="contained"
              color="primary"
              startIcon={<GoogleIcon />}
              onClick={() => signIn("google")}
              size="large"
              className="capitalize"
            >
              Iniciar sesión con Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              startIcon={<GitHubIcon />}
              onClick={() => signIn("github")}
              size="large"
              className="capitalize"
            >
              Iniciar sesión con GitHub
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default HomePage;
