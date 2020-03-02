import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./App.css";

//pages
import { home } from "./pages/home";
import { signup } from "./pages/signup";
import { login } from "./pages/login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={home} />
          <Route exact path="/login" component={login} />
          <Route exact path="/signup" component={signup} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
