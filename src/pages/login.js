import React, { useState } from "react";
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
import { loginUserAction } from "../redux/actions/userActions";

function Login() {
  const history = useHistory();

  const theme = useTheme();
  const useStyles = makeStyles({ ...theme.spreadThis });
  const classes = useStyles();

  const reduxUIState = useSelector(state => state.ui);
  const loading = reduxUIState.loading;
  const errors = reduxUIState.errors;
  const dispatch = useDispatch();
  const loginUser = (loginData, history) => {
    dispatch(loginUserAction(loginData, history));
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    const loginData = {
      email: email,
      password: password
    };
    loginUser(loginData, history);
  }

  function handleChange(event) {
    event.target.name === "email"
      ? setEmail(event.target.value)
      : setPassword(event.target.value);
  }

  return (
    <div className={classes.formContainer}>
      <Typography variant="h3" className={classes.title}>
        Login
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
            "Log in"
          )}
        </Button>
        <Button
          type="submit"
          variant="outlined"
          className={classes.signup}
          fullWidth
          component={Link}
          to="/signup"
        >
          Sign up
        </Button>
      </form>
    </div>
  );
}

export default Login;
