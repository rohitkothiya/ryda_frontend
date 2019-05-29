

import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import Adminsidebar from './AdminSidebar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';


import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import Container from '@material-ui/core/Container';

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
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
});





class Adminnews extends Component  {

  state ={
    isAddNews:false,
    questionstring:"",
    link:"",
    lastDate:"",
    allNews:[]
  }
  
  componentDidMount()  {


    let data = localStorage.getItem("usertoken");
           
    console.log(data)
     let headers = {
       headers: {
        Authorization: `bearer ${data}`
       }
        
     } 
    axios.get(`http://157.230.174.240:3006/api/v1/news/getallforadmin`,headers)
    .then(response => {
      console.log("response",response)
      console.log("response data data",response.data.data)
      this.setState({allNews:[...this.state.allNews,...response.data.data]})
      console.log("fetch all news :",this.state.allNews)
    })
    .catch(error => {
      console.log(error);
    });
  }


  handleAddnewsOpen = () => {
    this.setState({isAddNews:!this.state.isAddNews});
  }
  handleAddNews = () => {
    this.setState({isAddNews:false});
    let data = localStorage.getItem("usertoken")
           
    console.log(data)
     let headers = {
       headers: {
        Authorization: `bearer ${data}`
       }
        
     } 
      let body = {
        newsstring:this.state.questionstring,
        lastdate:this.state.lastDate,
        link:this.state.link
      }
        console.log(body)
        axios.post(`http://157.230.174.240:3006/api/v1/news/add`,body,headers)
        .then(response => {
          console.log("response",response)
          console.log("response data data",response.data.data)
        })
        .catch(error => {
          console.log(error);
        });
      }
  
  handleChangeInputText = () => {
    console.log(event.target.name)
    this.setState({[event.target.name]:event.target.value})
  }

   render (){
  const { classes } = this.props;
// {this.state.allNews.map(item => {
//   return  console.log(item.link)
//   })}
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Adminsidebar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Button variant="outlined" color="primary" onClick={this.handleAddnewsOpen}>
        Create a Latest News
      </Button>
      <Dialog
        open={this.state.isAddNews}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Latest News?"}</DialogTitle>
        <DialogContent>
          <TextField
             name="questionstring"
              autoFocus
              margin="dense"
              id="name"
              label=""
              type="news"
              fullWidth
              onChange={this.handleChangeInputText}
            />
            <TextField
            name="lastDate"
        id="date"
        label="Last Date"
        type="date"
        defaultValue="2018-04-18"
        className={classes.textField}
        onChange={this.handleChangeInputText}
        InputLabelProps={{
          shrink: true,
        }}
      />
              <TextField
              autoFocus
              margin="dense"
              id="linkaddress"
              label="Link Address"
              type="text"
              fullWidth
              onChange={this.handleChangeInputText}
              name="link"
            />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleAddNews} color="primary" autoFocus>
            Add
          </Button>
        </DialogActions>
      </Dialog>
     
        {/* Hero unit */}
        <Container className={classes.cardGrid} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {this.state.allNews.map(card => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                 
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.newsstring}
                    </Typography>
                    <Typography>
                      {card.lastdate}
                    </Typography>
                    <Typography>
                      {card.link}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      Delete
                    </Button>
                    <Button size="small" color="primary">
                      Edit
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

Adminnews.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Adminnews);


























