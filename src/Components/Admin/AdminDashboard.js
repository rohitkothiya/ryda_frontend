import React, {  Component } from "react";
import { Paper } from "@material-ui/core/";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Adminsidebar from "./AdminSidebar";
import FNSUtils from '@date-io/date-fns';
import {  MuiPickersUtilsProvider, Calendar } from "material-ui-pickers";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import axios from 'axios';
import moment from 'moment';

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

  constructor() {
    super();
    this.state={
      userData: [],
      loading: false,
    }
  }

  handleChange() {
    console.log("adsfadsf");
  }

  componentDidMount() {
    this.setState({ loading: true });
    let data = localStorage.getItem("usertoken");
    let headers = {
      headers: {
        Authorization: `bearer ${data}`
      }
    };

    axios
      .get(
        `http://157.230.174.240:3006/api/v1/user/getalluserforadmin`,
        headers
      )
      .then(response => {
        console.log("response", response);
        console.log("response .data.data", response.data.data);
        this.setState({
          userData: [...this.state.userData, ...response.data.data],
          loading: false
        });
        console.log("fetched user data", this.state.userData);
      })
      .catch(error => {
        this.setState({ loading: false });
        console.log(error);
      });
  }

  render() {

    const data = [{ date: moment().format('YYYY/MM/DD'), students: this.state.userData.length }]

    return (
      <div>
        <CssBaseline />
        <Adminsidebar />
        <main >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginLeft: '300px', flexWrap: 'wrap' }}>

          <MuiPickersUtilsProvider utils={FNSUtils}>
          <div className="picker" style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"130px"}}>
                {/* <div className="picker" style={{width:"300px",marginTop:"131px",marginLeft:"320px"}}> */}
                  <Paper style={{ overflow: "hidden" }}>
                    <Calendar date={new Date()} onChange={this.handleChange} />
                  </Paper>
                </div>
        </MuiPickersUtilsProvider>

        <div className="picker" style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"130px"}}>
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="students" fill="#8884d8" />
          </BarChart>
      </div>
      </div>

        </main>
      </div>
    );
  }
}

Admindash.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Admindash);
