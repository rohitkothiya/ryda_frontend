import React, { Component } from "react";
// import PropTypes from 'prop-types';

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";

import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
// import Avatar from "@material-ui/core/Avatar";
import { Link } from "react-router-dom";

import { Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

import axios from "axios";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      role: 1,
      email: "rohitkl@gmail.com",
      password: "1234",
      open: false,
      backtoDashboard: false,
      backtoAdmin: false,
      btnLoading: false
    };
  }

  handleLogin = () => {
    this.setState({ btnLoading: true });
    event.preventDefault();

    let body = {
      email: this.state.email,
      password: this.state.password
    };
    console.log("loginData", body);

    axios
      .post(`http://157.230.174.240:3006/api/v1/user/login`, body)
      .then(response => {
        console.log("response", response);
        console.log("response .data.data", Boolean(response.data.data.token));
        console.log("responserole", response.data.data.role);
        // console.log("tokenrole", response.data.data.User.role);
        console.log("respnse data level", Boolean(response.data.data.level));
        localStorage.setItem("usertoken", response.data.data.token);

        if (response.data.flag === true && response.data.data.User.role === 2) {
          this.setState({ backtoDashboard: true, btnLoading: false });
        }
        if (response.data.flag === true && response.data.data.User.role === 1) {
          this.setState({ backtoAdmin: true, btnLoading: false });
        }
        if (Boolean(response.data.data.token) === false) {
          this.setState({ btnLoading: false });
          alert("Please Enter Valid Username & Password");
        }
      })
      .catch(error => {
        this.setState({ btnLoading: true });
        console.log(error);
      });
  };

  handleChangeInputText = () => {
    console.log(event.target.name);
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    if (this.state.backtoAdmin) {
      return <Redirect to="/admin/addquiz" />;
    }

    if (this.state.backtoDashboard) {
      return <Redirect to="/studentdashboard" />;
    }

    const { classes } = this.props;
    const { btnLoading } = this.state;
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email</InputLabel>
              <Input
                type="email"
                id="email"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={this.handleChangeInputText}
                required
                
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={this.handleChangeInputText}
                required
              />
            </FormControl>
            <Grid container>
              <Grid item xs>
                <Link
                  style={{ textDecoration: "unset" }}
                  to={{ pathname: "/resetpassword" }}
                  variant="body2"
                >
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link
                  style={{ textDecoration: "unset" }}
                  to={{ pathname: "/register" }}
                  variant="body2"
                >
                  Register Now
                </Link>
              </Grid>
            </Grid>
            <Button
              type="submit"
              style={{ marginRight: "25px" }}
              variant="contained"
              color="primary"
           
               style ={{backgroundColor:"#3f98b5"}}
              fullWidth
              className={classes.submit}
              onClick={this.handleLogin}
            >
              {btnLoading ? "Loading" : "Login"}
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
}

export default withStyles(styles)(SignIn);
