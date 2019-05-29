

import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Adminsidebar from './AdminSidebar';
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
});

class Adminquiz extends Component  {
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















            // componentDidMount() {
                
            //   let data = localStorage.getItem("usertoken");
            //   console.log("get token",data)
            //   let headers = {
            //     headers: {
            //      Authorization: `bearer ${data}`
            //     }
            // }
            //     axios.post(`http://157.230.174.240:3006/api/v1/quiz/getallforadmin`,body,headers)
            //     .then(response => {
            //       console.log("response",response);
            //       console.log("response data data",response.data.data)
            //     })
            //     .catch(error => {
            //         console.log("error",error);
            //     })
            //   } 
              


            





   render (){
  const { classes } = this.props;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Adminsidebar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
       
      </main>
    </div>
  );
}
}

Admindash.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AdminQuiz);


























