import React from "react";
import AppBar from "@material-ui/core/Appbar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Link from "react-router-dom/Link";

function Navbar() {
  return (
    <AppBar>
      <Toolbar>
        <div className="button-container">
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/listings">
            Find a listing
          </Button>
        </div>
        <div className="button-container">
          <Button color="inherit" component={Link} to="/login">
            Log in
          </Button>
          <Button color="inherit" component={Link} to="/signup">
            Sign up
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
