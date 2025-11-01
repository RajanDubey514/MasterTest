import * as React from "react";
import {
  Box,
  Grid,
  CssBaseline,
  Toolbar,
  Typography,
  IconButton,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import Footer from "../footer/Footer";
import Notificationmenu from "../notification/Notificationmenu";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import { useLocation } from "react-router-dom";
import menuItems from "./menuItems";
import ResponsiveDrawer from "./ResponsiveDrawer";

const drawerWidth = 200;

const DrawerHeader = styled("div")(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function PersistentMiniDrawer({ children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = React.useState(!isMobile);
  const location = useLocation();

  const [showHomeSelect, setShowHomeSelect] = React.useState(false);
  const [showPersonSelect, setShowPersonSelect] = React.useState(false);
  const [homeOption, setHomeOption] = React.useState("");
  const [personOption, setPersonOption] = React.useState("");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  };

  // Close selects on outside click
  React.useEffect(() => {
    const handleClickOutside = () => {
      setShowHomeSelect(false);
      setShowPersonSelect(false);
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const pageTitles = {
    "/": "Dashboard",
    "/sale-add": "Add Customer",
    "/about": "About",
  };
  const currentTitle = pageTitles[location.pathname] || "Dashboard";

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", overflow: "hidden" }}>
      <CssBaseline />

      {/* Drawer */}
      <ResponsiveDrawer
        open={open}
        setOpen={setOpen}
        drawerWidth={drawerWidth}
        menuItems={menuItems}
      />

      {/* Main Section */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* AppBar */}
        <AppBar position="fixed" open={!isMobile && open}>
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              px: isMobile ? 1 : 2,
            }}
          >
            {/* Left: Menu + Title */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <IconButton
                color="inherit"
                onClick={() => setOpen(!open)}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
              <Typography
                sx={{
                  fontSize: isMobile ? "14px" : "16px",
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                }}
              >
                {currentTitle}
              </Typography>
            </Box>

            {/* Right: Icons */}
            <Grid
              sx={{
                display: "flex",
                alignItems: "center",
                gap: isMobile ? 1 : 2,
                position: "relative",
              }}
            >
              {/* Home Select */}
              <Tooltip title="Home Options">
                <IconButton
                  color="inherit"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowHomeSelect(!showHomeSelect);
                    setShowPersonSelect(false);
                  }}
                >
                  <HomeIcon sx={{ fontSize: "20px" }} />
                </IconButton>
              </Tooltip>

              {showHomeSelect && (
                <Box
                  component="select"
                  value={homeOption}
                  onChange={(e) => setHomeOption(e.target.value)}
                  sx={{
                    width: isMobile ? 120 : 150,
                    height: 30,
                    borderRadius: 1,
                    border: "1px solid #ccc",
                    backgroundColor: "#fff",
                    fontSize: "13px",
                    padding: "4px 8px",
                    position: isMobile ? "absolute" : "static",
                    top: isMobile ? 50 : "auto",
                    right: isMobile ? 0 : "auto",
                    zIndex: 1300,
                  }}
                >
                  <option value="">Select</option>
                  <option value="profile">Profile</option>
                  <option value="settings">Settings</option>
                  <option value="logout">Logout</option>
                </Box>
              )}

              {/* Person Select */}
              <Tooltip title="User Options">
                <IconButton
                  color="inherit"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowPersonSelect(!showPersonSelect);
                    setShowHomeSelect(false);
                  }}
                >
                  <PersonIcon sx={{ fontSize: "20px" }} />
                </IconButton>
              </Tooltip>

              {showPersonSelect && (
                <Box
                  component="select"
                  value={personOption}
                  onChange={(e) => setPersonOption(e.target.value)}
                  sx={{
                    width: isMobile ? 120 : 150,
                    height: 30,
                    borderRadius: 1,
                    border: "1px solid #ccc",
                    backgroundColor: "#fff",
                    fontSize: "13px",
                    padding: "4px 8px",
                    position: isMobile ? "absolute" : "static",
                    top: isMobile ? 50 : "auto",
                    right: isMobile ? 0 : "auto",
                    zIndex: 1300,
                  }}
                >
                  <option value="">Select</option>
                  <option value="profile">Profile</option>
                  <option value="settings">Settings</option>
                  <option value="logout">Logout</option>
                </Box>
              )}

              {/* Notifications + Profile */}
              <Notificationmenu />
              <ProfileMenu onLogout={handleLogout} />
            </Grid>
          </Toolbar>
        </AppBar>

        <DrawerHeader />

        {/* Scrollable content */}
        <Box sx={{ flexGrow: 1, overflowY: "auto", p: 1, mb: "60px" }}>
          {children}
        </Box>

        {/* Footer */}
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: isMobile
              ? 0
              : open
              ? `${drawerWidth}px`
              : `calc(${theme.spacing(7)} + 1px)`,
            right: 0,
            backgroundColor: "#fff",
            borderTop: "1px solid #ddd",
            zIndex: theme.zIndex.drawer - 1,
            transition: theme.transitions.create("left", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
          }}
        >
          <Footer />
        </Box>
      </Box>
    </Box>
  );
}
