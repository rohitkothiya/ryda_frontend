

import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Adminsidebar from './AdminSidebar';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
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
  card: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

class Adminquiz extends Component  {
  

  constructor(props) {
    super(props)
        this.state= {
          isAddQns:false,
            question:"",
             optionA:"",
             optionB:"",
             optionC:"",
             optionD:"",
             answer:"",
             anchorEl: null,
             level:1,
             allQuestions:[]
        }
       
   }
   handleLevalClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

 handleSelectLevel = (value) => {

   this.setState({anchorEl: null,level:value})
   console.log("level",this.state.level)
 }

               componentDidMount() {
                     
                  let data = localStorage.getItem("usertoken")

                 console.log(data)
                    // console.log(newdata)
                    let headers = {
                      headers: {
                  Authorization: `bearer ${data}`
                    }
     
                    }

                 axios
                 .get(`http://157.230.174.240:3006/api/v1/question/getallforadmin`, headers)
                     .then(response => {
                       console.log("response",response);
                       console.log("response .data.data",response.data.data)

                       this.setState({allQuestions:[...this.state.allQuestions,...response.data.data]})
                      console.log("fetch question State:",this.state.allQuestions)
                       })
                   .catch(error => {
                        console.log(error);
                      });
                      }


  handleQuestionAdd = () => {
  this.setState({isAddQns:false})
   
    
   let body = {
     leval:this.state.level,
     questionstring:this.state.question,
     option : {
           a:this.state.optionA,
           b:this.state.optionB,
           c:this.state.optionC,
           d:this.state.optionD
     } ,
     answer:this.state.answer
   }
   let data = localStorage.getItem("usertoken")
  //  let newdata= JSON.stringify(data);
   console.log(data)
    let headers = {
      headers: {
       Authorization: `bearer ${data}`
      }
       
    }
 console.log("body",body)

    axios.post(`http://157.230.174.240:3006/api/v1/question/addquestion`,body,headers)
    .then(response => {
      console.log("response",response);
     
      console.log("response .data.data",response.data.data)
    
 
    })
    .catch(error => {
      console.log(error);
    });
  }
   
  handleInputTextChange = ()  =>  {
    this.setState({[event.target.name]:event.target.value})
    console.log(event.target.name);
  }


     handleClickOpen = () => {
       this.setState({isAddQns:!this.state.isAddQns})
     }

    handleClose = () =>  {
      this.setState({isAddQns:false})
    }
    
   render (){

    {this.state.allQuestions.map(item => {
      return console.log("incomming data",item.option.a)
    })}
  const { classes } = this.props;
  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <Adminsidebar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Add  Quiz Question
        </Button>

        <Dialog
          open={this.state.isAddQns}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
         
          <DialogContent>
          <Typography>
                   Selected Level :{this.state.level}
                    </Typography>
          <Button
          aria-owns={this.state.anchorEl ? 'simple-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleLevalClick}
          
        >
          Select level
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleLevalClose}
        >
          <MenuItem onClick={() =>this.handleSelectLevel(1)}>1</MenuItem>
          <MenuItem onClick={() =>this.handleSelectLevel(2)}>2</MenuItem>
          <MenuItem onClick={() =>this.handleSelectLevel(3)}>3</MenuItem>
        </Menu>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Enter Question"
              type="text"
              fullWidth
              name="question"
              onChange={this.handleInputTextChange}
            />
             <TextField
                  id="standard-with-placeholder"
                  label="A"
                    placeholder="option A"
               
              margin="normal"
              onChange={this.handleInputTextChange}
              name="optionA"
               />
             <TextField
             style={{marginLeft:"10px"}}
             id="standard-with-placeholder"
              label="B"
                  placeholder="option B"
           
              margin="normal"
            onChange={this.handleInputTextChange}
                name="optionB"
                />
            <TextField
            id="standard-with-placeholder"
             label="C"
              placeholder="option C"
             
             margin="normal"
              onChange={this.handleInputTextChange}
           name="optionC"
            />
           <TextField
            style={{marginLeft:"10px"}}
             id="standard-with-placeholder"
          label="D"
          placeholder="option D"
       
           margin="normal"
           onChange={this.handleInputTextChange}
            name="optionD"
              />
          <TextField
            id="standard-with-placeholder"
           label=" Correct Answer"
           placeholder="right option"
           
            margin="normal"
              onChange={this.handleInputTextChange}
                name="answer"
              />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleQuestionAdd} color="primary">
             Add
            </Button>
          </DialogActions>
        </Dialog>
     
        <Card className={classes.card}>
        {this.state.allQuestions.map(card => {
       return (
           <CardContent>
              <TextField
              autoFocus
              margin="dense"
              id="name"
              label={card.questionstring}
              type="text"
              fullWidth
              name="question"
              
            />
             <TextField
                  id="standard-with-placeholder"
                  label="A"
                    placeholder={card.option.a}
                    
              margin="normal"
             
              name="optionA"
               />
             <TextField
             style={{marginLeft:"10px"}}
             id="standard-with-placeholder"
              label="B"
                  placeholder={card.option.b}
           
              margin="normal"
          
                name="optionB"
                />
            <TextField
            id="standard-with-placeholder"
             label="C"
              placeholder={card.option.c}
             
             margin="normal"
             
           name="optionC"
            />
           <TextField
            style={{marginLeft:"10px"}}
             id="standard-with-placeholder"
          label="D"
          placeholder={card.option.d}
       
           margin="normal"
           
            name="optionD"
              />
          <TextField
            id="standard-with-placeholder"
           label={card.answer}
           placeholder="right option"
           
            margin="normal"
              
                name="answer"
              />
      </CardContent>
       )}
        )
       }
    </Card> */}
      </div>
      </main>
    </div>
  );
}
}

Adminquiz.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Adminquiz);
