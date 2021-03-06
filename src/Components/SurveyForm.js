import React, { Component } from "react";
// import PropTypes from 'prop-types';

import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControl from "@material-ui/core/FormControl";

import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";



import withStyles from "@material-ui/core/styles/withStyles";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import Dialog from '@material-ui/core/Dialog';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import DialogTitle from '@material-ui/core/DialogTitle'
import FormLabel from "@material-ui/core/FormLabel";

import { withRouter } from "react-router-dom";

import { Redirect } from "react-router-dom";
import axios from "axios";
import { Divider } from "@material-ui/core";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameSurvey: "rohit",
      emailSurvey: "rohit@gmail.com",
      schoolName: "pp savani",
      ageSurvey: "123",
      qns1: "heelo",
      qns2: " hie",
      qns3: "hwllo",
      gender: "male",
      country: "india",
      isSubmitClose:true
    };
  }

  handleSubmitSurvey = () => {
    this.setState({isSubmitClose:false})
    event.preventDefault();
    console.log("Register clicked");

    let body = {
      name: this.state.nameSurvey,
      email: this.state.emailSurvey,
      age: this.state.ageSurvey,
      school_name: this.state.schoolName,
      gender: this.state.gender,
      country: this.state.country,
      qns1_ans: this.state.qns1,
      qns2_ans: this.state.qns2,
      qns3_ans: this.state.qns3
    };
    console.log("body", body);

    axios
      .post(`http://157.230.174.240:3006/api/v1/survey`, body)
      .then(response => {
        console.log("response", response);

        console.log("response .data.data", response.data.data);

        if (response.data.flag === true) {
          this.setState({ backtoDashboard: true });
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleRadioButtonGender = value => {
    console.log(value);

    this.setState({ gender: value });
  };
  handleRadioButtonCountry = value => {
    console.log(value);

    this.setState({ country: value });
  };

  handleChangeInputText = () => {
    console.log(event.target.name);
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    const { classes } = this.props;

    if (this.state.backtoDashboard) {
      return <Redirect to="/studentdashboard" />;
    }
    return (
      <main className={classes.main} style={{ width: "500px" }}>
        <CssBaseline />
        <Dialog
          open={this.props.open && this.state.isSubmitClose}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
         
          <form className={classes.form} onSubmit={this.handleSubmitSurvey}>
          <DialogContent>
         
          <DialogTitle id="form-dialog-title" style={{fontSize:"24px"}}>Survey Form</DialogTitle>
          <Divider/>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="name">Name</InputLabel>
              <Input
                id="name"
                name="nameSurvey"
                autoComplete="name"
                autoFocus
                onChange={this.handleChangeInputText}
                required
                type="text"
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
              type="email"
                id="email"
                name="emailSurvey"
                autoComplete="email"
                onChange={this.handleChangeInputText}
                required
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="school">
                What School do you goto ?
              </InputLabel>
              <Input
                name="school"
                type="text"
                id="school"
                autoComplete="school"
                onChange={this.handleChangeInputText}
                required
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                style={{ display: "flex", flexDirection: "row" }}
                aria-label="Gender"
                name="gender1"
                className={classes.group}
                value={this.state.value}
                onChange={this.handleChange}
              >
                <FormControlLabel
                  value="female"
                  control={
                    <Radio
                      checked={this.state.gender === "female"}
                      onClick={() => this.handleRadioButtonGender("female")}
                    />
                  }
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={
                    <Radio
                      checked={this.state.gender === "male"}
                      onClick={() => this.handleRadioButtonGender("male")}
                    />
                  }
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={
                    <Radio
                      checked={this.state.gender === "other"}
                      onClick={() => this.handleRadioButtonGender("other")}
                    />
                  }
                  label="Other"
                />
              </RadioGroup>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <FormLabel component="legend">Your country</FormLabel>
              <RadioGroup
                style={{ display: "flex", flexDirection: "row" }}
                aria-label="country"
                name="country"
                className={classes.group}
                value={this.state.value}
                onChange={this.handleChange}
              >
                <FormControlLabel
                  value="india"
                  control={
                    <Radio
                      checked={this.state.country === "india"}
                      onClick={() => this.handleRadioButtonCountry("india")}
                    />
                  }
                  label="India"
                />
                <FormControlLabel
                  value="australia"
                  control={
                    <Radio
                      checked={this.state.country === "australia"}
                      onClick={() => this.handleRadioButtonCountry("australia")}
                    />
                  }
                  label="Australia"
                />
                <FormControlLabel
                  value="america"
                  control={
                    <Radio
                      checked={this.state.country === "america"}
                      onClick={() => this.handleRadioButtonCountry("america")}
                    />
                  }
                  label="America"
                />
              </RadioGroup>
            </FormControl>

            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="age">Age</InputLabel>
              <Input
                name="ageSurvey"
                type="number"
                id="age"
                autoComplete="age"
                onChange={this.handleChangeInputText}
                required
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="qns1">what are you doing now ?</InputLabel>
              <Input
                name="qns1"
                type="text"
                id="qns1"
                autoComplete="qns1"
                onChange={this.handleChangeInputText}
                required
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="qns2">what is your hobbies ?</InputLabel>
              <Input
                name="qns2"
                type="text"
                id="qns2"
                autoComplete="qns2"
                onChange={this.handleChangeInputText}
                required
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="qns3">when you will graduate ?</InputLabel>
              <Input
                name="qns3"
                type="text"
                id="qns3"
                autoComplete="qns3"
                onChange={this.handleChangeInputText}
                required
              />
            </FormControl>
            </DialogContent>
  
            <DialogActions>
          <Button onClick={this.props.closed} color="primary">
            Cancel
          </Button>
          <Button  type="submit"  variant="contained" color="primary"  style={{backgroundColor:"#3f98b5"}}  >
            Submit
          </Button>
        </DialogActions>
           
         
          </form>
          </Dialog>
      </main>
    );
  }
}

// Register.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(withRouter(Register));

// import React, { Component } from "react";
// // import PropTypes from 'prop-types';
// import Avatar from "@material-ui/core/Avatar";
// import Button from "@material-ui/core/Button";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import FormControl from "@material-ui/core/FormControl";
// import TextField from "@material-ui/core/TextField";
// import Dialog from "@material-ui/core/Dialog";
// import DialogActions from "@material-ui/core/DialogActions";
// import DialogContent from "@material-ui/core/DialogContent";
// import Input from "@material-ui/core/Input";
// import InputLabel from "@material-ui/core/InputLabel";
// import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
// import Paper from "@material-ui/core/Paper";
// import Typography from "@material-ui/core/Typography";
// import withStyles from "@material-ui/core/styles/withStyles";
// import Radio from "@material-ui/core/Radio";
// import RadioGroup from "@material-ui/core/RadioGroup";
// import Divider from '@material-ui/core/Divider';
// import { DialogTitle } from "@material-ui/core";
// import FormControlLabel from "@material-ui/core/FormControlLabel";

// import FormLabel from "@material-ui/core/FormLabel";

// import { withRouter } from "react-router-dom";

// import { Redirect } from "react-router-dom";
// import axios from "axios";

// const styles = theme => ({
//   main: {
//     width: "auto",
//     display: "block", // Fix IE 11 issue.
//     marginLeft: theme.spacing.unit * 3,
//     marginRight: theme.spacing.unit * 3,
//     [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
//       width: 400,
//       marginLeft: "auto",
//       marginRight: "auto"
//     }
//   },
//   paper: {
//     marginTop: theme.spacing.unit * 8,
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
//       .spacing.unit * 3}px`
//   },
//   avatar: {
//     margin: theme.spacing.unit,
//     backgroundColor: theme.palette.secondary.main
//   },
//   form: {
//     width: "100%", // Fix IE 11 issue.
//     marginTop: theme.spacing.unit
//   },
//   submit: {
//     marginTop: theme.spacing.unit * 3
//   }
// });

// class Register extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       nameSurvey: "rohit",
//       emailSurvey: "rohit@gmail.com",
//       schoolName: "pp savani",
//       ageSurvey: "123",
//       qns1: "heelo",
//       qns2: " hie",
//       qns3: "hwllo",
//       gender: "male",
//       country: "india"
//     };
//   }

//   handleSubmitSurvey = () => {
//     event.preventDefault();
//     console.log("Register clicked");

//     let body = {
//       name: this.state.nameSurvey,
//       email: this.state.emailSurvey,
//       age: this.state.ageSurvey,
//       school_name: this.state.schoolName,
//       gender: this.state.gender,
//       country: this.state.country,
//       qns1_ans: this.state.qns1,
//       qns2_ans: this.state.qns2,
//       qns3_ans: this.state.qns3
//     };
//     console.log("body", body);

//     axios
//       .post(`http://157.230.174.240:3006/api/v1/survey`, body)
//       .then(response => {
//         console.log("response", response);

//         console.log("response .data.data", response.data.data);

//         if (response.data.flag === true) {
//           this.setState({ backtoDashboard: true });
//         }
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   };

//   handleRadioButtonGender = value => {
//     console.log(value);

//     this.setState({ gender: value });
//   };
//   handleRadioButtonCountry = value => {
//     console.log(value);

//     this.setState({ country: value });
//   };

//   handleChangeInputText = () => {
//     console.log(event.target.name);
//     this.setState({
//       [event.target.name]: event.target.value
//     });
//   };

//   render() {
//     const { classes } = this.props;
//         console.log(this.props);
//     if (this.state.backtoDashboard) {
//       return <Redirect to="/studentdashboard" />;
//     }
//     return (
//       <Dialog
//       style={{width:"300px"}}
//       open={this.props.open}
//       onClose={this.handleClose}
//       aria-labelledby="form-dialog-title"
//       maxWidth="md"
//     >
//       <DialogTitle> Survey Form</DialogTitle>
//       <Divider />
//       <DialogContent>

//         <TextField
//           margin="dense"
//           id="name"
//           label=" Enter Your Name"
//           multiline
//           type="text"
//           fullWidth
//           name="nameSurvey"
//           onChange={this.handleChangeInputText}

//           variant="outlined"

//         />
//           <TextField
//           margin="dense"
//           id="emailSurvey"
//           label=" Enter Your Email"
//           multiline
//           type="email"
//           fullWidth
//           name="emailSurvey"
//           onChange={this.handleChangeInputText}

//           variant="outlined"
//         />
//         <TextField
//           margin="dense"
//           id="school"
//           label=" Enter Your  SchoolName"
//           multiline
//           type="text"
//           fullWidth
//           name="schoolName"
//           onChange={this.handleChangeInputText}

//           variant="outlined"

//         />
//         <TextField
//           margin="dense"
//           id="age"
//           label=" Enter Your age"
//           multiline
//           type="number"
//           fullWidth
//           name="age"
//           onChange={this.handleChangeInputText}

//           variant="outlined"

//         />
//                <FormControl margin="normal" required fullWidth>
//             <FormLabel component="legend">Gender</FormLabel>
//             <RadioGroup
//                 style={{ display: "flex", flexDirection: "row" }}
//                 aria-label="Gender"
//                 name="gender1"
//                 className={classes.group}
//                 value={this.state.value}
//                 onChange={this.handleChange}
//               >
//                 <FormControlLabel
//                   value="female"
//                   control={
//                     <Radio
//                       checked={this.state.gender === "female"}
//                       onClick={() => this.handleRadioButtonGender("female")}
//                     />
//                   }
//                   label="Female"
//                 />
//                 <FormControlLabel
//                   value="male"
//                   control={
//                     <Radio
//                       checked={this.state.gender === "male"}
//                       onClick={() => this.handleRadioButtonGender("male")}
//                     />
//                   }
//                   label="Male"
//                 />
//                 <FormControlLabel
//                   value="other"
//                   control={
//                     <Radio
//                       checked={this.state.gender === "other"}
//                       onClick={() => this.handleRadioButtonGender("other")}
//                     />
//                   }
//                   label="Other"
//                 />
//               </RadioGroup>
//             </FormControl>
//              <FormControl margin="normal" required fullWidth>
//             <FormLabel component="legend">Your country</FormLabel>
//              <RadioGroup
//                 style={{ display: "flex", flexDirection: "row" }}
//                 aria-label="country"
//                 name="country"
//                 className={classes.group}
//                 value={this.state.value}
//                 onChange={this.handleChange}
//               >
//                 <FormControlLabel
//                   value="india"
//                   control={
//                     <Radio
//                       checked={this.state.country === "india"}
//                       onClick={() => this.handleRadioButtonCountry("india")}
//                     />
//                   }
//                   label="India"
//                 />
//                 <FormControlLabel
//                   value="australia"
//                   control={
//                     <Radio
//                       checked={this.state.country === "australia"}
//                       onClick={() => this.handleRadioButtonCountry("australia")}
//                     />
//                   }
//                   label="Australia"
//                 />
//                 <FormControlLabel
//                   value="america"
//                   control={
//                     <Radio
//                       checked={this.state.country === "america"}
//                       onClick={() => this.handleRadioButtonCountry("america")}
//                     />
//                   }
//                   label="America"
//                 />
//               </RadioGroup>
//             </FormControl>
//           <TextField
//           margin="dense"
//           id="qns1"
//           label="What is your hobbies?"
//           multiline
//           type="text"
//           fullWidth
//           name="qns1"
//           onChange={this.handleChangeInputText}

//           variant="outlined"

//         />
//         <TextField
//           margin="dense"
//           id="qns2"
//           label="What is education qualification?"
//           multiline
//           type="text"
//           fullWidth
//           name="qns2"
//           onChange={this.handleChangeInputText}

//           variant="outlined"

//         />
//         <TextField
//           margin="dense"
//           id="qns3"
//           label="Where is your home town?"
//           multiline
//           type="text"
//           fullWidth
//           name="qns3"
//           onChange={this.handleChangeInputText}

//           variant="outlined"

//         />

//       </DialogContent>
//       <DialogActions>
//       <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               color="primary"
//               // className={classes.submit}
//               onClick={this.handleSubmitSurvey}
//             >
//               Submit
//             </Button>
//       </DialogActions>
//     </Dialog>

//     );
//   }
// }

// // Register.propTypes = {
// //   classes: PropTypes.object.isRequired,
// // };

// export default withStyles(styles)(withRouter(Register));
