import React ,{Component}from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Menu from '@material-ui/core/Menu';
import axios from 'axios';
// import Adminsidebar from '../../../components/Sidebar/AdminSidebar';

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
}));



class Addquiz extends Component {

  constructor(props) {
    super(props)
        this.state= {
             
            question:"",
             optionA:"",
             optionB:"",
             optionC:"",
             optionD:"",
             answer:""
        }
       
   }

  HandleQuestionAdd = () => {
    console.log("clicked")
   let body = {
     leval:1,
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
  }
   render() {
     return (
      // className={classes.container}
      <form  noValidate autoComplete="off">
      <Button
  
   aria-haspopup="true"
  //  onClick={handleClick}
 >
   Select level
 </Button>
 <Menu id="simple-menu" >
   <MenuItem >Leval 1</MenuItem>
   <MenuItem >Level 2</MenuItem>
   <MenuItem >Level 3</MenuItem>
 </Menu>
 <TextField
   id="standard-full-width"
   label="Question"
   style={{ margin: 8 }}
   placeholder="Enter your Question"
   onChange={this.handleInputTextChange}
   fullWidth
   margin="normal"
   InputLabelProps={{
     shrink: true,
   }}
   name="question"
 />
  <TextField
   id="standard-with-placeholder"
   label="A"
   placeholder="option A"
  //  className={classes.textField}
   margin="normal"
   onChange={this.handleInputTextChange}
   name="optionA"
 />
 <TextField
   id="standard-with-placeholder"
   label="B"
   placeholder="option B"
  //  className={classes.textField}
   margin="normal"
   onChange={this.handleInputTextChange}
   name="optionB"
 />
 <TextField
   id="standard-with-placeholder"
   label="C"
   placeholder="option C"
  //  className={classes.textField}
   margin="normal"
   onChange={this.handleInputTextChange}
   name="optionC"
 />
 <TextField
   id="standard-with-placeholder"
   label="D"
   placeholder="option D"
  //  className={classes.textField}
   margin="normal"
   onChange={this.handleInputTextChange}
   name="optionD"
 />
   <TextField
   id="standard-with-placeholder"
   label=" Correct Answer"
   placeholder="right option"
  //  className={classes.textField}
   margin="normal"
   onChange={this.handleInputTextChange}
   name="answer"
 />
 {/* className={classes.button} */}
 <Button variant="contained" color="primary"  style={{height:"50px"}} onClick={this.HandleQuestionAdd}> 
   Add 
 </Button>
</form>
     )
   }
  }

  // const classes = useStyles();

//   const handleChange = name => event => {
//     setValues({ ...values, [name]: event.target.value });
//   };




export default Addquiz;