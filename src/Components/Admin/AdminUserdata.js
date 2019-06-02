import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Adminsidebar from "./AdminSidebar";
import CardActions from "@material-ui/core/CardActions";

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
    loading: false
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
              {this.state.userData.map((user, index) => (
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
                        // onClick={() => this.handleEditNews(card)}
                      >
                        Give Feedback
                      </Button>
                    </CardActions>
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

Adminuserdata.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Adminuserdata);
