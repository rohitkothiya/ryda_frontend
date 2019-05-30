import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Adminsidebar from "./AdminSidebar";
import axios from "axios";

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  },
  table: {
    minWidth: 700
  },
  row: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
});

class Adminsurvey extends Component {
  state = {
    surveyerData: []
  };

  componentDidMount() {
    axios
      .get(`http://157.230.174.240:3006/api/v1/survey/getall`)
      .then(response => {
        console.log("response", response);
        console.log("response .data.data", response.data.data);
        this.setState({
          surveyerData: [...this.state.surveyerData, ...response.data.data]
        });
        console.log("fetched survey data", this.state.surveyerData);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <Adminsidebar />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Paper
            className={classes.root}
            style={{ marginTop: "45px", marginLeft: "250px" }}
          >
            <Typography variant="h4">SurveyData</Typography>
            <Table className={classes.table}>
              <TableHead>
                <TableRow>
                  <CustomTableCell>Name</CustomTableCell>
                  <CustomTableCell>Email</CustomTableCell>
                  <CustomTableCell>School</CustomTableCell>
                  <CustomTableCell>Age</CustomTableCell>
                  <CustomTableCell>Gender</CustomTableCell>
                  <CustomTableCell>Country</CustomTableCell>
                  <CustomTableCell>Answer1</CustomTableCell>
                  <CustomTableCell>Answer2</CustomTableCell>
                  <CustomTableCell>Answer3</CustomTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.surveyerData.map(row => (
                  <TableRow className={classes.row} key={row.id}>
                    <CustomTableCell component="th" scope="row">
                      {row.name}
                    </CustomTableCell>
                    <CustomTableCell>{row.email}</CustomTableCell>
                    <CustomTableCell>{row.school_name}</CustomTableCell>
                    <CustomTableCell>{row.age}</CustomTableCell>
                    <CustomTableCell>{row.gender}</CustomTableCell>
                    <CustomTableCell>{row.country}</CustomTableCell>
                    <CustomTableCell>{row.que_1_ans}</CustomTableCell>
                    <CustomTableCell>{row.que_2_ans}</CustomTableCell>
                    <CustomTableCell>{row.que_3_ans}</CustomTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </main>
      </div>
    );
  }
}

Adminsurvey.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Adminsurvey);
