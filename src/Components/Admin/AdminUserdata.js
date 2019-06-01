
import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Adminsidebar from "./AdminSidebar";

import Button from "@material-ui/core/Button";

import CircularProgress from '@material-ui/core/CircularProgress';
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
  },
  progress: {
    margin: theme.spacing.unit * 2,
  },
});

class Adminuserdata extends Component {
   state = {
    userData: [],
    loading:false
  };

  componentDidMount() {
    this.setState({loading:true})
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
          userData: [...this.state.userData, ...response.data.data],loading:false
        });
        console.log("fetched user data", this.state.userData);
      })
      .catch(error => {
        this.setState({loading:false})
        console.log(error);
      });
  }
  render() {
    const { classes } = this.props;
   const {loading} = this.state;
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
              <Typography variant="h4">User Information</Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={this.handleAddnewsOpen}
                style={{display:"none"}}
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
         {loading ? <div style={{display:"flex",justifyContent:"center",marginTop:"200px"}}>
      <CircularProgress className={classes.progress}  />
   </div> : null }
 
            {/* End hero unit */}
            <Grid container spacing={4}>
         { this.state.userData.map((user,index) => (
                <Grid item  xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom  >
                       Name :{user.name}
                      </Typography>
                      <Typography>Email :{user.email}</Typography>
                      <Typography>Age :{user.Age}</Typography>
                      <Typography>Qualification:{user.qualification}</Typography>
                      <Typography>Cleared level :{user.clearedlevel}</Typography>
                   
                    </CardContent>
                   </Card>
                </Grid>
          )) }
          
            </Grid>
          </Container>
        </main>
      </div>
    );
  }
}

Adminuserdata.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Adminuserdata);





















































































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
// import Button from "@material-ui/core/Button";

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

// class Adminuserdata extends Component {
//   state = {
//     userData: []
//   };

//   componentDidMount() {
//     let data = localStorage.getItem("usertoken");
//     let headers = {
//       headers: {
//         Authorization: `bearer ${data}`
//       }
//     };

//     axios
//       .get(
//         `http://157.230.174.240:3006/api/v1/user/getalluserforadmin`,
//         headers
//       )
//       .then(response => {
//         console.log("response", response);
//         console.log("response .data.data", response.data.data);
//         this.setState({
//           userData: [...this.state.userData, ...response.data.data]
//         });
//         console.log("fetched user data", this.state.userData);
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
//             <div>
//             <div
//               style={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 padding: "16px 4px"
//               }}
//             >
//               <Typography variant="h4">UserData</Typography>
//             </div>
//             <Divider />

//             <Table className={classes.table}>
//               <TableHead>
//                 <TableRow>
//                   <CustomTableCell>Name</CustomTableCell>
//                   <CustomTableCell>Email</CustomTableCell>
//                   <CustomTableCell>Age</CustomTableCell>
//                   <CustomTableCell>Qualification</CustomTableCell>
//                   <CustomTableCell>Cleared level</CustomTableCell>
//                   <CustomTableCell>Password</CustomTableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {this.state.userData.map(row => (
//                   <TableRow className={classes.row} key={row.id}>
//                     <CustomTableCell
//                       component="th"
//                       scope="row"
//                       style={{ width: "400px" }}
//                     >
//                       {row.name}
//                     </CustomTableCell>
//                     <CustomTableCell style={{ width: "400px" }}>
//                       {row.email}
//                     </CustomTableCell>
//                     <CustomTableCell style={{ width: "50px" }}>
//                       {row.age}
//                     </CustomTableCell>
//                     <CustomTableCell style={{ width: "50px" }}>
//                       {row.qualification}
//                     </CustomTableCell>
//                     <CustomTableCell style={{ width: "50px" }}>
//                       {row.clearedlevel}
//                     </CustomTableCell>
//                     <CustomTableCell>{row.password}</CustomTableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//             </div>
//         </main>
//       </div>
//     );
//   }
// }

// Adminuserdata.propTypes = {
//   classes: PropTypes.object.isRequired
// };

// export default withStyles(styles)(Adminuserdata);

// // import React,{Component} from 'react';
// // import PropTypes from 'prop-types';
// // import { withStyles } from '@material-ui/core/styles';
// // import CssBaseline from '@material-ui/core/CssBaseline';

// // import Adminsidebar from './AdminSidebar';

// // const drawerWidth = 240;

// // const styles = theme => ({
// //   root: {
// //     display: 'flex',
// //   },
// //   appBar: {
// //     width: `calc(100% - ${drawerWidth}px)`,
// //     marginLeft: drawerWidth,
// //   },
// //   drawer: {
// //     width: drawerWidth,
// //     flexShrink: 0,
// //   },
// //   drawerPaper: {
// //     width: drawerWidth,
// //   },
// //   toolbar: theme.mixins.toolbar,
// //   content: {
// //     flexGrow: 1,
// //     backgroundColor: theme.palette.background.default,
// //     padding: theme.spacing.unit * 3,
// //   },
// // });

// // class Adminuserdata extends Component  {
// //    render (){
// //   const { classes } = this.props;

// //   return (
// //     <div className={classes.root}>
// //       <CssBaseline />
// //       <Adminsidebar />
// //       <main className={classes.content}>
// //         <div className={classes.toolbar} />

// //       </main>
// //     </div>
// //   );
// // }
// // }

// // Adminuserdata.propTypes = {
// //   classes: PropTypes.object.isRequired,
// // };

// // export default withStyles(styles)(Adminuserdata);
