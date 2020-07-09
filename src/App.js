import React from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import "./App.css";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import jwtDecode from "jwt-decode";
import axios from "axios";
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
import Listing from "./pages/listing";
import EditProfile from "./pages/editProfile";
import CreateListing from "./pages/createListing";
import RequestProject from "./pages/requestProject";
//components
import Navbar from "./components/navbar";
import themeContent from "./util/theme";
import AuthRoute from "./util/authRoute";
import ProtectedRoute from "./util/protectedRoute";

const theme = createMuiTheme(themeContent);
const customHistory = createBrowserHistory();
const projectPrefix = "/commission-app";

axios.defaults.baseURL =
  "https://europe-west1-commissionalpaca.cloudfunctions.net/api";

const token = localStorage.getItem("FBIdToken");
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(logoutUserAction(customHistory));
    customHistory.push("/login");
  } else {
    store.dispatch({ type: SET_AUTHENTICATED });
    axios.defaults.headers.common["Authorization"] = token;
    store.dispatch(getUserData());
  }
}

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <HashRouter history={customHistory} basename={projectPrefix}>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={Home} />
              <AuthRoute exact path="/login" component={Login} />
              <AuthRoute exact path="/signup" component={Signup} />
              <ProtectedRoute exact path="/profile" component={EditProfile} />
              <ProtectedRoute
                exact
                path="/listings/new"
                component={CreateListing}
              />
              <Route exact path="/listings" component={Listings} />
              <Route exact path="/listings/:id" component={Listing} />
              <ProtectedRoute
                exact
                path="/projects/new/:id"
                component={RequestProject}
              />
            </Switch>
          </div>
        </HashRouter>
      </Provider>
    </MuiThemeProvider>
  );
}

export default App;
