import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Adminsidebar from "./AdminSidebar";
import axios from "axios";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import NoSsr from "@material-ui/core/NoSsr";
import Tab from "@material-ui/core/Tab";
import AppBar from "@material-ui/core/AppBar";
import Cardquestion from "./Questions/Questions";

const drawerWidth = 240;

function LinkTab(props) {
  return (
    <Tab component="a" onClick={event => event.preventDefault()} {...props} />
  );
}

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}
const optionList = [
  {
    value: "a",
    label: "a"
  },
  {
    value: "b",
    label: "b"
  },
  {
    value: "c",
    label: "c"
  },
  {
    value: "d",
    label: "d"
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
        console.log("response", response);
        console.log("response .data.data", response.data.data);
        // console.log("respnse level wise data")
        this.setState({
          allQuestions: [...this.state.allQuestions, ...response.data.data]
        });

        console.log("fetch question State:", this.state.allQuestions);
      })
      .catch(error => {
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
      rightOption: "a"
    };
  }
  handleChangeTab = (event, value) => {
    this.setState({ value });
  };

  handleLevalClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleSelectLevel = value => {
    this.setState({ anchorEl: null, level: value });
    console.log("level", this.state.level);
  };
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };
  componentDidMount() {
    let data = localStorage.getItem("usertoken");

    console.log(data);
    // console.log(newdata)
    let headers = {
      headers: {
        Authorization: `bearer ${data}`
      }
    };
    this.fetchQns(headers);
    //  axios
    //  .get(`http://157.230.174.240:3006/api/v1/question/getallforadmin`, headers)
    //      .then(response => {
    //        console.log("response",response);
    //        console.log("response .data.data",response.data.data)
    //         // console.log("respnse level wise data")
    //        this.setState({allQuestions:[...this.state.allQuestions,...response.data.data]})

    //       console.log("fetch question State:",this.state.allQuestions)
    //        })
    //    .catch(error => {
    //         console.log(error);
    //       });
  }

  handleQuestionAdd = () => {
    this.setState({ isAddQns: false });

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
    //  let newdata= JSON.stringify(data);
    console.log(data);
    let headers = {
      headers: {
        Authorization: `bearer ${data}`
      }
    };
    console.log("body", body);

    axios
      .post(
        `http://157.230.174.240:3006/api/v1/question/addquestion`,
        body,
        headers
      )
      .then(response => {
        console.log("response", response);

        console.log("response .data.data", response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleInputTextChange = () => {
    this.setState({ [event.target.name]: event.target.value });
    console.log(event.target.name);
  };

  handleClickOpen = () => {
    this.setState({ isAddQns: !this.state.isAddQns });
  };

  handleClose = () => {
    this.setState({ isAddQns: false });
  };
  handleEditQuestions = card => {
    console.log(
      "card detail",
      card.questionstring,
      card.option.a,
      card.optionB,
      card.option.c,
      card.option.d,
      card.answer,
      card._id
    );
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

    console.log(data);
    let headers = {
      headers: {
        Authorization: `bearer ${data}`
      }
    };
    console.log("body", body);
    this.setState({ isAddQns: false });
    axios
      .patch(
        `http://157.230.174.240:3006/api/v1/question/update/${this.state.id}`,
        body,
        headers
      )
      .then(response => {
        console.log("response", response);

        console.log("response .data.data", response.data.data);
        this.fetchQns(headers);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    let firstLevel = this.state.allQuestions.filter(item => item.level == 1);
    console.log("first level Questions", firstLevel);
    let secondLevel = this.state.allQuestions.filter(item => item.level == 2);
    console.log("second level Questions", secondLevel);
    let thirdLevel = this.state.allQuestions.filter(item => item.level == 3);
    console.log("third level Questions", thirdLevel);
    const { classes } = this.props;
    const { value } = this.state;
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
            <Dialog
              open={this.state.isAddQns}
              onClose={this.handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogContent>
                <Typography>Selected Level :{this.state.level}</Typography>
                <Button
                  aria-owns={this.state.anchorEl ? "simple-menu" : undefined}
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
                  <MenuItem onClick={() => this.handleSelectLevel(1)}>
                    1
                  </MenuItem>
                  <MenuItem onClick={() => this.handleSelectLevel(2)}>
                    2
                  </MenuItem>
                  <MenuItem onClick={() => this.handleSelectLevel(3)}>
                    3
                  </MenuItem>
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
                  value={this.state.question}
                />
                <TextField
                  id="standard-with-placeholder"
                  label="A"
                  placeholder="option A"
                  margin="normal"
                  onChange={this.handleInputTextChange}
                  name="optionA"
                  value={this.state.optionA}
                />
                <TextField
                  style={{ marginLeft: "10px" }}
                  id="standard-with-placeholder"
                  label="B"
                  placeholder="option B"
                  margin="normal"
                  onChange={this.handleInputTextChange}
                  name="optionB"
                  value={this.state.optionB}
                />
                <TextField
                  id="standard-with-placeholder"
                  label="C"
                  placeholder="option C"
                  margin="normal"
                  onChange={this.handleInputTextChange}
                  name="optionC"
                  value={this.state.optionC}
                />
                <TextField
                  style={{ marginLeft: "10px" }}
                  id="standard-with-placeholder"
                  label="D"
                  placeholder="option D"
                  margin="normal"
                  onChange={this.handleInputTextChange}
                  name="optionD"
                  value={this.state.optionD}
                />

                <TextField
                  name="rightOption"
                  id="standard-with-placeholder"
                  select
                  label="Correct Answer"
                  // className={classes.textField}
                  value={this.state.answer}
                  onChange={this.handleChange("answer")}
                  SelectProps={{
                    native: true,
                    MenuProps: {
                      className: classes.menu
                    }
                  }}
                  helperText="Please select right answer"
                  margin="normal"
                >
                  {optionList.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                  Cancel
                </Button>
                {this.state.isEditMode ? (
                  <Button onClick={this.handleSaveChanges} color="primary">
                    Save
                  </Button>
                ) : (
                  <Button onClick={this.handleQuestionAdd} color="primary">
                    Add
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
                    onChange={this.handleChangeTab}
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
                  />
                )}
                {value === 1 && (
                  <Cardquestion
                    props={secondLevel}
                    clicked={this.handleEditQuestions}
                  />
                )}
                {value === 2 && (
                  <Cardquestion
                    props={thirdLevel}
                    clicked={this.handleEditQuestions}
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
