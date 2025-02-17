import * as React from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export default function MainLayout() {
  const location = useLocation();

  const getNavLinkStyle = (path: string) => {
    const isActive = location.pathname === path;
    return {
      className: `rounded-s-lg rounded-none px-4
        ${isActive ? "text-white bg-orange-500 font-bold hover:bg-orange-400" : "text-gray-400 hover:bg-gray-100 hover:text-black-400"}
      `,
    };
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className="bg-transparent shadow-none">
        <Toolbar className="flex justify-center">
          <NavLink dir="ltr" to="/upload" style={{ textDecoration: "none" }}>
            <Button {...getNavLinkStyle("/upload")}>
              <Typography variant="h6" className="normal-case font-semibold">
                Scrape
              </Typography>
            </Button>
          </NavLink>
          <NavLink dir="rtl" to="/history" style={{ textDecoration: "none" }}>
            <Button {...getNavLinkStyle("/history")}>
              <Typography variant="h6" className="normal-case font-semibold">
                History
              </Typography>
            </Button>
          </NavLink>
        </Toolbar>
      </AppBar>
      <Outlet />
    </Box>
  );
}
