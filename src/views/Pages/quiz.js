import React, { Component } from 'react';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Typography from '@material-ui/core/Typography';
import  {QuestionsList } from '../../Const/questions';

import axios from 'axios';

 

class Userquiz  extends Component {
       
  constructor(props) {
    super(props)
        this.state= {
          questions:[]
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
            this.setState({questions:[...this.state.questions,response.data.data]})
            console.log("fetch questions:",this.state.questions)
          })
          .catch(error => {
            console.log(error);
          });
        }
      


         
  
    render() {
    
    {  this.state.questions.map(itm =>  {
      return console.log(itm.level);
    }
      )}
      console.log("fetch Question",this.state.questions)
        return ( 
          // <div>
          // { this.state.questions.map(itm =>  {
          //   return console.log(itm.level)
          //    }
          //    )   }
          // </div>
            <ol type="1">
             {  QuestionsList.map (itm => {
                   
                 return (
                   
             <li>
            <Typography variant="h6" gutterBottom>
           
       {itm.question}
      </Typography>
            <RadioGroup aria-label="position" name="position"  row>
             
            <FormControlLabel
              value="end"
              control={<Radio color="primary" />}
              label="End"
              labelPlacement="end"
            />
             <FormControlLabel
              value="end"
              control={<Radio color="primary" />}
              label="End"
              labelPlacement="end"
            />
             <FormControlLabel
              value="end"
              control={<Radio color="primary" />}
              label="End"
              labelPlacement="end"
            />
             <FormControlLabel
              value="end"
              control={<Radio color="primary" />}
              label="End"
              labelPlacement="end"
            />

          </RadioGroup>
       </li>)
                })
               }   </ol>
        )
    }
}


export default Userquiz;