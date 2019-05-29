import React, { Component } from 'react';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Typography from '@material-ui/core/Typography';
//import  {QuestionsList } from '../../Const/questions';

import axios from 'axios';
import Button from '@material-ui/core/Button';
import StudentAppbar from './StudentAppbar';
 
class Userquiz  extends Component {
       
  constructor(props) {
    super(props)
        this.state= {
          questions:[],
          quizAnswers:{},
          option : "a",
       
        }
        
   }
         


         componentDidMount() {
             let body ={
               level : 1
             };
            let data = localStorage.getItem("usertoken")
           
            console.log(data)
            // console.log(newdata)
             let headers = {
               headers: {
                Authorization: `bearer ${data}`
               }
                
             }
          
          axios
          .post(`http://157.230.174.240:3006/api/v1/question/getall`,body, headers)
          .then(response => {
            console.log("response",response);
            console.log("response .data.data",response.data.data)
          // let updatedObj = Object.assign(this.state.questions,response.data.data);
          // console.log("updated obj",updatedObj)
            this.setState({questions:[...this.state.questions,...response.data.data]})
            console.log("fetch question State:",this.state.questions)
          })
          .catch(error => {
            console.log(error);
          });
        }


             handleRadioButton = (id,value) => {
             console.log("id:",id);
           
             console.log("value",value);
          this.setState({[id]:event.target.value})
             this.setState({quizAnswers:Object.assign(this.state.quizAnswers,{ [id]:value})})

          console.log("quizanswers",this.state.quizAnswers)
          
}
      
            handleQuizResult = () => {
             
                console.log("result is :")
                let body = this.state.quizAnswers;
                 
            
               let data = localStorage.getItem("usertoken")
               console.log(data)
                let headers = {
                  headers: {
                   Authorization: `bearer ${data}`
                  }
                   
                 }
            
              
            axios
            .post(`http://157.230.174.240:3006/api/v1/question/result`,body, headers)
            .then(response => {
              console.log("response",response);
              console.log("response .data.data",response.data.data)
             
            })
            .catch(error => {
              console.log(error);
            });
           }
         
  
    render() {
      //  console.log(this.state.quizAnswers)
   
      console.log("fetch Question",this.state.questions)
        return ( 
          <div>
            <StudentAppbar/>
            <ol type="1">
             {  this.state.questions.map (itm => {
                   
                 return (
                   
             <li>
            <Typography variant="h6" gutterBottom>
           
       {itm.questionstring}
      </Typography>
            <RadioGroup aria-label="position" name="position"  row>
            
            <FormControlLabel
        
              id={itm._id}
              value="a"
              control={<Radio color="primary" checked={this.state.option === "a"} onClick={() =>this.handleRadioButton(`"${itm._id}"`,"a")}/>}
              label={itm.option.a}
              labelPlacement="end"
            />  
             <FormControlLabel
              id={itm._id}
              value="b"
              control={<Radio color="primary" checked={this.state.option === "b"} onClick={() =>this.handleRadioButton(`"${itm._id}"`,"b")} />}
              label={itm.option.b}
              labelPlacement="end"
            />
             <FormControlLabel
              id={itm._id}
              value="c"
              control={<Radio color="primary" checked={this.state.option === "c"} onClick={() =>this.handleRadioButton(`"${itm._id}"`,"c")} />}
              label={itm.option.c}
              labelPlacement="end"
            />
             <FormControlLabel
              id={itm._id}
              value="d"
              control={<Radio color="primary" checked={this.state.option === "d"} onClick={() =>this.handleRadioButton(`"${itm._id}"`,"d")}/>}
              label={itm.option.c}
              labelPlacement="end"
            />

          </RadioGroup>
       </li>)
                })
               }
               {/* className={classes.button} */}
                <Button variant="contained" color="secondary" onClick={this.handleQuizResult} >
       Check Result
      </Button>  
                </ol></div>
        )
    }
}


export default Userquiz;