import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MailIcon from "@material-ui/icons/Mail";
import MenuIcon from "@material-ui/icons/Menu";
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

import { DialogTitle } from "@material-ui/core";

const Slidebar = [
  {
    name: "Quiz",
    path: "/admin/addquiz"
  },
  {
    name: "Register",
    path: "/admin/userdata"
  },
  {
    name: "News",
    path: "/admin/news"
  },
  {
    name: "Survey",
    path: "/admin/survey"
  }
];

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
    color: "red"
  }
});

class Adminsidebar extends React.Component {
  state = {
    name: "",
    email: "",
    qualification: "Btech",
    age: "",
    mobileOpen: false,
    backtoDash: false,
    isAccountMenu: false,
    isProfileShow: false,
    btnLoading: false
  };

  componentDidMount() {
    this.setState({ btnLoading: false });
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
    this.setState({ isProfileShow: false });
  };

  handelSaveProfile = () => {
    this.setState({ btnLoading: true });
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
        this.setState({
          isProfileShow: false,
          isAccountMenu: false,
          btnLoading: false
        });
      })
      .catch(error => {
        this.setState({ btnLoading: false });
        console.log(error);
      });
  };
  render() {
    if (this.state.backtoDash) {
      return <Redirect to="/" />;
    }

    const { classes, theme } = this.props;
    const { isAccountMenu, name, email, age, qualification } = this.state;
    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {Slidebar.map((text, index) => (
            <NavLink to={`${text.path}`} activeClassName={classes.active}>
              <ListItem button key={index}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text.name} />
              </ListItem>
            </NavLink>
          ))}
        </List>
        <Divider />
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" color="inherit" noWrap>
                Admin Dashboard
              </Typography>
            </div>
            <IconButton
              aria-owns={open ? "menu-appbar" : undefined}
              aria-haspopup="true"
              onClick={this.handleOpenAccountMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={isAccountMenu}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right"
              }}
              paper={{
                top: '0 !important'
              }}
              open={isAccountMenu}
              onClose={this.handleCloseAccountMenu}
            >
              <MenuItem onClick={this.handelOpenProfile}>Profile</MenuItem>
              <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
            </Menu>
            <Dialog
              open={this.state.isProfileShow}
              onClose={this.handleCloseProfile}
              aria-labelledby="form-dialog-title"
              maxWidth="md"
            >
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
                />
                <TextField
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
                    {["Btech", "MBA", "BA"].map(level => (
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
                  onClick={this.handelSaveProfile}
                  color="primary"
                >
                  {this.state.btnLoading ? "Saving" : "Save"}
                </Button>
              </DialogActions>
            </Dialog>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper
              }}
              variant="permanent"
              open
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
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

// import React, { Component } from "react";
// import PropTypes from "prop-types";
// import { withStyles } from "@material-ui/core/styles";
// import Drawer from "@material-ui/core/Drawer";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import AppBar from "@material-ui/core/AppBar";
// import Toolbar from "@material-ui/core/Toolbar";
// import List from "@material-ui/core/List";
// import Typography from "@material-ui/core/Typography";
// import Divider from "@material-ui/core/Divider";
// import ListItem from "@material-ui/core/ListItem";
// import ListItemIcon from "@material-ui/core/ListItemIcon";
// import ListItemText from "@material-ui/core/ListItemText";
// import InboxIcon from "@material-ui/icons/MoveToInbox";
// import MailIcon from "@material-ui/icons/Mail";
// import { NavLink, Redirect } from "react-router-dom";
// import axios from "axios";
// import Button from "@material-ui/core/Button";
// const Slidebar = [
//   {
//     name: "Quiz",
//     path: "/admin/addquiz"
//   },
//   {
//     name: "Register",
//     path: "/admin/userdata"
//   },
//   {
//     name: "News",
//     path: "/admin/news"
//   },
//   {
//     name: "Survey",
//     path: "/admin/survey"
//   }
// ];

// const drawerWidth = 240;

// const styles = theme => ({
//   root: {
//     display: "flex"
//   },
//   appBar: {
//     width: `calc(100% - ${drawerWidth}px)`,
//     marginLeft: drawerWidth
//   },
//   drawer: {
//     width: drawerWidth,
//     flexShrink: 0
//   },
//   drawerPaper: {
//     width: drawerWidth
//   },
//   toolbar: theme.mixins.toolbar,
//   content: {
//     flexGrow: 1,
//     backgroundColor: theme.palette.background.default,
//     padding: theme.spacing.unit * 3
//   },
//   active: {
//     color: "red"
//   }
// });

// class Adminsidebar extends Component {
//   state = {
//     backtoDash: false
//   };
//   handleLogout = () => {
//     let data = localStorage.getItem("usertoken");

//     console.log(data);
//     let headers = {
//       headers: {
//         Authorization: `bearer ${data}`
//       }
//     };

//     axios
//       .get(`http://157.230.174.240:3006/api/v1/user/logout`, headers)
//       .then(response => {
//         console.log("response", response);

//         if (response.data.flag === true) {
//           this.setState({ backtoDash: true });
//           localStorage.removeItem("usertoken");
//         }
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   };

//   render() {
//     const { classes } = this.props;
//     if (this.state.backtoDash) {
//       return <Redirect to="/" />;
//     }
//     return (
//       <div className={classes.root}>
//         <CssBaseline />
//         <AppBar position="fixed" className={classes.appBar}>
//           <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
//             <Typography variant="h6" color="inherit" noWrap>
//               Admin Dashboard
//             </Typography>
//             <Button color="inherit" onClick={this.handleLogout}>
//               Logout
//             </Button>
//           </Toolbar>
//         </AppBar>
//         <Drawer
//           className={classes.drawer}
//           variant="permanent"
//           classes={{
//             paper: classes.drawerPaper
//           }}
//           anchor="left"
//         >
//           <div className={classes.toolbar} />
//           <Divider />
//           <List>
//             {Slidebar.map((text, index) => (
//               <NavLink to={`${text.path}`} activeClassName={classes.active}>
//                 <ListItem button key={index}>
//                   <ListItemIcon>
//                     {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//                   </ListItemIcon>
//                   <ListItemText primary={text.name} />
//                 </ListItem>
//               </NavLink>
//             ))}
//           </List>
//           <Divider />
//         </Drawer>
//       </div>
//     );
//   }
// }

// Adminsidebar.propTypes = {
//   classes: PropTypes.object.isRequired
// };

// export default withStyles(styles)(Adminsidebar);
