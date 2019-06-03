import React, { Component,Fragment } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Adminsidebar from "./AdminSidebar";
import CardActions from "@material-ui/core/CardActions";
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from "@material-ui/core/Button";

import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";

import CardContent from "@material-ui/core/CardContent";

import Grid from "@material-ui/core/Grid";

import Container from "@material-ui/core/Container";

import axios from "axios";
import { Divider } from "@material-ui/core";
import Adminfeedback from './FeedbackDailog';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';


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
    padding: theme.spacing.unit * 3,
    width: '100%'
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
    margin: theme.spacing.unit * 2
  },
  title: {
    fontSize: '12px'
  }
});

class Adminuserdata extends Component {
  state = {
    userData: [],
    loading: false,
    isFeedbackOpen:false,
    feedback:"",
    feedbackId:null
  };


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
  handleInputTextChange = () => {
    console.log(event.target.name)
    this.setState({[event.target.name]:event.target.value})
  }
  handleFeedbackOpened = (userId) => {
    this.setState({isFeedbackOpen:true,feedbackId:userId});
    console.log("feeedback id:",this.state.feedbackId)
  }
  handleFeedbackClosed = () => {
    this.setState({isFeedbackOpen:false})
  }
  handleFeddbackSubmit = () => {
    this.setState({isFeedbackOpen:false})

    let data = localStorage.getItem("usertoken");

    console.log("data", data);
    let headers = {
      headers: {
        Authorization: `bearer ${data}`
      }
    };
    let  body = {
          feedback : this.state.feedback
    }
    console.log("body",body)
    axios
      .patch(
        `http://157.230.174.240:3006/api/v1/user/userupdate/${this.state.feedbackId}`,
        body,
        headers
      )
      .then(response => {
        console.log("response", response);
       
      })
      .catch(error => {
       
        console.log(error);
      });




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
  
    const usersData = this.state.userData.filter(user => user.role === 2);
    console.log(usersData,"userdta")
    console.log(usersData.length,"length")
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
            <Typography variant="h4">User Information</Typography>
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
            {loading && usersData.length >= 2 ? (
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
            
           
           
                { usersData.length >= 2 ? (
                   usersData.map((user, index) => (
                <Fragment>
                <Grid item xs={12} sm={6} md={6} lg={4}>
                  <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      Name:
                    </Typography>
                    <Typography gutterBottom style={ {wordBreak: 'break-all'} }><strong>{user.name}</strong></Typography>

                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      Email:
                    </Typography>
                    <Typography gutterBottom style={ {wordBreak: 'break-all'} }>{user.email}</Typography>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Age:
                      </Typography>
                      <Typography gutterBottom style={ {marginLeft: '4px', wordBreak: 'break-all'} }>{user.Age}</Typography>
                    </div>                    

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Quatlification:
                      </Typography>
                      <Typography gutterBottom style={ {marginLeft: '4px', wordBreak: 'break-all'} }>{user.qualification}</Typography>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      Level: 
                    </Typography>
                    <Typography gutterBottom style={ {marginLeft: '4px', wordBreak: 'break-all'} }>{user.clearedlevel}</Typography>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                      Feedback: 
                    </Typography> 
                    <Typography gutterBottom style={ {marginLeft: '4px', wordBreak: 'break-all'} }>{user.feedback || 'NA'}</Typography>
                    </div>
                    
                    </CardContent>
                    <Divider />
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() =>this.handleFeedbackOpened(user._id)}
                      >
                        Give Feedback
                      </Button>
                    </CardActions>
                  </Card>
                 
                </Grid>
                <div>
              
                   </div>
              </Fragment>
             
              )) ) : (
                loading ? <div style={{marginTop:"200px",display:"flex",justifyContent:"center",width:"100%"}}><CircularProgress className={classes.progress}/></div> : <div style={{marginTop:"200px",fontSize:"28px",marginLeft:"150px"}}>You don't have any User Data available</div> 
              ) }

              
            </Grid>
            <Adminfeedback feedbackOpen={this.state.isFeedbackOpen} closed={this.handleFeedbackClosed} submitted={this.handleFeddbackSubmit}  changed={this.handleInputTextChange} />
            {/*  feedback={this.state.feedback} userid={this} /> */}
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












// <Dialog
// open={this.state.isFeedbackOpen}
// //   onClose={this.handleClose}
// aria-labelledby="alert-dialog-title"
// aria-describedby="alert-dialog-description"
// >
// <DialogTitle id="alert-dialog-title">{ "Send your feedback to user"}</DialogTitle>
// <Divider/>
// <DialogContent>
// <TextField
// name="feedback"
// id="feedback"
// label="Enter your feedback"
// multiline
// rowsMax="4"
// // value={values.multiline}
// onChange={this.handleInputTextChange}
// // className={classes.textField}
// margin="normal"
// // helperText="hello"
// variant="outlined"
// // value={this.state.feedback}
// autoFocus
// fullWidth
// />
// </DialogContent>
// <DialogActions>
// {/* onClick={this.handleFeedbackClosed} */}
//   <Button  color="primary">
//     Cancel
//   </Button>
//   {/* onClick={this.handleFeddbackSubmit(user)} */}
//   <Button  color="primary"  variant="contained"   style ={{backgroundColor:"#3f98b5"}}  >  
//     Submit
//   </Button>
// </DialogActions>
// </Dialog>