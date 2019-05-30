import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Input from "@material-ui/core/Input";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import DialogTitle from "@material-ui/core/DialogTitle";
import Paper from "@material-ui/core/Paper";

import axios from "axios";
import { Redirect } from "react-router-dom";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

class StudentAppbar extends Component {
  state = {
    backtoDash: false,
    isProfile: false
  };

  handleLogout = () => {
    let data = localStorage.getItem("usertoken");

    console.log(data);
    let headers = {
      headers: {
        Authorization: `bearer ${data}`
      }
    };

    axios
      .get(`http://157.230.174.240:3006/api/v1/user/logout`, headers)
      .then(response => {
        console.log("response", response);

        if (response.data.flag === true) {
          this.setState({ backtoDash: true });
          localStorage.removeItem("usertoken");
        }
      })
      .catch(error => {
        console.log(error);
      });
  };
  handleProfile = () => {
    this.setState({ isProfile: true });
  };

  handleClose = () => {
    this.setState({ isProfile: false });
  };

  render() {
    console.log(this.props);
    if (this.state.backtoDash) {
      return <Redirect to="/" />;
    }

    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={this.handleProfile}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Student Dashboard
            </Typography>
            <Button color="inherit" onClick={this.handleLogout}>
              Logout
            </Button>
          </Toolbar>
          <Dialog
            open={this.state.isProfile}
            onClose={this.handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Profile</DialogTitle>
            <DialogContent>
              <form className={classes.form}>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="name">Name</InputLabel>
                  <Input
                    id="name"
                    name="nameRegister"
                    autoComplete="name"
                    autoFocus
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="email">Email Address</InputLabel>
                  <Input id="email" name="emailRegister" autoComplete="email" />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="age">Age</InputLabel>
                  <Input
                    name="ageRegister"
                    type="number"
                    id="age"
                    autoComplete="current-password"
                  />
                </FormControl>
                <FormControl margin="normal" required fullWidth>
                  <InputLabel htmlFor="eduction"> Higher Eduction</InputLabel>
                  <Input
                    name="eductionRegister"
                    type="text"
                    id="eduction"
                    autoComplete="current-password"
                  />
                </FormControl>
                <DialogActions>
                  <Button onClick={this.handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={this.handleClose} color="primary">
                    Save
                  </Button>
                </DialogActions>
              </form>
            </DialogContent>
          </Dialog>
        </AppBar>
      </div>
    );
  }
}
StudentAppbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(StudentAppbar);
