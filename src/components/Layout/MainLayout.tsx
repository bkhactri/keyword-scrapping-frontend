import React, { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AccountCircle from "@mui/icons-material/AccountCircle";
import HistoryIcon from "@mui/icons-material/History";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { useAuth } from "@contexts/useAuthContext";
import { useScrapping } from "@contexts/useScrappingContext";

export default function MainLayout() {
  const { isScrapping } = useScrapping();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [nextRoute, setNextRoute] = useState<string | null>(null);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isScrapping && location.pathname === "/upload") {
        event.preventDefault();
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isScrapping, location.pathname]);

  const handleConfirmLeave = () => {
    setShowConfirmDialog(false);
    if (nextRoute) {
      navigate(nextRoute);
    }
  };

  const handleCancelLeave = () => {
    setShowConfirmDialog(false);
    setNextRoute(null);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout(navigate);
  };

  const getNavLinkStyle = (path: string) => {
    const isActive = location.pathname === path;
    return {
      className: `rounded-s-lg rounded-none px-4
        ${isActive ? "text-white bg-orange-500 font-bold hover:bg-orange-400" : "text-gray-400 hover:bg-gray-100 hover:text-black-400"}
      `,
    };
  };

  const handleGoToPage = (path: string) => {
    if (isScrapping && location.pathname === "/upload") {
      setNextRoute(path);
      setShowConfirmDialog(true);
      return;
    }

    navigate(path);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" className="bg-transparent shadow-none">
        <Toolbar className="flex justify-center items-center">
          <Button
            dir="ltr"
            {...getNavLinkStyle("/upload")}
            onClick={() => handleGoToPage("/upload")}
          >
            <PrecisionManufacturingIcon className="mr-1" />
            <Typography variant="h6" className="normal-case font-semibold">
              Scrape
            </Typography>
          </Button>
          <Button
            dir="rtl"
            {...getNavLinkStyle("/history")}
            onClick={() => handleGoToPage("/history")}
          >
            <Typography variant="h6" className="normal-case font-semibold">
              History
            </Typography>
            <HistoryIcon className="mr-1" />
          </Button>
          <Box className="absolute right-5">
            <IconButton
              size="large"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle fontSize="large" className="text-orange-400" />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      <Outlet />
      <Dialog open={showConfirmDialog} onClose={handleCancelLeave}>
        <DialogTitle>Warning uncompleted Search Progress!</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Search is in progress. If you leave this page, you won&apos;t be
            able to see the real-time search keywords, but you can still view
            them on the history page.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ m: 1 }}>
          <Button
            onClick={handleCancelLeave}
            color="primary"
            sx={{
              border: 1,
              borderRadius: "10px",
            }}
          >
            Stay
          </Button>
          <Button
            onClick={handleConfirmLeave}
            className="border rounded-md border-solid"
            color="error"
            sx={{
              border: 1,
              borderRadius: "10px",
            }}
            autoFocus
          >
            Leave
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
