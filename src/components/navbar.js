import React, { Fragment, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Notifications from "./notifications";
//Redux
import { useSelector, useDispatch } from "react-redux";
import { logoutUserAction, getUserData } from "../redux/actions/userActions";
//MUI
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/Appbar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const useStyles = makeStyles({
  signupButton: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #ff4081 90%)",
    margin: "0 0 0 5px",
    color: "white"
  },
  button: {
    textTransform: "none",
    margin: "0 10px"
  },
  profileImage: {
    width: 50,
    height: 50,
    objectFit: "cover",
    maxWidth: "100%",
    borderRadius: "50%",
    marginLeft: "10px",
    cursor: "pointer"
  },
  buttonContainer: {
    display: "flex",
    margin: "auto"
  }
});

function Navbar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const userState = useSelector(state => state.user);
  const authenticated = userState.authenticated;
  const userData = userState.credentials;
  const dispatch = useDispatch();
  const history = useHistory();

  function handleLogout() {
    handleClose();
    dispatch(logoutUserAction(history));
  }

  function handleClick(event) {
    setOpen(true);
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setOpen(false);
    setAnchorEl(null);
  }

  return (
    <AppBar elevation={1}>
      <Toolbar>
        <div className={classes.buttonContainer}>
          <Button
            className={classes.button}
            color="inherit"
            component={Link}
            to="/"
          >
            Home
          </Button>
          <Button
            className={classes.button}
            color="inherit"
            component={Link}
            to="/listings"
          >
            Find a listing
          </Button>
          {!authenticated ? (
            <div />
          ) : (
            <Button
              className={classes.signupButton}
              color="primary"
              component={Link}
              to="/listings/new"
            >
              Create Listing
            </Button>
          )}
        </div>
        <div className={classes.buttonContainer}>
          {!authenticated ? (
            <Fragment>
              <Button
                className={classes.button}
                color="inherit"
                component={Link}
                to="/login"
              >
                Log in
              </Button>
              <Button
                variant="contained"
                className={classes.signupButton}
                component={Link}
                to="/signup"
              >
                Sign up
              </Button>
            </Fragment>
          ) : (
            <Fragment>
              <Notifications />
              <img
                src={userData.imageUrl}
                alt="profile"
                className={classes.profileImage}
                onClick={handleClick}
              />
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>View Profile</MenuItem>
                <MenuItem onClick={handleClose} component={Link} to="/profile">
                  Settings
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </Fragment>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
