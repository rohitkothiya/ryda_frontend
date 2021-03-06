import React, { Component } from "react";
// import PropTypes from 'prop-types';
// import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";

import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
// import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";
import { withRouter } from "react-router-dom";
import { Redirect } from "react-router-dom";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import TextField from "@material-ui/core/TextField";

const optionList = [
  {
    value: "a",
    label: "B.TECH"
  },
  {
    value: "b",
    label: "B.E"
  },
  {
    value: "c",
    label: "M.B.A"
  },
  {
    value: "d",
    label: "B.A"
  }
];

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

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameRegister: "",
      emailRegister: " ",
      passwordRegister: "",
      ageRegister: "",
      eductionRegister: "",
      backtoDashboard: false,
      loading:false
    };
    this.handleRegister = this.handleRegister.bind(this);
  }
  handleChangeInputQualification = (event) => {
    console.log(event.target.name)
    console.log(event.target.value)
    this.setState({
     eductionRegister:event.target.value
    });
  };
 
  handleRegister = () => {
    event.preventDefault();
    this.setState({loading:true})
    
    console.log("Register clicked");

    let body = {
      name: this.state.nameRegister,
      email: this.state.emailRegister,
      password: this.state.passwordRegister,
      age: this.state.ageRegister,
      qualification: this.state.eductionRegister
    };
    console.log("body", body);

    axios
      .post(`http://157.230.174.240:3006/api/v1/user`, body)
      .then(response => {
        console.log("response", response);

        console.log("response .data.data", response.data.data);

        // Saves user token to localStorage
        //  localStorage.getItem("Usertoken")
        console.log("token", response.data.data.token);
        localStorage.setItem("usertoken", response.data.data.token);
        console.log(response.data.flag, response.data.flag === true);
        if(!Boolean(response.data.data.token))
        {
          this.setState({loading:false})
           alert("Email id is already exist please enter valid email Id")
          
        }
        if (response.data.flag === true) {
          this.setState({ backtoDashboard: true ,loading:false});
        }
      })
      .catch(error => {
        this.setState({loading:true})
        console.log(error);
      });
  };

  //   handleRadioButton = value => {
  //       console.log(value);
  //       console.log("radio button clicked")
  //       this.setState({role: value});
  //       console.log("role value",this.state.role)
  //   }

  handleChangeInputText = () => {
    console.log(event.target.name);
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;

    if (this.state.backtoDashboard) {
      return <Redirect to="/studentdashboard" />;
    }
    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h5">
            Student Register
          </Typography>
          <form className={classes.form} onSubmit={this.handleRegister}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input
                id="name"
                name="nameRegister"
                autoComplete="name"
                autoFocus
                onChange={this.handleChangeInputText}
                // defaultValue="rohit"
                required
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
              type="email"
                id="email"
                name="emailRegister"
                autoComplete="email"
                onChange={this.handleChangeInputText}
                // defaultValue="rohit@gmail.com"
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="passwordRegister"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={this.handleChangeInputText}
                // defaultValue="123"
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="age">Age</InputLabel>
              <Input
                name="ageRegister"
                type="number"
                id="age"
                autoComplete="current-password"
                onChange={this.handleChangeInputText}
                // defaultValue="24"
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              {/* <TextField
                name="educationRegister"
                id="standard-with-placeholder"
                select
                label="Education"
                // className={classes.textField}
                value={this.state.eductionRegister}
                onChange={this.handleChangeInput}
                SelectProps={{
                  native: true,
                  MenuProps: {
                    className: classes.menu
                  }
                }}
                helperText="Please select right answer"
                margin="normal"
              >
                {["B.TECH", "B.E", "M.B.A","B.A"].map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </TextField> */}
              <TextField
                    name="educationRegister"
                    id="standard-with-placeholder"
                    select
                    label="Education Qualification"
                    // value={this.state.eductionRegister}
                    onChange={this.handleChangeInputQualification}
                   
                    SelectProps={{
                      native: true,
                      MenuProps: {
                        className: classes.menu
                      }
                    }}
                    margin="dense"
                    // style={{ minWidth: "120px" }}
                    
                  >
                    {["B.TECH", "B.E", "M.B.A","B.A"].map(level => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </TextField>
            </FormControl>
            <Grid container>
              <Grid item xs />
              <Grid item />
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              style ={{backgroundColor:"#3f98b5"}}
              // onClick={this.handleRegister}
            >
           {this.state.loading ? "Loading" : "Register" } 
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

// Register.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(withRouter(Register));
