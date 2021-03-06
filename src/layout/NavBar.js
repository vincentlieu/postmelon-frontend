import React, { useState, forwardRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  MenuItem,
  Menu,
  IconButton,
  Typography,
} from "@material-ui/core/";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import HomeIcon from "@material-ui/icons/Home";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import { useGlobalState } from "../config/GlobalState";
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    textDecoration: "none",
    color: "inherit",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
  menuBar: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const NavigationBar = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const history = useHistory();

  const { store, dispatch } = useGlobalState();
  const { userID } = store;

  // HANDLE NAVIGATION BAR MENU OPEN AND CLOSE.
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    dispatch({ type: "setToken", data: null });
    dispatch({ type: "getUserID", data: null });

    history.push("/");
    handleMenuClose();
  };

  // ALLOW MATERIAL-UI TO USE REACT-ROUTER-DOM
  //LINKS TO HOME - IF USERID IS NOT PRESENT AND USER CLICKS ON POSTMELON LOGO. IT WILL REDIRECT TO LANDING.
  const LinkToHome = forwardRef((props, ref) =>
    userID ? (
      <Link to={`/home`} {...props}></Link>
    ) : (
      <Link to={`/`} {...props}></Link>
    )
  );

  // MENU CLICK ACCOUNT ICON TO POPULATE DROPDOWN FOR PROFILE, SETTINGS AND LOGOUT
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem className="view-myprofile" onClick={handleMenuClose}>
        <Link to={`/profile/${userID}`} className="nav-links">
          Profile
        </Link>
      </MenuItem>
      <MenuItem onClick={handleMenuClose}>
        <Link to="/editprofile" className="nav-links">
          Settings
        </Link>
      </MenuItem>
      <MenuItem className="signout-button" onClick={handleLogout}>
        Log out
      </MenuItem>
    </Menu>
  );

  // MOBILE MENU
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem component={LinkToHome}>
        <IconButton color="inherit">
          <HomeIcon />
        </IconButton>
        <p>Home</p>
      </MenuItem>
      <MenuItem>
        <IconButton color="inherit">
          <AccountCircle />
        </IconButton>
        <Link to={`/profile/${userID}`} className="nav-links">
          Profile
        </Link>
      </MenuItem>
      <MenuItem>
        <IconButton color="inherit">
          <SettingsIcon />
        </IconButton>
        <Link to="/editprofile" className="nav-links">
          Settings
        </Link>
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <IconButton color="inherit">
          <ExitToAppIcon />
        </IconButton>
        <p>Log off</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar className={classes.menuBar}>
          <Typography
            className={classes.title}
            variant="h6"
            noWrap
            component={LinkToHome}
          >
            PostMelon
          </Typography>

          {userID && (
            <div>
              <div className={classes.grow} />
              <div className={classes.sectionDesktop}>
                <IconButton color="inherit" component={LinkToHome}>
                  <HomeIcon />
                </IconButton>
                <IconButton
                  className="drop-down"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </div>
              <div className={classes.sectionMobile}>
                <IconButton onClick={handleMobileMenuOpen} color="inherit">
                  <MoreIcon />
                </IconButton>
              </div>
            </div>
          )}
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
};

export default NavigationBar;
