import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import themeContent from "./util/theme";
import AuthRoute from "./util/authRoute";
import jwtDecode from "jwt-decode";

//pages
import Home from "./pages/home";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Listings from "./pages/listings";

//components
import Navbar from "./components/navbar";

const theme = createMuiTheme(themeContent);

let authenticated;
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = "/login";
    authenticated = false;
  } else {
    authenticated = true;
  }
}

function App() {
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <AuthRoute
                exact
                path="/login"
                component={Login}
                authenticated={authenticated}
              />
              <AuthRoute
                exact
                path="/signup"
                component={Signup}
                authenticated={authenticated}
              />
              <Route exact path="/listings" component={Listings} />
            </Switch>
          </div>
        </BrowserRouter>
      </MuiThemeProvider>
    </div>
  );
}

export default App;
