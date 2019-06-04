import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";

import IconButton from "@material-ui/core/IconButton";

import HomeIcon from "@material-ui/icons/Home";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import { NavLink, Redirect } from "react-router-dom";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";

import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";

import logo from '../../images/logo1.jpg';

import { DialogTitle } from "@material-ui/core";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  },
  active: {
    color: "white"
  }
});

class Adminsidebar extends React.Component {
  state = {
    name: "",
    email: "",
    qualification: "B.TECH",
    age: "",
    mobileOpen: false,
    backtoDash: false,
    isAccountMenu: false,
    isProfileShow: false,
    isChangePasswordShow:false,
    password:"",
    confirmPassword:"",
    btnLoading:false
  };

  componentDidMount() {
    let data = localStorage.getItem("usertoken");

    console.log(data);
    let headers = {
      headers: {
        Authorization: `bearer ${data}`
      }
    };
    axios
      .get(`http://157.230.174.240:3006/api/v1/user/getuserbytoken`, headers)
      .then(response => {
        console.log("response", response);
        this.setState({
          name: response.data.data.name,
          email: response.data.data.email,
          age: response.data.data.age,
          qualification: response.data.data.qualification,
          id: response.data.data._id
        });
        console.log(
          "getch state data",
          this.state.name,
          this.state.email,
          this.state.age,
          this.state.qualification,
          this.state.id
        );
      })
      .catch(error => {
        console.log(error);
      });
  }
  handleChangeInput = () => {
    this.setState({ [event.target.name]: event.target.value });
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

  handleOpenAccountMenu = () => {
    this.setState({ isAccountMenu: true });
  };

  handleCloseAccountMenu = () => {
    this.setState({ isAccountMenu: false });
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  handelOpenProfile = () => {
    this.setState({ isProfileShow: true });
  };

  handleCloseProfile = () => {
    this.setState({ isProfileShow: false, isAccountMenu: false });
  };

  handelSaveProfile = () => {
    event.preventDefault();
    this.setState({btnLoading:true})
    let body = {
      name: this.state.name,
      email: this.state.email,
      age: this.state.age,
      qualification: this.state.qualification
    };
    console.log("body", body);
    let data = localStorage.getItem("usertoken");

    console.log("data", data);
    let headers = {
      headers: {
        Authorization: `bearer ${data}`
      }
    };
    axios
      .patch(
        `http://157.230.174.240:3006/api/v1/user/userupdate/${this.state.id}`,
        body,
        headers
      )
      .then(response => {
        console.log("response", response);
        this.setState({ isProfileShow: false, isAccountMenu: false,btnLoading:false });
      })
    
      .catch(error => {
        this.setState({btnLoading:false})
        console.log(error);
      });
  };

  handleOpenPasswordDailog = () => {
    this.setState({isChangePasswordShow:true})
  }
  handleClosePasswordDailog = () => {
   this.setState({ isChangePasswordShow: false });
 };



  handleResetPassword = () => {
    event.preventDefault();
   this.setState({btnLoading:true})
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
            // alert("Password reset Succesfully");
            this.setState({ isChangePasswordShow:false,btnLoading:false,isAccountMenu:false });
          } 
        })
        .catch(error => {
          console.log(error);
        });
      }
    //  else {
    //   this.setState({ errorPassword: true });
    // }
  };
  render() {
    if (this.state.backtoDash) {
      return <Redirect to="/" />;
    }

    const { classes, theme } = this.props;
    const { isAccountMenu, name, email, age, qualification } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed">
          <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{display:"flex", alignItems: 'center'}}>
            <NavLink to="/studentdashboard" style={{ color: 'white', display: 'flex', alignItems: 'center', textDecoration: 'unset' }} >
                <img height="48px" src={logo} style={{ borderRadius: '6px' }} />
              <Typography variant="h6" color="inherit" noWrap style={{ marginLeft: '12px' }}>
                Student Dashboard
              </Typography>
            </NavLink>
            
            </div>
            <div>
              {/* <NavLink to="/studentdashboard" activeClassName={classes.active}>
                {" "}
                <Button color="inherit">Dashboard</Button>
              </NavLink>
              <NavLink to="/quiz" activeClassName={classes.active}>
                {" "}
                <Button color="inherit">Quiz</Button>
              </NavLink>
              <NavLink to="/result" activeClassName={classes.active}>
                {" "}
                <Button color="inherit">Result</Button>
              </NavLink>
              <NavLink to="/feedback" activeClassName={classes.active}>
                {" "}
                <Button color="inherit">Feedback</Button>
              </NavLink> */}
              <IconButton
                aria-owns={open ? "menu-appbar" : undefined}
                aria-haspopup="true"
                onClick={this.handleOpenAccountMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            <Menu
              id="menu-appbar"
              anchorEl={isAccountMenu}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              open={isAccountMenu}
              onClose={this.handleCloseAccountMenu}
            >
              <MenuItem onClick={this.handelOpenProfile}>Profile</MenuItem>
              <MenuItem onClick={this.handleOpenPasswordDailog}>Change Password</MenuItem>
              <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
            </Menu>
            <Dialog
              open={this.state.isProfileShow}
              onClose={this.handleCloseProfile}
              aria-labelledby="form-dialog-title"
              maxWidth="md"
            >
                <form onSubmit={this.handelSaveProfile}>
              <DialogTitle> Profile </DialogTitle>
              <Divider />
              <DialogContent>
                <TextField
                  margin="dense"
                  id="name"
                  label="Name"
                  multiline
                  type="text"
                  fullWidth
                  name="name"
                  onChange={this.handleChangeInput}
                  value={name}
                  variant="outlined"
                  required
                />
                <TextField
                  type="email"
                  margin="dense"
                  id="email"
                  label="Email"
                  multiline
                  type="email"
                  fullWidth
                  name="email"
                  onChange={this.handleChangeInput}
                  value={email}
                  variant="outlined"
                  disabled
                />
                <TextField
                  margin="dense"
                  id="age"
                  label="Age"
                  multiline
                  type="number"
                  fullWidth
                  name="age"
                  onChange={this.handleChangeInput}
                  value={age}
                  variant="outlined"
                  required

                />

                <div>
                  <TextField
                    name="qualification"
                    id="standard-with-placeholder"
                    select
                    label="Qualification"
                    value={qualification}
                    onChange={this.handleChangeInput}
                    SelectProps={{
                      native: true,
                      MenuProps: {
                        className: classes.menu
                      }
                    }}
                    margin="dense"
                    style={{ minWidth: "120px" }}
                    variant="outlined"
                  >
                    {["B.TECH", "B.E", "M.B.A","B.A"].map(level => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </TextField>
                
                </div>
              </DialogContent>
              <DialogActions>
                <Button color="default" onClick={this.handleCloseProfile}>
                  Cancel
                </Button>

                <Button
                  variant="contained"
                  // onClick={this.handelSaveProfile}
                  color="primary"
                  type="submit"
                 
                  style={{backgroundColor:"#3f98b5"}}
                >
                  {this.state.btnLoading ? "Saving" : "Save"}
                </Button>
              </DialogActions>
              </form>
            </Dialog>
            <Dialog
              open={this.state.isChangePasswordShow}
              onClose={this.handleClosePasswordDailog}
              aria-labelledby="form-dialog-title"
              maxWidth="md"
            >
                <form onSubmit={this.handleResetPassword}>
              <DialogTitle> Change ChangepassWord </DialogTitle>
              <Divider />
              <DialogContent>
                {/* <TextField
                  margin="dense"
                  id="password"
                  label="password"
                  multiline
                  type="password"
                  fullWidth
                  name="password"
                  onChange={this.handleChangeInput}
                  value={this.state.password}
                  variant="outlined"
                  required
                /> */}
                 <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Enter Password</InputLabel>
              <Input
                id="password"
                name="password"
                autoComplete="password"
                type="password"
                onChange={this.handleChangeInput}
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
                onChange={this.handleChangeInput}
                variant="outlined"
              />
            </FormControl>
               
               {this.state.confirmPassword === this.state.password ? null : (
              <div style={{ color: "red" }}>Password does not Matched</div>
            )}

              </DialogContent>
              <DialogActions>
                <Button color="default" onClick={this.handleClosePasswordDailog}>
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  // onClick={this.handelSaveProfile}
                  type="submit"
                  color="primary"
                  style={{backgroundColor:"#3f98b5"}}
                >
                  {this.state.btnLoading ? "Saving" : "Save"}
                </Button>
              </DialogActions>
              </form>
            </Dialog>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

Adminsidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(Adminsidebar);