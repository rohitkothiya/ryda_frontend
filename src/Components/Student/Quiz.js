import React, { Component } from "react";

import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
//import  {QuestionsList } from '../../Const/questions';
import { Divider } from "@material-ui/core";
import axios from "axios";
import Button from "@material-ui/core/Button";
import StudentAppbar from "./StudentAppbar";
import Studentresult from './StudentResult';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from "@material-ui/core/styles";
import {Redirect} from 'react-router-dom'
const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2,
  },
});


class Userquiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      quizAnswers: {},
      option: "a",
      loading:false,
      total:"",
      count:"",
      result:"",
      quizResult:{},
      backtodash:false,
      id:""
    };
  }
    

  fetchQns = (body,headers) => {
    axios
    .post(`http://157.230.174.240:3006/api/v1/question/getall`, body, headers)
    .then(response => {
      console.log("response", response);
      console.log("response .data.data", response.data.data);
      // let updatedObj = Object.assign(this.state.questions,response.data.data);
      // console.log("updated obj",updatedObj)
      this.setState({
        questions: response.data.data,loading:false
      });
      console.log("fetch question State:", this.state.questions);
    })
    .catch(error => {
      this.setState({loading:false})
      console.log(error);
    });
  }
  componentDidMount() {
    this.setState({loading:true})
    let body = {
      level: 1
    };
    let data = localStorage.getItem("usertoken");

    console.log(data);
    // console.log(newdata)
    let headers = {
      headers: {
        Authorization: `bearer ${data}`
      }
    };

    axios
      .post(`http://157.230.174.240:3006/api/v1/question/getall`, body, headers)
      .then(response => {
        console.log("response", response);
        console.log("response .data.data", response.data.data);
        // let updatedObj = Object.assign(this.state.questions,response.data.data);
        // console.log("updated obj",updatedObj)
        this.setState({
          questions: [...this.state.questions, ...response.data.data],loading:false
        });
        console.log("fetch question State:", this.state.questions);
      })
      .catch(error => {
        this.setState({loading:false})
        console.log(error);
      });
  }

  handleRadioButton = (id, value) => {
    console.log("id:", id);

    console.log("value", value);
    this.setState({ [id]: event.target.value }, () => console.log("hello"));
    this.setState({
      quizAnswers: Object.assign(this.state.quizAnswers, { [id]: value })
    });

    console.log("quizanswers", this.state.quizAnswers);
  };

  handleQuizResult = () => {
    this.setState({isResultShow:true})
    let body = this.state.quizAnswers ;
      
    console.log("check result body",body)
    let data = localStorage.getItem("usertoken");
    console.log(data);
    let headers = {
      headers: {
        Authorization: `bearer ${data}`
      }
    };

    axios
      .post(`http://157.230.174.240:3006/api/v1/question/result`, body, headers)
      .then(response => {
        console.log("response", response);
        console.log("response .data.data", response.data.data);
        this.setState({quizResult:response.data.data})
        console.log(this.state.quizResult);
      })
      .catch(error => {
        console.log(error);
      });
  };
  handleContinue = () => {
    console.log("continue")
    this.setState({isResultShow:false})
    console.log(this.state.quizResult.result)
    if(this.state.quizResult.result === "Fail")

 {
  let body = {
    level: 1
  };
  let data = localStorage.getItem("usertoken");

  console.log(data);
  // console.log(newdata)
  let headers = {
    headers: {
      Authorization: `bearer ${data}`
    }
  };
    this.fetchQns(body,headers);

 }
 else {
  this.setState({backtodash:true,isResultShow:false})
 }

  }
  render() {
    const {loading,backtodash ,isResultShow,quizResult :{ total,count,result }} = this.state ;
    if( backtodash === true) {
      return <Redirect to="/studentdashboard" />
    }
    //  console.log(this.state.quizAnswers)
   
   
    console.log("fetch Question", this.state.questions);
    const {classes} = this.props;
    return (
      <div>
        <StudentAppbar />

        <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "16px 4px",
                marginTop:"100px"
              }}
            >
              <Typography variant="h4">Your Quiz Level</Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={this.handleAddnewsOpen}
                style={{display:"none"}}
              >
                Create a Latest News
              </Button>
            </div>
            <Divider />
            {loading ? <div style={{display:"flex",justifyContent:"center",marginTop:"200px"}}>
      <CircularProgress className={classes.progress}  />
   </div> : null }
        <ol type="1" style={{fontSize:"20px" }}>
          {this.state.questions.map(qns => {
            return (
             
              <li>
              <Card style={{ margin: "12px 12px 12px" }}>
                <CardContent>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="h6" gutterBottom fullWidth>
                      {qns.questionstring}
                    </Typography>
                  </div>
                  <div style={{ display: "flex", flexDirection: "row" }}>
                   
                  <FormControlLabel
                    id={qns._id}
                    value="a"
                    control={
                      <Radio
                        color="primary"
                        checked={this.state.option === "a"}
                        onClick={() =>
                          this.handleRadioButton(`"${qns._id}"`, "a")
                        }
                      />
                    }
                    label={qns.option.a}
                    labelPlacement="end"
                  />
                    <FormControlLabel
                    id={qns._id}
                    value="b"
                    control={
                      <Radio
                        color="primary"
                        checked={this.state.option === "b"}
                        onClick={() =>
                          this.handleRadioButton(`"${qns._id}"`, "b")
                        }
                      />
                    }
                    label={qns.option.b}
                    labelPlacement="end"
                  />
                  
                    <FormControlLabel
                    id={qns._id}
                    value="c"
                    control={
                      <Radio
                        color="primary"
                        checked={this.state.option === "c"}
                        onClick={() =>
                          this.handleRadioButton(`"${qns._id}"`, "c")
                        }
                      />
                    }
                    label={qns.option.c}
                    labelPlacement="end"
                  />
                    <FormControlLabel
                    id={qns._id}
                    value="d"
                    control={
                      <Radio
                        color="primary"
                        checked={this.state.option === "d"}
                        onClick={() =>
                          this.handleRadioButton(`"${qns._id}"`, "d")
                        }
                      />
                    }
                    label={qns.option.d}
                    labelPlacement="end"
                  />
                   
                  </div>
                </CardContent>{" "}
              </Card>
            </li>
            
       
            );
          })}
          {/* className={classes.button} */}
       {loading ? null :   <Button
            variant="contained"
            color="secondary"
            onClick={this.handleQuizResult}
              >
            Check Result
       </Button> }
          <Studentresult open={isResultShow} clickedContinue={this.handleContinue} result={result} count={count} total={total} />
        </ol>
      </div>
    );
  }
}

export default  withStyles(styles)(Userquiz);


























// import React, { Component } from "react";

// import Radio from "@material-ui/core/Radio";
// import RadioGroup from "@material-ui/core/RadioGroup";
// import FormControlLabel from "@material-ui/core/FormControlLabel";

// import Typography from "@material-ui/core/Typography";
// //import  {QuestionsList } from '../../Const/questions';

// import axios from "axios";
// import Button from "@material-ui/core/Button";
// import StudentAppbar from "./StudentAppbar";

// class Userquiz extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       questions: [],
//       quizAnswers: {},
//       option: "a"
//     };
//   }

//   componentDidMount() {
//     let body = {
//       level: 1
//     };
//     let data = localStorage.getItem("usertoken");

//     console.log(data);
//     // console.log(newdata)
//     let headers = {
//       headers: {
//         Authorization: `bearer ${data}`
//       }
//     };

//     axios
//       .post(`http://157.230.174.240:3006/api/v1/question/getall`, body, headers)
//       .then(response => {
//         console.log("response", response);
//         console.log("response .data.data", response.data.data);
//         // let updatedObj = Object.assign(this.state.questions,response.data.data);
//         // console.log("updated obj",updatedObj)
//         this.setState({
//           questions: [...this.state.questions, ...response.data.data]
//         });
//         console.log("fetch question State:", this.state.questions);
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }

//   handleRadioButton = (id, value) => {
//     console.log("id:", id);

//     console.log("value", value);
//     this.setState({ [id]: event.target.value });
//     this.setState({
//       quizAnswers: Object.assign(this.state.quizAnswers, { [id]: value })
//     });

//     console.log("quizanswers", this.state.quizAnswers);
//   };

//   handleQuizResult = () => {
//     console.log("result is :");
//     let body = {
//       quizAnswers: this.state.quizAnswers
//     };
//     let data = localStorage.getItem("usertoken");
//     console.log(data);
//     let headers = {
//       headers: {
//         Authorization: `bearer ${data}`
//       }
//     };

//     axios
//       .post(`http://157.230.174.240:3006/api/v1/question/result`, body, headers)
//       .then(response => {
//         console.log("response", response);
//         console.log("response .data.data", response.data.data);
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   };

//   render() {
//     //  console.log(this.state.quizAnswers)

//     console.log("fetch Question", this.state.questions);
//     return (
//       <div>
//         <StudentAppbar />
//         <ol type="1" style={{ marginLeft: "25%",marginTop:"100px" }}>
//           {this.state.questions.map(itm => {
//             return (
//               <li>
//                 <Typography variant="h6" gutterBottom>
//                   {itm.questionstring}
//                 </Typography>
//                 <RadioGroup aria-label="position" name="position" row>
//                   <FormControlLabel
//                     id={itm._id}
//                     value="a"
//                     control={
//                       <Radio
//                         color="primary"
//                         checked={this.state.option === "a"}
//                         onClick={() =>
//                           this.handleRadioButton(`"${itm._id}"`, "a")
//                         }
//                       />
//                     }
//                     label={itm.option.a}
//                     labelPlacement="end"
//                   />
//                   <FormControlLabel
//                     id={itm._id}
//                     value="b"
//                     control={
//                       <Radio
//                         color="primary"
//                         checked={this.state.option === "b"}
//                         onClick={() =>
//                           this.handleRadioButton(`"${itm._id}"`, "b")
//                         }
//                       />
//                     }
//                     label={itm.option.b}
//                     labelPlacement="end"
//                   />
//                   <FormControlLabel
//                     id={itm._id}
//                     value="c"
//                     control={
//                       <Radio
//                         color="primary"
//                         checked={this.state.option === "c"}
//                         onClick={() =>
//                           this.handleRadioButton(`"${itm._id}"`, "c")
//                         }
//                       />
//                     }
//                     label={itm.option.c}
//                     labelPlacement="end"
//                   />
//                   <FormControlLabel
//                     id={itm._id}
//                     value="d"
//                     control={
//                       <Radio
//                         color="primary"
//                         checked={this.state.option === "d"}
//                         onClick={() =>
//                           this.handleRadioButton(`"${itm._id}"`, "d")
//                         }
//                       />
//                     }
//                     label={itm.option.c}
//                     labelPlacement="end"
//                   />
//                 </RadioGroup>
//               </li>
//             );
//           })}
//           {/* className={classes.button} */}
//           <Button
//             variant="contained"
//             color="secondary"
//             onClick={this.handleQuizResult}
//           >
//             Check Result
//           </Button>
//         </ol>
//       </div>
//     );
//   }
// }

// export default Userquiz;
