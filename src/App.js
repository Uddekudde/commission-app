import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import jwtDecode from "jwt-decode";
//Redux
import { Provider } from "react-redux";
import store from "./redux/store";
import { SET_AUTHENTICATED } from "./redux/types";
import { logoutUserAction, getUserData } from "./redux/actions/userActions";
//pages
import Home from "./pages/home";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Listings from "./pages/listings";
//components
import Navbar from "./components/navbar";
import themeContent from "./util/theme";
import AuthRoute from "./util/authRoute";
import ProtectedRoute from "./util/protectedRoute";
import EditProfile from "./pages/editProfile";

const theme = createMuiTheme(themeContent);

const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUserAction());
    window.location.href = "/login";
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <AuthRoute exact path="/login" component={Login} />
              <AuthRoute exact path="/signup" component={Signup} />
              <ProtectedRoute exact path="/profile" component={EditProfile} />
              <Route exact path="/listings" component={Listings} />
            </Switch>
          </div>
        </BrowserRouter>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
