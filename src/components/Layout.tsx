import React, { ReactNode } from "react";
import Box from "@mui/material/Box";
import ResponsiveAppBar from "./ResponsiveAppBar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Box sx={{ minHeight: "100vh" }}>
      <ResponsiveAppBar />
      <Box sx={{ p: 2, mt: 2 }}>{children}</Box>
    </Box>
  );
}
