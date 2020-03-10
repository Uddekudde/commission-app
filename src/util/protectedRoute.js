import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

function ProtectedRoute({ component: Component, ...rest }) {
  const reduxUserState = useSelector(state => state.user);
  const authenticated = reduxUserState.authenticated;
  return (
    <Route
      {...rest}
      render={props =>
        authenticated === true ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}

export default ProtectedRoute;
