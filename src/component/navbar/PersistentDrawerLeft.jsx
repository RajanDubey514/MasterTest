import * as React from "react";
import {
  Box,
  Grid,
  CssBaseline,
  Toolbar,
  Typography,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,Select,InputLabel ,
FormControl ,
  Tooltip,
  Menu,
  MenuItem,
} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import PersonIcon from "@mui/icons-material/Person";
import Footer from "../footer/Footer";
import Notificationmenu from "../notification/Notificationmenu";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import { Link, useLocation } from "react-router-dom";
import img from "../../assets/bloglogo.png"

const drawerWidth = 180;

// Drawer open/close mixins
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
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

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function PersistentMiniDrawer({ children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [open, setOpen] = React.useState(true);
  const location = useLocation();

  const handleDrawerOpen = () => setOpen(true);
  // const handleDrawerClose = () => setOpen(false);

  // Dropdown states for icons
  const [anchorHome, setAnchorHome] = React.useState(null);
  const [anchorPerson, setAnchorPerson] = React.useState(null);

  const handleCloseMenus = () => {
    setAnchorHome(null);
    setAnchorPerson(null);
  };

  // Page titles
  const pageTitles = {
    "/": "Home",
    "/about": "About",
  };
  const currentTitle = pageTitles[location.pathname] || "Dashboard";

  const menuItems = [
    { text: "Home", icon: <HomeIcon />, path: "/" },
    { text: "About", icon: <InfoIcon />, path: "/about" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    window.location.href = "/login";
  };
   
    const [showHomeSelect, setShowHomeSelect] = React.useState(false);
  const [showPersonSelect, setShowPersonSelect] = React.useState(false);

    // dummy states for select values
  const [homeOption, setHomeOption] = React.useState("");
  const [personOption, setPersonOption] = React.useState("");

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", overflow: "hidden" }}>
      <CssBaseline />

      {/* Drawer */}
      <Drawer variant="permanent" open={open}>
        <DrawerHeader sx={{ alignSelf: "center" ,padding :"0px"}}>
            <img alt="log" src={img} width={100} height={40} />
        </DrawerHeader>

        <Divider />
        <List>
          {menuItems.map(({ text, icon, path }) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <Tooltip title={text} placement="right" disableHoverListener={open}>
                <ListItemButton
                  component={Link}
                  to={path}
                  selected={location.pathname === path}
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    "&.Mui-selected": {
                      backgroundColor: "rgba(25,118,210,0.15)",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          overflow: "hidden", // ✅ Removes scrollbar
        }}
      >
        {/* Fixed AppBar */}
       <AppBar position="fixed" open={open}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Left side (Menu + Title) */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ marginRight: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="p" sx={{ fontSize: "16px" }}>
            {currentTitle}
          </Typography>
        </Box>

        {/* Right side (Icons + Menus) */}
        <Grid sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* 🏠 Home Menu */}
          <Tooltip title="Home Options">
            <IconButton
              color="inherit"
              onClick={() => {
                setShowHomeSelect(!showHomeSelect);
                // setShowPersonSelect(false);
              }}
            >
              <HomeIcon sx={{ fontSize: "20px" }} />
            </IconButton>
          </Tooltip>

          {showHomeSelect && (
           <Box
            component="select"
            value={homeOption}
            onChange={(e) => setPersonOption(e.target.value)}
            sx={{
              width: 150,
              height: 30,
              borderRadius: 1,
              border: "1px solid #ccc",
              backgroundColor: "#fff",
              fontSize: "13px",
              padding: "4px 8px",
              outline: "none",
              cursor: "pointer",
              "&:hover": {
                borderColor: "#1976d2",
              },
              "&:focus": {
                borderColor: "#1976d2",
                boxShadow: "0 0 0 2px rgba(25, 118, 210, 0.2)",
              },
            }}
          >
            <option value="">Select</option>
            <option value="profile">Profile</option>
            <option value="settings">Settings</option>
            <option value="logout">Logout</option>
          </Box>
          )}

          {/* 👤 Person Menu */}
          <Tooltip title="User Options">
            <IconButton
              color="inherit"
              onClick={() => {
                setShowPersonSelect(!showPersonSelect);
                // setShowHomeSelect(false);
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
              width: 150,
              height: 30,
              borderRadius: 1,
              border: "1px solid #ccc",
              backgroundColor: "#fff",
              fontSize: "13px",
              padding: "4px 8px",
              outline: "none",
              cursor: "pointer",
              "&:hover": {
                borderColor: "#1976d2",
              },
              "&:focus": {
                borderColor: "#1976d2",
                boxShadow: "0 0 0 2px rgba(25, 118, 210, 0.2)",
              },
            }}
          >
            <option value="">Select</option>
            <option value="profile">Profile</option>
            <option value="settings">Settings</option>
            <option value="logout">Logout</option>
          </Box>
          )}

          {/* 🔔 Notification */}
          <Notificationmenu />

          {/* 👤 Profile Dropdown */}
          <ProfileMenu onLogout={handleLogout} />
        </Grid>
      </Toolbar>
    </AppBar>

        <DrawerHeader />

        {/* Scrollable content area */}
        <Box
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            p: 2,
            mb: "60px",
          }}
        >
          {children}
        </Box>

        {/* ✅ Fixed Footer */}
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: open ? `${drawerWidth}px` : `calc(${theme.spacing(7)} + 1px)`,
            right: 0,
            transition: theme.transitions.create("left", {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            backgroundColor: "#fff",
            borderTop: "1px solid #ddd",
            zIndex: theme.zIndex.drawer - 1,
          }}
        >
          <Footer />
        </Box>
      </Box>
    </Box>
  );
}
