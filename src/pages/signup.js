import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
//MUI
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { signupUserAction } from "../redux/actions/userActions";

import axios from "axios";

function Signup() {
  let history = useHistory();

  let theme = useTheme();
  const useStyles = makeStyles({ ...theme.spreadThis });
  const classes = useStyles();

  const reduxUserState = useSelector(state => state.user);
  const reduxUIState = useSelector(state => state.ui);
  const loading = reduxUIState.loading;
  const errors = reduxUIState.errors;
  const dispatch = useDispatch();
  const signupUser = (signupData, history) => {
    dispatch(signupUserAction(signupData, history));
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [handle, setHandle] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const newUserData = {
      email: email,
      password: password,
      confirmPassword: confirmPassword,
      handle: handle
    };
    signupUser(newUserData, history);
  }

  function handleChange(event) {
    if (event.target.name === "email") setEmail(event.target.value);
    else if (event.target.name === "password") setPassword(event.target.value);
    else if (event.target.name === "confirmPassword")
      setConfirmPassword(event.target.value);
    else if (event.target.name === "handle") setHandle(event.target.value);
  }

  return (
    <div className={classes.formContainer}>
      <Typography variant="h3" className={classes.title}>
        Signup
      </Typography>
      <form noValidate onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          name="email"
          type="email"
          label="Email Address"
          className={classes.textField}
          helperText={errors.email}
          error={errors.email ? true : false}
          value={email}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          variant="outlined"
          name="password"
          type="password"
          label="Password"
          className={classes.textField}
          helperText={errors.password}
          error={errors.password ? true : false}
          value={password}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          variant="outlined"
          name="confirmPassword"
          type="password"
          label="Confirm Password"
          className={classes.textField}
          helperText={errors.confirmPassword}
          error={errors.confirmPassword ? true : false}
          value={confirmPassword}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          variant="outlined"
          name="handle"
          type="text"
          label="Handle"
          className={classes.textField}
          helperText={errors.handle}
          error={errors.handle ? true : false}
          value={handle}
          onChange={handleChange}
          fullWidth
        />
        {errors.general && (
          <Typography variant="body2" className={classes.errorMessage}>
            {errors.general}
          </Typography>
        )}
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          className={classes.button}
          fullWidth
          disabled={loading}
        >
          {loading ? (
            <CircularProgress className={classes.progress} />
          ) : (
            "Sign up"
          )}
        </Button>
        <Button
          type="submit"
          variant="outlined"
          className={classes.signup}
          fullWidth
          component={Link}
          to="/login"
        >
          Log in
        </Button>
      </form>
    </div>
  );
}

export default Signup;
