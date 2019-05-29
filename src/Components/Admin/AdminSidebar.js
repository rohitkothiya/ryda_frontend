

import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import {Link,Redirect} from 'react-router-dom';
import axios from 'axios';
import Button from '@material-ui/core/Button';
const Slidebar = [
  {
  name:"Quiz",
  path:"/admin/addquiz"
},
{
  name:"Register",
  path:"/admin/userdata"
},
{
  name:"News",
  path:"/admin/news"
},
{
  name:"Survey",
  path:"/admin/survey"
},
]

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
  },
});

class Adminsidebar extends Component  {

  state = {
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














   render (){
  const { classes } = this.props;
  if(this.state.backtoDash ) 
    {
     return   <Redirect to="/" />
    }
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Admin Dashboard
          </Typography>
          <Button color="inherit" onClick={this.handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <div className={classes.toolbar} />
        <Divider />
        <List>
          {Slidebar.map((text, index) => (
                       <Link to={`${text.path}`}>
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text.name} />
            </ListItem></Link>
          ))}
        </List>
        <Divider />
       
      </Drawer>
     
    </div>
  );
}
}

Adminsidebar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Adminsidebar);


























