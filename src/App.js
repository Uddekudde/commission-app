import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

//pages
import Home from "./pages/home";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Listings from "./pages/listings";

//components
import Navbar from "./components/navbar";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#ffffff"
    },
    secondary: {
      background: "linear-gradient(45deg, #7a49c4 30%, #ff4081 90%)",
      main: "#ff4081"
    }
  }
});

function App() {
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <Route exact path="/listings" component={Listings} />
            </Switch>
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
