import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {  Link } from "react-router-dom";

import { Redirect} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';


import axios from 'axios';
axios.default.baseURl = "http://157.230.174.240:3006/api";

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class  SignIn extends Component { 


    constructor(props) {
     super(props)
         this.state= {
             role:1,
             name:" ",
             password:"",
             open:false,

         }
    }
    handleClickOpen = () => {
      this.setState({ open: true });
    };
  
    handleClose = () => {
      this.setState({ open: false });
    };
  





  handleLogin = () => {
      event.preventDefault();
      console.log("login clicked");
      
       let loginData  = {
           name: this.state.name,
           password:this.state.password,
           role:this.state.role
       }
      console.log("loginData",loginData)
         
      axios.post(`http://157.230.174.240:3006/api/v1/user/login`,loginData)
      .then(response => {
        console.log("response",response);
        console.log("response .data.data",response.data.data.token)
        console.log("responserole",response.data.data.role)
        console.log("tokenrole",response.data.data.User.role)
        localStorage.setItem("userdata", JSON.stringify(response.data.data.token));
        if(response.data.flag === true && response.data.data.User.role === 2) {
      
          this.setState({backtoDashboard : true});
        }
      })
      .catch(error => {
        console.log(error);
      });
    }
       

  handleRadioButton = value => {
      console.log(value);
      console.log("radio button clicked")
      this.setState({role: value});
      console.log("role value",this.state.role)
  }

 handleChangeInputText = () => {
     console.log(event.target.name);
    this.setState({
        [event.target.name] : event.target.value
    })
 }
 


  render() {
    if(this.state.backtoDashboard ) 
{
 return   <Redirect to="/student"/>
}
else {
  <Redirect to="/admin"/>
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
          Login
        </Typography>
        <form className={classes.form}>

        <FormControl component="fieldset" className={classes.formControl}>
        
          <RadioGroup
            aria-label="Gender"
            name="gender1"
            className={classes.group}
            value={this.state.value}
            onChange={this.handleChange}
          >
            <FormControlLabel  control={<Radio checked={this.state.role === 1} onClick={() =>this.handleRadioButton(1)} />} label="Admin"    />
            <FormControlLabel  control={<Radio checked={this.state.role === 2}  onClick={() =>this.handleRadioButton(2)}/>} label="Student"  />
            
         
          </RadioGroup>
        </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="name">Username</InputLabel>
            <Input id="name" name="name" autoComplete="name" autoFocus onChange={this.handleChangeInputText} />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password" type="password" id="password" autoComplete="current-password" onChange={this.handleChangeInputText} />
          </FormControl>
          <Grid container style={{marginTop:"5px"}}>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link to={{pathname:"/register"}} variant="body2">
                {"Don't have an account? Register Now"}
              </Link>
            </Grid>
          </Grid>
          <Button
            type="submit"
            style={{marginRight:"25px"}}
            variant="contained"
            color="primary"
            fullwidth
            className={classes.submit}
            onClick={this.handleLogin}
          >
            Login
          </Button>
          <Button
            type="submit"
            
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={this.handleClickOpen}
          >
            Reset password
          </Button>
        
          <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          
          <DialogTitle id="form-dialog-title">Reset Password</DialogTitle>
          <DialogContent>
            <DialogContentText>
              please enter your email address here. We will send
               link to your  email addeess.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Email Address"
              type="email"
              fullWidth
            />
          </DialogContent>
          <DialogActions>
          
            <Button onClick={this.handleClose} color="primary">
              Reset
            </Button>
          </DialogActions>
        </Dialog>
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