import React from "react";
import { useSession, signOut } from "next-auth/react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from "@mui/material";
import Image from "next/image";
import asdeporteLogoSVG from "@/assets/asdeporte-logo-white.svg";
import Link from "next/link";

const userOptions = ["Perfil", "Cerrar sesión"];

export default function ResponsiveAppBar() {
  const { data: session } = useSession();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleUserOption = (option: string) => {
    if (option === "Cerrar sesión") {
      signOut();
    }
    setAnchorElUser(null);
  };

  const userName = session?.user?.name || session?.user?.email || "";
  const userImage = session?.user?.image || "/avatar-default.png";

  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box className="flex-grow flex justify-center">
            <Link href="/" passHref>
              <Image
                src={asdeporteLogoSVG}
                alt="Asdeporte Logo"
                width={120}
                height={50}
                className="cursor-pointer"
              />
            </Link>
          </Box>

          {session ? (
            <Box className="flex-grow-0">
              <Tooltip title="Abrir menú de usuario" arrow>
                <IconButton onClick={handleOpenUserMenu} className="p-0">
                  <Avatar alt={userName} src={userImage} />
                </IconButton>
              </Tooltip>
              <Menu
                id="menu-appbar-user"
                anchorEl={anchorElUser}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
                keepMounted
              >
                <MenuItem disabled>
                  <Typography className="font-bold text-center">
                    {userName}
                  </Typography>
                </MenuItem>
                {userOptions.map((option) => (
                  <MenuItem
                    key={option}
                    onClick={() => handleUserOption(option)}
                  >
                    <Typography textAlign="center">{option}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <Box className="flex-grow-0">
              <Button color="inherit" component={Link} href="/">
                Login
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
