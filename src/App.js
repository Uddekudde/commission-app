import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { home } from "./pages/home";
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route path="/" component={home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
