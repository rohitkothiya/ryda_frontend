import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Adminsidebar from "./AdminSidebar";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

import Grid from "@material-ui/core/Grid";

import Container from "@material-ui/core/Container";

import axios from "axios";
import { Divider } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

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
  }
});

class Adminnews extends Component {
  state = {
    isNewsModel: false,
    questionstring: "",
    link: "",
    lastDate: "",
    allNews: [],
    isEditMode: false,
    id: "",
    btnLoading:false
  };

  fetchNews = (headers) => {
    axios
      .get(`http://157.230.174.240:3006/api/v1/news/getallforadmin`, headers)
      .then(response => {
        console.log("response", response);
        console.log("response data data", response.data.data);
        this.setState({ allNews: response.data.data, loading: false });
        console.log("fetch all news :", this.state.allNews);
      })
      .catch(error => {
        this.setState({ loading: false });
        console.log(error);
      });
  };

  componentDidMount() {
    this.setState({ loading: true });
    let data = localStorage.getItem("usertoken");

    console.log(data);
    let headers = {
      headers: {
        Authorization: `bearer ${data}`
      }
    };
    this.fetchNews(headers);
    // axios.get(`http://157.230.174.240:3006/api/v1/news/getallforadmin`,headers)
    // .then(response => {
    //   console.log("response",response)
    //   console.log("response data data",response.data.data)
    //   this.setState({allNews:[...this.state.allNews,...response.data.data]})
    //   console.log("fetch all news :",this.state.allNews)
    // })
    // .catch(error => {
    //   console.log(error);
    // });
  }

  handleAddnewsOpen = () => {
    this.setState({ 
      isNewsModel: !this.state.isNewsModel,
      questionstring: "",
      link: "",
      lastDate: "",
      isEditMode: false,
      
     });
  };
  handleAddNews = () => {
    event.preventDefault();
    this.setState({ isNewsModel: false,btnLoading:true });
    let data = localStorage.getItem("usertoken");

    let headers = {
      headers: {
        Authorization: `bearer ${data}`
      }
    };
    let body = {
      newsstring: this.state.questionstring,
      lastdate: this.state.lastDate,
      link: this.state.link
    };
    console.log(body);
    axios
      .post(`http://157.230.174.240:3006/api/v1/news/add`, body, headers)
      .then(response => {
        console.log("response", response);
        console.log("response data data", response.data.data);
        this.setState({dltbtnLoading:false});
        this.fetchNews(headers);
      })
      .catch(error => {
        this.setState({btnLoading:false})
        console.log(error);
      });
  };

  handleChangeInputText = () => {
    console.log(event.target.name);
    this.setState({ [event.target.name]: event.target.value });
  };
  handleEditNews = card => {
    this.setState({
      isNewsModel: true,
      isEditMode: true,
      questionstring: card.newsstring,
      link: card.link,
      lastDate: card.lastdate,
      id: card._id
    });
  };

  handleSaveChanges = () => {
    this.setState({ isNewsModel: false,btnLoading:true });
    console.log(this.state);
    let body = {
      newsstring: this.state.questionstring,
      link: this.state.link,
      lastdate: this.state.lastDate
    };
    let data = localStorage.getItem("usertoken");

    console.log(data);
    let headers = {
      headers: {
        Authorization: `bearer ${data}`
      }
    };
    axios
      .patch(
        `http://157.230.174.240:3006/api/v1/news/update/${this.state.id}`,
        body,
        headers
      )
      .then(response => {
        console.log("response", response);
        console.log("response data data", response.data.data);
        this.fetchNews(headers);
      })
      .catch(error => {
        this.setState({btnLoading:false})
        console.log("error", error);
      });
  };

  handleNewsClose = () => {
    this.setState({ isNewsModel: false });
  };
  render() {
    const { classes } = this.props;
    const { loading } = this.state;
    console.log("length",this.state.allNews.length)
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
            <Typography variant="h4">News</Typography>
            <Button
              variant="outlined"
              color="primary"
              // style={{color:"#3f98b5"}}
              onClick={this.handleAddnewsOpen}
            >
              Create a Latest News
            </Button>
          </div>
          <Divider />

          <Dialog
            open={this.state.isNewsModel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
          <form onSubmit={this.state.isEditMode ? this.handleSaveChanges : this.handleAddNews}>
            <DialogTitle id="alert-dialog-title">
              {this.state.isEditMode ? "Edit News" : "Add News"}
            </DialogTitle>
            <Divider />
            <DialogContent>
              <TextField
                name="questionstring"
                autoFocus
                margin="dense"
                id="name"
                label="News"
                type="news"
                fullWidth
                onChange={this.handleChangeInputText}
                value={this.state.questionstring}
                variant="outlined"
                required
              />
              <TextField
                margin="dense"
                id="linkaddress"
                label="Link Address"
                type="text"
                fullWidth
                onChange={this.handleChangeInputText}
                value={this.state.link}
                name="link"
                variant="outlined"
                required
              />
              <TextField
                name="lastDate"
                id="date"
                margin="dense"
                label="Last Date"
                type="date"
                onChange={this.handleChangeInputText}
                value={this.state.lastDate}
                InputLabelProps={{
                  shrink: true
                }}
                variant="outlined"
                required
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleNewsClose} color="default">
                Cancel
              </Button>
              {this.state.isEditMode ? (
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  style ={{backgroundColor:"#3f98b5"}}
                >
                {this.state.btnLoading ? "Saving" : "Save" } 
                </Button>
              ) : (
                <Button
                  variant="contained"
                  type="submit"
                  color="primary"
                  style ={{backgroundColor:"#3f98b5"}}
                >
               {this.state.btnLoading ? "Adding" : "Add" } 
                </Button>
              )}
            </DialogActions>
            </form>
          </Dialog>

          <Container
            className={classes.cardGrid}
            maxWidth="md"
            style={{ paddingTop: "18px" }}
          >
            {loading && this.state.allNews.length >= 1 ? (
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
            
              { this.state.allNews.length >= 1 ? (
                  this.state.allNews.map((card, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardContent className={classes.cardContent}>
                      <Typography component="p">
                        {card.newsstring}
                      </Typography>

                      <Typography variant="subtitle1" color="textSecondary">
                        <a href={card.link} > <Typography>{card.link}</Typography> </a>
                      </Typography>

                      <Typography className={classes.pos} color="textSecondary">{card.lastdate}</Typography>
                      
                    </CardContent>
                    <Divider />
                    <CardActions>
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => this.handleEditNews(card)}
                        
                      >
                        Edit
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))   ) :  (
              loading ? <div style={{marginTop:"200px",display:"flex",justifyContent:"center",width:"100%"}}><CircularProgress className={classes.progress}/></div> : <div style={{marginTop:"200px",fontSize:"28px",marginLeft:"150px"}}>You don't have any News available</div> 
              ) }
             
            </Grid>
          </Container>
        </main>
      </div>
    );
  }
}

Adminnews.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Adminnews);
