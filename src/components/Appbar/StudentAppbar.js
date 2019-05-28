import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import axios from 'axios';
import { Redirect} from 'react-router-dom';
const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};



class  StudentAppbar extends Component  {

  state ={
    backtoDash :false
  }

  handleLogout = () => {
    let data = localStorage.getItem("usertoken")
           
    console.log(data)
     let headers = {
       headers: {
        Authorization: `bearer ${data}`
       }
        
     } 
  


    axios.get(`http://157.230.174.240:3006/api/v1/user/logout`,headers)
    .then(response => {
      console.log("response",response);
     
    
      if(response.data.flag === true ) {
    
        this.setState({backtoDash : true});
        localStorage.removeItem("usertoken")
      }
    })
    .catch(error => {
      console.log(error);
    });
  }





  render () {
    console.log(this.props);
    if(this.state.backtoDash ) 
    {
     return   <Redirect to="/" />
    }
  
  const { classes } = this.props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Student Dashboard
          </Typography>
          <Button color="inherit" onClick={this.handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
}
StudentAppbar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StudentAppbar);