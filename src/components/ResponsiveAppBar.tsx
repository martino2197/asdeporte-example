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
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import Link from "next/link";

const pages = [
  { label: "Home", href: "/" },
  { label: "Tareas", href: "/tasks" },
];

const userOptions = ["Perfil", "Cerrar sesión"];

export default function ResponsiveAppBar() {
  const { data: session } = useSession();
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
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
          <AdbIcon className="hidden md:inline-block mr-2" />
          <Typography
            variant="h6"
            noWrap
            component="div"
            className="hidden md:inline-block mr-4 font-bold tracking-[.3rem]"
          ></Typography>

          <Box className="flex flex-grow md:hidden">
            <IconButton
              size="large"
              aria-label="Open nav menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              transformOrigin={{ vertical: "top", horizontal: "left" }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              keepMounted
              className="md:hidden"
            >
              {pages.map((page) => (
                <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">
                    <Link href={page.href}>{page.label}</Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <AdbIcon className="md:hidden mr-2" />
          <Typography
            variant="h5"
            noWrap
            component="div"
            className="flex md:hidden flex-grow font-bold tracking-[.3rem]"
          >
            APP LOGO
          </Typography>

          <Box className="hidden md:flex flex-grow">
            {pages.map((page) => (
              <Button
                key={page.label}
                onClick={handleCloseNavMenu}
                component={Link}
                href={page.href}
                className="my-2"
                variant="text"
                color="inherit"
              >
                {page.label}
              </Button>
            ))}
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
                className="mt-[45px]"
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
