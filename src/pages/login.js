import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
//MUI
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import axios from "axios";

const useStyles = makeStyles({
  formContainer: {
    textAlign: "center",
    width: "396px",
    margin: "0 auto 0 auto"
  },
  title: {
    color: "#484848"
  },
  textField: {
    margin: "10px 0 10px 0"
  },
  button: {
    marginTop: "20px"
  },
  signup: {
    marginTop: "20px",
    color: "black"
  },
  errorMessage: {
    color: "red",
    marginTop: "10px"
  }
});

function Login(props) {
  let history = useHistory();
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    const loginData = {
      email: email,
      password: password
    };
    axios
      .post("/login", loginData)
      .then(res => {
        console.log(res.data);
        setLoading(false);
        history.push("/");
      })
      .catch(err => {
        setErrors(err.response.data);
        setLoading(false);
      });
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
