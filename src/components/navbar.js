import React from "react";
import AppBar from "@material-ui/core/Appbar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";

function Navbar() {
  return (
    <AppBar>
      <Toolbar>
        <Button color="inherit">Home</Button>
        <Button color="inherit">Log in</Button>
        <Button color="inherit">Sign up</Button>
        <Button color="inherit">Find a listing</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
