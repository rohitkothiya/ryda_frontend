import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Link,withRouter} from 'react-router-dom'
import SurveyForm from '../Components/SurveyForm';

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

class Dashboard extends Component{
  state = {
    showSurveyForm : false
  }
  
   handleSurveyform = () => {
     console.log("clicked")
     this.setState({showSurveyForm:true})
   }
  
  
  
  
  render() {
   
  
  const { classes } =this.props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            Home Dashboard
          </Typography>
         <Button color="Primary"  onClick={this.handleSurveyform}>Surveyform</Button>
          






          <Link  to={{pathname:'/login'}}><Button tag={Link} color="Primary">Login</Button></Link>
          <Link to={{pathname:'/admin'}}><Button color="Primary">Admin</Button></Link>
          <Link to={{pathname:'/studentdashboard'}}><Button  color="Primary">Student</Button></Link>
          <Link to={{pathname:'/admin/news'}}><Button color="Primary">news</Button></Link>
          <Link to={{pathname:'/admin/userdata'}}><Button color="Primary">Register</Button></Link>
          <Link to={{pathname:'/admin/survey'}}><Button color="Primary">Survay</Button></Link>
          <Link to={{pathname:'/quiz'}}><Button color="Primary">Quiz</Button></Link>
          <Link to={{pathname:'/addquiz'}}><Button color="Primary">Addquiz</Button></Link>
        </Toolbar>             
      </AppBar>
        {this.state.showSurveyForm ?  <SurveyForm/> : null}

    </div>
  );
}
}
// Dashboard.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(withRouter(Dashboard));