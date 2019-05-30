

import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Adminsidebar from './AdminSidebar';
import axios from 'axios';


const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});



class Adminuserdata extends Component  {

  state = {
    surveyerData :[]
  }

         componentDidMount() {
           let data = localStorage.getItem("usertoken");
           let headers = {
             headers :

             {
               Authorization:`bearer ${data}`
             }
           }
                   
          axios.get(`http://157.230.174.240:3006/api/v1/user/getalluserforadmin`,headers)
          .then(response => {
              console.log("response",response);
              console.log("response .data.data",response.data.data)
              this.setState({surveyerData:[...this.state.surveyerData,...response.data.data]})
              console.log("fetched survey data",this.state.surveyerData)
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
       
        <Paper className={classes.root} style={{marginTop:"45px",marginLeft:"250px"}}>
        <Typography variant="h4" >
        UserData
      </Typography>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>Name</CustomTableCell>
            <CustomTableCell >Email</CustomTableCell>
            <CustomTableCell >Age</CustomTableCell>
            <CustomTableCell >Qualification</CustomTableCell>
            <CustomTableCell >Cleared level</CustomTableCell>
            <CustomTableCell >Password</CustomTableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {this.state.surveyerData.map(row => (
            <TableRow className={classes.row} key={row.id}>
              <CustomTableCell component="th" scope="row" style={{width:"400px"}}>
                {row.name}
              </CustomTableCell>
              <CustomTableCell style={{width:"400px"}} >{row.email}</CustomTableCell>
              <CustomTableCell style={{width:"50px"}} >{row.age}</CustomTableCell>
              <CustomTableCell   style={{width:"50px"}}>{row.qualification}</CustomTableCell>
              <CustomTableCell  style={{width:"50px"}} >{row.clearedlevel}</CustomTableCell>
              <CustomTableCell >{row.password}</CustomTableCell>
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

Adminuserdata.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Adminuserdata);





































































// import React,{Component} from 'react';
// import PropTypes from 'prop-types';
// import { withStyles } from '@material-ui/core/styles';
// import CssBaseline from '@material-ui/core/CssBaseline';

// import Adminsidebar from './AdminSidebar';


// const drawerWidth = 240;

// const styles = theme => ({
//   root: {
//     display: 'flex',
//   },
//   appBar: {
//     width: `calc(100% - ${drawerWidth}px)`,
//     marginLeft: drawerWidth,
//   },
//   drawer: {
//     width: drawerWidth,
//     flexShrink: 0,
//   },
//   drawerPaper: {
//     width: drawerWidth,
//   },
//   toolbar: theme.mixins.toolbar,
//   content: {
//     flexGrow: 1,
//     backgroundColor: theme.palette.background.default,
//     padding: theme.spacing.unit * 3,
//   },
// });

// class Adminuserdata extends Component  {
//    render (){
//   const { classes } = this.props;

//   return (
//     <div className={classes.root}>
//       <CssBaseline />
//       <Adminsidebar />
//       <main className={classes.content}>
//         <div className={classes.toolbar} />
        
//       </main>
//     </div>
//   );
// }
// }

// Adminuserdata.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(Adminuserdata);


























