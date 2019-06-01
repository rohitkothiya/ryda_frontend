import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Adminsidebar from "./AdminSidebar";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import NoSsr from "@material-ui/core/NoSsr";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import Cardquestion from "./Questions/Questions";
import Divider from "@material-ui/core/Divider";
import { DialogTitle } from "@material-ui/core";
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
const drawerWidth = 240;

function LinkTab(props) {
  return (
    <Tab component="a" onClick={event => event.preventDefault()} {...props} />
  );
}

const optionList = [
  {
    value: "A",
    label: "A"
  },
  {
    value: "B",
    label: "B"
  },
  {
    value: "C",
    label: "C"
  },
  {
    value: "D",
    label: "D"
  }
];
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
    padding: theme.spacing.unit * 3
  },
  card: {
    minWidth: 275
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  menu: {
    width: 200
  },
  roottab: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
});

class Adminquiz extends Component {
  fetchQns = headers => {
    axios
      .get(
        `http://157.230.174.240:3006/api/v1/question/getallforadmin`,
        headers
      )
      .then(response => {
        this.setState({
          allQuestions: response.data.data,
          loading: false
        });
      })
      .catch(error => {
        this.setState({ loading: false });
        console.log(error);
      });
  };

  constructor(props) {
    super(props);
    this.state = {
      value: 0,
      isAddQns: false,
      question: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      answer: "a",
      anchorEl: null,
      level: 1,
      allQuestions: [],
      isEditMode: false,
      rightOption: "a",
      loading: false,
      btnLoading: false,
      avatar:null,
      checkedQns: false,
    };
  }
  handleChangeInputTab = (event, value) => {
    this.setState({ value });
  };

  handleLevalClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  componentDidMount() {
    this.setState({ loading: true });
    let data = localStorage.getItem("usertoken");

    // console.log(newdata)
    let headers = {
      headers: {
        Authorization: `bearer ${data}`
      }
    };
    this.fetchQns(headers);
  }

  handleQuestionAdd = () => {
    this.setState({
      isAddQns: false,
      btnLoading: true,
      question: null,
      optionA: null,
      optionB: null,
      optionC: null,
      optionD: null
    });

    let body = {
      level: this.state.level,
      questionstring: this.state.question,
      option: {
        a: this.state.optionA,
        b: this.state.optionB,
        c: this.state.optionC,
        d: this.state.optionD
      },
      answer: this.state.answer
    };
    let data = localStorage.getItem("usertoken");
    let headers = {
      headers: {
        Authorization: `bearer ${data}`
      }
    };

    axios
      .post(
        `http://157.230.174.240:3006/api/v1/question/addquestion`,
        body,
        headers
      )
      .then(response => {
        let data = localStorage.getItem("usertoken");
        let headers = {
          headers: {
            Authorization: `bearer ${data}`
          }
        };
        if (response.data.flag === false) {
          alert("Already 10 Question Added ot this level!");
        }
        this.setState({ btnLoading: false });
        this.fetchQns(headers);
      })
      .catch(error => {
        this.setState({ btnLoading: false });
        console.log(error);
      });
  };
  handleChangeImage = e => {
    e.preventDefault();

    const file = e.target.files[0];
    const path = e.target.value;
    const reader = new FileReader();

    reader.onload = () => {
      this.setState({
        avatarFile: { file, path },
        avatar: reader.result
      });
    };
    reader.readAsDataURL(file);
  };

  handleChangeInput = () => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleClickOpen = () => {
    this.setState({ isAddQns: !this.state.isAddQns });
  };

  handleClose = () => {
    this.setState({ isAddQns: false, isEditMode: false });
  };

  handleEditQuestions = card => {
    this.setState({
      isEditMode: true,
      isAddQns: true,
      question: card.questionstring,
      optionA: card.option.a,
      optionB: card.option.b,
      optionC: card.option.c,
      optionD: card.option.d,
      answer: card.answer,
      id: card._id,
      level: card.level
    });
  };

  handleSaveChanges = () => {
    this.setState({ btnLoading: true });
    let body = {
      level: this.state.level,
      questionstring: this.state.question,
      option: {
        a: this.state.optionA,
        b: this.state.optionB,
        c: this.state.optionC,
        d: this.state.optionD
      },
      answer: this.state.answer
    };
    let data = localStorage.getItem("usertoken");
    let headers = {
      headers: {
        Authorization: `bearer ${data}`
      }
    };
    this.setState({ isAddQns: false });
    axios
      .patch(
        `http://157.230.174.240:3006/api/v1/question/update/${this.state.id}`,
        body,
        headers
      )
      .then(response => {
        let data = localStorage.getItem("usertoken");
        let headers = {
          headers: {
            Authorization: `bearer ${data}`
          }
        };
        this.setState({ btnLoading: false });
        this.fetchQns(headers);
      })
      .catch(error => {
        this.setState({ btnLoading: false });
        console.log(error);
      });
  };
  handleDeleteQuestions = card => {
    let data = localStorage.getItem("usertoken");
    let headers = {
      headers: {
        Authorization: `bearer ${data}`
      }
    };
    axios
      .delete(
        `http://157.230.174.240:3006/api/v1/question/deletequestion/${
          card._id
        }`,
        headers
      )
      .then(response => {
        console.log("response", response);
        this.fetchQns(headers);
      })
      .catch(error => {
        console.log(error);
      });
  };

 handleChange =  event => {
    this.setState({ checkedQns : !this.state.checkedQns });
  };

  render() {
    let firstLevel = this.state.allQuestions.filter(item => item.level == 1);
    let secondLevel = this.state.allQuestions.filter(item => item.level == 2);
    let thirdLevel = this.state.allQuestions.filter(item => item.level == 3);

    const { classes } = this.props;
    const { value, loading, btnLoading } = this.state;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <Adminsidebar />

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "16px 4px"
              }}
            >
              <Typography variant="h4">Quiz Questions</Typography>
              <Button
                variant="outlined"
                color="primary"
                onClick={this.handleClickOpen}
              >
                Add Quiz Question
              </Button>
            </div>
            <Divider />

            <Dialog
              open={this.state.isAddQns}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
              maxWidth="md"
            >
              <DialogTitle>
                {" "}
                {this.state.isEditMode ? "Edit Question" : "Add Question"}{" "}
              </DialogTitle>
              <Divider />
              <DialogContent>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                <TextField
                  name="level"
                  id="standard-with-placeholder"
                  select
                  label="Level"
                  value={this.state.level}
                  onChange={this.handleChangeInput}
                  SelectProps={{
                    native: true,
                    MenuProps: {
                      className: classes.menu
                    }
                  }}
                  margin="dense"
                  style={{ minWidth: "120px" }}
                  variant="outlined"
                >
                  {[1, 2, 3].map(level => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </TextField>
                <input  style={{width:"calc(100% - 110px)",display:"inline-block",position:"absolute",bottom:"0px",right:"8px",opacity:"0",height:"26px",cursor:"pointer",marginLeft:"10px"}}
                    type="file"
                    onChange={this.handleChangeImage}
                    accept="image/*"
                  />
                <FormControlLabel
                    control={
                  <Checkbox
                    checked={this.state.checkedQns}
                 onChange={this.handleChange}
                  value="chekedQns"
                  color="primary"
                 />
              }
        label="Upload Image Question"
      />
  </div>
                <TextField
                  margin="dense"
                  id="name"
                  label="Enter Question"
                  multiline
                  type="text"
                  fullWidth
                  name="question"
                  onChange={this.handleChangeInput}
                  value={this.state.question}
                  variant="outlined"
                />
                   
                     <img style={{width:"100px",height:"100px",objectFit:"contain",backgroundColor:"#e4e4e4",display:"inline-block",verticalAlign:"bottom",marginRight:"100px"}}
                    src={this.state.avatar}
                    className="imageBox"
                    alt=""
                  />
                
                  
                  <abbr>Upload Photo</abbr>
                <div>

                  <div>
                    <TextField
                      id="standard-with-placeholder"
                      label="A"
                      placeholder="option A"
                      margin="dense"
                      onChange={this.handleChangeInput}
                      name="optionA"
                      value={this.state.optionA}
                      variant="outlined"
                    />
                    <TextField
                      style={{ marginLeft: "10px" }}
                      id="standard-with-placeholder"
                      label="B"
                      placeholder="option B"
                      margin="dense"
                      onChange={this.handleChangeInput}
                      name="optionB"
                      value={this.state.optionB}
                      variant="outlined"
                    />
                  </div>
                  <div>
                    <TextField
                      id="standard-with-placeholder"
                      label="C"
                      placeholder="option C"
                      margin="dense"
                      onChange={this.handleChangeInput}
                      name="optionC"
                      value={this.state.optionC}
                      variant="outlined"
                    />
                    <TextField
                      style={{ marginLeft: "10px" }}
                      id="standard-with-placeholder"
                      label="D"
                      placeholder="option D"
                      margin="dense"
                      onChange={this.handleChangeInput}
                      name="optionD"
                      value={this.state.optionD}
                      variant="outlined"
                    />
                  </div>
                </div>

                <TextField
                  name="answer"
                  id="standard-with-placeholder"
                  select
                  label="Correct Answer"
                  // className={classes.textField}
                  value={this.state.answer}
                  onChange={this.handleChangeInput}
                  SelectProps={{
                    native: true,
                    MenuProps: {
                      className: classes.menu
                    }
                  }}
                  helperText="Please select correct answer"
                  margin="dense"
                  variant="outlined"
                >
                  {optionList.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="default">
                  Cancel
                </Button>
                {this.state.isEditMode ? (
                  <Button
                    variant="contained"
                    onClick={this.handleSaveChanges}
                    color="primary"
                  >
                    {btnLoading ? "Saving" : "Save"}
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={this.handleQuestionAdd}
                    color="primary"
                  >
                    {btnLoading ? "Adding" : "Add"}
                  </Button>
                )}
              </DialogActions>
            </Dialog>
            <NoSsr>
              <div className={classes.roottab} style={{ marginTop: "10px" }}>
                <AppBar position="static">
                  <Tabs
                    variant="fullWidth"
                    value={value}
                    onChange={this.handleChangeInputTab}
                  >
                    <LinkTab label="Level 1" href="page1" />
                    <LinkTab label="Level 2" href="page2" />
                    <LinkTab label="Level 3" href="page3" />
                  </Tabs>
                </AppBar>
                {value === 0 && (
                  <Cardquestion
                    props={firstLevel}
                    clicked={this.handleEditQuestions}
                    loading={loading}
                    deleted={this.handleDeleteQuestions}
                  />
                )}
                {value === 1 && (
                  <Cardquestion
                    props={secondLevel}
                    clicked={this.handleEditQuestions}
                    loading={loading}
                    deleted={this.handleDeleteQuestions}
                  />
                )}
                {value === 2 && (
                  <Cardquestion
                    props={thirdLevel}
                    clicked={this.handleEditQuestions}
                    loading={loading}
                    deleted={this.handleDeleteQuestions}
                  />
                )}
              </div>
            </NoSsr>

            {/* <Cardquestion props={this.state.allQuestions}/> */}
          </div>
        </main>
      </div>
    );
  }
}

Adminquiz.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Adminquiz);

{
  /* <Card className={classes.card}>
{firstLevel.map(card => {
return (
   <CardContent>
     <Typography variant="h6" gutterBottom fullWidth>
                 {card.questionstring}
           </Typography>
           <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
           <Typography variant="subtitle1" gutterBottom fullWidth>
                 A:  {card.option.a}
           </Typography>
           <Typography variant="subtitle1" gutterBottom fullWidth>
           B:  {card.option.b}
           </Typography></div>
           <div style={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
           <Typography variant="subtitle1" gutterBottom fullWidth>
           C:  {card.option.c}
           </Typography>
           <Typography variant="subtitle1" gutterBottom fullWidth>
           D:  {card.option.d}
           </Typography></div>
           <Typography variant="subtitle1" gutterBottom fullWidth>
           Answer:  {card.option.a}
           <Button onClick={() => this.handleEditQuestions(card)} color="primary" autoFocus>
               Edit
            </Button> 
           </Typography>
         
      
</CardContent>
)}
)
}
</Card>  */
}
