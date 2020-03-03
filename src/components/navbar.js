import React from "react";
import AppBar from "@material-ui/core/Appbar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  signupButton: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #ff4081 90%)",
    margin: "0 0 0 5px",
    color: "white"
  },
  button: {
    textTransform: "none"
  }
});

function Navbar() {
  const classes = useStyles();
  return (
    <AppBar elevation={1}>
      <Toolbar>
        <div className="button-container">
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
        </div>
        <div className="button-container">
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
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
