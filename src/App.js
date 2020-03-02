import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";

//pages
import Home from "./pages/home";
import Signup from "./pages/signup";
import Login from "./pages/login";
import Listings from "./pages/listings";

//components
import Navbar from "./components/navbar";

function App() {
  return (
    <div className="App">
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
    </div>
  );
}

export default App;
