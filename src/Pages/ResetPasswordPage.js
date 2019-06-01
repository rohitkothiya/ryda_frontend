import React, { Component } from "react";
// import PropTypes from 'prop-types';
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";

import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

import { Link } from "react-router-dom";

import { Redirect } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

import axios from "axios";
// axios.default.baseURl = "http://157.230.174.240:3006/api";

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
      email: "",
      password: "",
      confirmPassword: "",
      errorPassword: false
    };
  }
  handleResetPassword = () => {
    event.preventDefault();

    if (this.state.password === this.state.confirmPassword) {
      this.setState({ errorPassword: false });
      let body = {
        email: this.state.email,
        password: this.state.confirmPassword
      };

      axios
        .post(`http://157.230.174.240:3006/api/v1/user/resetpassword`, body)
        .then(response => {
          console.log("response", response);

          if (response.data.data._id) {
            alert("Password reset Succesfully");
            this.setState({ backToLogin: true });
          } else {
            alert("Please enter valid Email Id");
            // this.setState({backToLogin:true})
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      this.setState({ errorPassword: true });
    }
  };
  handleChangeInputText = () => {
    console.log(event.target.name);
    this.setState({
      [event.target.name]: event.target.value
    });

    // console.log(event.target.password.value === event.target.confirmPassword.value);
  };

  render() {
    if (this.state.backToLogin) {
      return <Redirect to="/login" />;
    }
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          <form className={classes.form}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email"> Enter Email</InputLabel>
              <Input
                id="email"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={this.handleChangeInputText}
                variant="outlined"
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Enter Password</InputLabel>
              <Input
                id="password"
                name="password"
                autoComplete="password"
                type="password"
                onChange={this.handleChangeInputText}
                variant="outlined"
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="confirm password">
                {" "}
                Confirm Password
              </InputLabel>
              <Input
                // error={this.state.password === this.state.confirmPassword}
                id="confirmpassword"
                name="confirmPassword"
                autoComplete="password"
                type="password"
                onChange={this.handleChangeInputText}
                variant="outlined"
              />
            </FormControl>
            {this.state.confirmPassword === this.state.password ? null : (
              <div style={{ color: "red" }}>Password does not Matched</div>
            )}
            <Button
              type="submit"
              style={{ marginRight: "25px" }}
              variant="contained"
              color="primary"
              fullWidth
              className={classes.submit}
              onClick={this.handleResetPassword}
            >
              Reset
            </Button>
            <Grid container style={{ marginTop: "20px" }}>
              <Grid item xs>
                <Link
                  style={{ textDecoration: "unset" }}
                  to={{ pathname: "/login" }}
                  variant="body2"
                >
                  {"< Back to Login"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </main>
    );
  }
}

// SignIn.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(SignIn);
