import React, {  Component } from "react";
import { Paper } from "@material-ui/core/";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Adminsidebar from "./AdminSidebar";
import FNSUtils from '@date-io/date-fns';
import {  MuiPickersUtilsProvider, Calendar } from "material-ui-pickers";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3
  }
});



class Admindash extends Component {

  handleChange() {
    console.log("adsfadsf");
  }


  render() {


    return (
      <div>
        <CssBaseline />
        <Adminsidebar />
        <main >
          <div />

          <MuiPickersUtilsProvider utils={FNSUtils}>
          <div className="picker" style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"130px"}}>
                {/* <div className="picker" style={{width:"300px",marginTop:"131px",marginLeft:"320px"}}> */}
                  <Paper style={{ overflow: "hidden" }}>
                    <Calendar date={new Date()} onChange={this.handleChange} />
                  </Paper>
                </div>
        </MuiPickersUtilsProvider>

        </main>
      </div>
    );
  }
}

Admindash.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Admindash);
