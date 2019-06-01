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
import Studentresult from "./StudentResult";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import RadioGroup from '@material-ui/core/RadioGroup';

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2
  }
});

class Userquiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      quizAnswers: {},
      option: "a",
      loading: false,
      total: "",
      count: "",
      result: "",
      quizResult: {},
      backtodash: false,
      id: "",
    };
  }

  fetchQns = (body, headers) => {
    axios
      .post(`http://157.230.174.240:3006/api/v1/question/getall`, body, headers)
      .then(response => {
        this.setState({
          questions: response.data.data,
          loading: false
        });
      })
      .catch(error => {
        this.setState({ loading: false });
        console.log(error);
      });
  };
  componentDidMount() {
    this.setState({ loading: true });
    let body = {
      level: 1
    };
    let data = localStorage.getItem("usertoken");
    let headers = {
      headers: {
        Authorization: `bearer ${data}`
      }
    };

    axios
      .post(`http://157.230.174.240:3006/api/v1/question/getall`, body, headers)
      .then(response => {
        this.setState({
          questions: [...this.state.questions, ...response.data.data],
          loading: false
        });
      })
      .catch(error => {
        this.setState({ loading: false });
        console.log(error);
      });
  }

  handleRadioButton = questionId => event => {
    this.setState({
      quizAnswers: Object.assign(this.state.quizAnswers, { [questionId]: event.target.value })
    });
  };

  handleQuizResult = () => {
    this.setState({ isResultShow: true, gettingResult: true });
    let body = this.state.quizAnswers;
    let data = localStorage.getItem("usertoken");
    let headers = {
      headers: {
        Authorization: `bearer ${data}`
      }
    };

    axios
      .post(`http://157.230.174.240:3006/api/v1/question/result`, body, headers)
      .then(response => {
        this.setState({ quizResult: response.data.data, gettingResult: false });
      })
      .catch(error => {
        console.log(error);
        this.setState({ gettingResult: false })
      });
  };

  handleContinue = () => {
    this.setState({ isResultShow: false, quizAnswers: {} });
    if (this.state.quizResult.result === "Pass") {
      this.setState({ backtodash: true, isResultShow: false });
    } else {
      window.location.reload();
    }
  };
  render() {
    const {
      loading,
      backtodash,
      isResultShow,
      quizResult: { total, count, result }
    } = this.state;
    if (backtodash === true) {
      return <Redirect to="/studentdashboard" />;
    }
    const { classes } = this.props;
    return (
      <div>
        <StudentAppbar />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "16px 4px",
            marginTop: "100px"
          }}
        >
          <Typography variant="h4">Your Quiz Level</Typography>
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
        ) : ''}
        <ol type="1" style={{ fontSize: "20px" }}>
          {this.state.questions.map((qns, i) => {
            return (
              <li key={qns._id}>
                <Card style={{ margin: "12px 12px 12px" }}>
                  <CardContent>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between"
                      }}
                    >
                      <Typography variant="h6" gutterBottom fullWidth>
                        {qns.questionstring}
                      </Typography>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row" }}>
                      <RadioGroup
                        aria-label="Gender"
                        name={qns._id}
                        className={classes.group}
                        value={this.state.quizAnswers[qns._id]}
                        onChange={this.handleRadioButton(qns._id)}
                      >
                        <FormControlLabel value="a" control={<Radio />} label={qns.option.a} />
                        <FormControlLabel value="b" control={<Radio />} label={qns.option.b} />
                        <FormControlLabel value="c" control={<Radio />} label={qns.option.c} />
                        <FormControlLabel value="d" control={<Radio />} label={qns.option.d} />
                      </RadioGroup>
                    </div>
                  </CardContent>{" "}
                </Card>
              </li>
            );
          })}
          {/* className={classes.button} */}
          {loading ? null : (
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleQuizResult}
            >
              Submit
            </Button>
          )}
          <Studentresult
            open={isResultShow}
            gettingResult={this.state.gettingResult}
            clickedContinue={this.handleContinue}
            result={result}
            count={count}
            total={total}
          />
        </ol>
      </div>
    );
  }
}

export default withStyles(styles)(Userquiz);