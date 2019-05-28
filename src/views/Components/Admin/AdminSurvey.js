

import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Adminsidebar from '../../../components/Sidebar/AdminSidebar';
import axios from 'axios';

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

 





class Adminsurvey extends Component  {

         componentDidMount() {
                   
          axios.get(`http://157.230.174.240:3006/api/v1/survey/getall`)
          .then(response => {
              console.log("response",response);
              console.log("response .data.data",response.data.data)
          })
          .catch(error => {
            console.log(error);
          });
         }






   render (){
  const { classes } = this.props;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Adminsidebar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
      <div>Survey's Data</div>
      </main>
    </div>
  );
}
}

Adminsurvey.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Adminsurvey);


























