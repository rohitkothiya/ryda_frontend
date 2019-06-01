import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Adminsidebar from "./AdminSidebar";

import Button from "@material-ui/core/Button";

import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";

import Grid from "@material-ui/core/Grid";

import Container from "@material-ui/core/Container";

import axios from "axios";
import { Divider } from "@material-ui/core";

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
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  icon: {
    marginRight: theme.spacing(2)
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6)
  },
  heroButtons: {
    marginTop: theme.spacing(4)
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8)
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%" // 16:9
  },
  cardContent: {
    flexGrow: 1
  }
});

class Adminsurvey extends Component {
  state = {
    surveyerData: [],
    loading: false
  };

  componentDidMount() {
    this.setState({ loading: true });
    axios
      .get(`http://157.230.174.240:3006/api/v1/survey/getall`)
      .then(response => {
        console.log("response", response);
        console.log("response .data.data", response.data.data);
        this.setState({
          surveyerData: [...this.state.surveyerData, ...response.data.data],
          loading: false
        });
        console.log("fetched survey data", this.state.surveyerData);
      })
      .catch(error => {
        this.setState({ loading: false });
        console.log(error);
      });
  }
  render() {
    const { classes } = this.props;
    const { loading } = this.state;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <Adminsidebar />
        <main className={classes.content}>
          <div className={classes.toolbar} />

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "16px 4px"
            }}
          >
            <Typography variant="h4">Survey Data</Typography>
            <Button
              variant="outlined"
              color="primary"
              onClick={this.handleAddnewsOpen}
              style={{ display: "none" }}
            >
              Create a Latest News
            </Button>
          </div>
          <Divider />

          <Container
            className={classes.cardGrid}
            maxWidth="md"
            style={{ paddingTop: "18px" }}
          >
            {loading ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "200px"
                }}
              >
                <CircularProgress className={classes.progress} />
              </div>
            ) : null}
            {/* End hero unit */}
            <Grid container spacing={4}>
              {this.state.surveyerData.map((survey, index) => (
                <Grid item xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom>Name :{survey.name}</Typography>
                      <Typography>Email :{survey.email}</Typography>
                      <Typography>Age :{survey.Age}</Typography>
                      <Typography>School Name :{survey.school_name}</Typography>
                      <Typography>Gender :{survey.gender}</Typography>
                      <Typography>Answer 1 :{survey.que_1_ans}</Typography>
                      <Typography>Answer 2 :{survey.que_2_ans}</Typography>
                      <Typography>Answer 3 :{survey.que_3_ans}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </main>
      </div>
    );
  }
}

Adminsurvey.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Adminsurvey);

// import React, { Component } from "react";
// import PropTypes from "prop-types";
// import { withStyles } from "@material-ui/core/styles";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableHead from "@material-ui/core/TableHead";
// import TableRow from "@material-ui/core/TableRow";
// import Typography from "@material-ui/core/Typography";
// import Adminsidebar from "./AdminSidebar";
// import axios from "axios";

// import Divider from '@material-ui/core/Divider';

// const CustomTableCell = withStyles(theme => ({
//   head: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white
//   },
//   body: {
//     fontSize: 14
//   }
// }))(TableCell);

// const styles = theme => ({
//   root: {
//     display: 'flex'
//   },
//   table: {
//     minWidth: 700
//   },
//   row: {
//     "&:nth-of-type(odd)": {
//       backgroundColor: theme.palette.background.default
//     }
//   },
//   toolbar: theme.mixins.toolbar,
//   content: {
//     flexGrow: 1,
//     backgroundColor: theme.palette.background.default,
//     padding: theme.spacing.unit * 3
//   }
// });

// class Adminsurvey extends Component {
//   state = {
//     surveyerData: []
//   };

//   componentDidMount() {
//     axios
//       .get(`http://157.230.174.240:3006/api/v1/survey/getall`)
//       .then(response => {
//         console.log("response", response);
//         console.log("response .data.data", response.data.data);
//         this.setState({
//           surveyerData: [...this.state.surveyerData, ...response.data.data]
//         });
//         console.log("fetched survey data", this.state.surveyerData);
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }

//   render() {
//     const { classes } = this.props;

//     return (
//       <div className={classes.root}>
//         <CssBaseline />
//         <Adminsidebar />
//         <main className={classes.content}>
//           <div className={classes.toolbar} />
//           <div>

//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 padding: "16px 4px"
//               }}
//             >
//               <Typography variant="h4">SurveyData</Typography>
//             </div>
//             <Divider />

//             <Table className={classes.table}>
//               <TableHead>
//                 <TableRow>
//                   <CustomTableCell>Name</CustomTableCell>
//                   <CustomTableCell>Email</CustomTableCell>
//                   <CustomTableCell>School</CustomTableCell>
//                   <CustomTableCell>Age</CustomTableCell>
//                   <CustomTableCell>Gender</CustomTableCell>
//                   <CustomTableCell>Country</CustomTableCell>
//                   <CustomTableCell>Answer1</CustomTableCell>
//                   <CustomTableCell>Answer2</CustomTableCell>
//                   <CustomTableCell>Answer3</CustomTableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {this.state.surveyerData.map(row => (
//                   <TableRow className={classes.row} key={row.id}>
//                     <CustomTableCell component="th" scope="row">
//                       {row.name}
//                     </CustomTableCell>
//                     <CustomTableCell>{row.email}</CustomTableCell>
//                     <CustomTableCell>{row.school_name}</CustomTableCell>
//                     <CustomTableCell>{row.age}</CustomTableCell>
//                     <CustomTableCell>{row.gender}</CustomTableCell>
//                     <CustomTableCell>{row.country}</CustomTableCell>
//                     <CustomTableCell>{row.que_1_ans}</CustomTableCell>
//                     <CustomTableCell>{row.que_2_ans}</CustomTableCell>
//                     <CustomTableCell>{row.que_3_ans}</CustomTableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </div>
//         </main>
//       </div>
//     );
//   }
// }

// Adminsurvey.propTypes = {
//   classes: PropTypes.object.isRequired
// };

// export default withStyles(styles)(Adminsurvey);
