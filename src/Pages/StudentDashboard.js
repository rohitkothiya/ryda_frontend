import React, { Component } from "react";

import Button from "@material-ui/core/Button";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
// import Grid from "@material-ui/core/Grid";

import Typography from "@material-ui/core/Typography";

import Container from "@material-ui/core/Container";
import { Link } from "react-router-dom";

import StudentAppbar from "../Components/Student/StudentAppbar";

import { withStyles } from "@material-ui/core/styles";
import CardActionArea from '@material-ui/core/CardActionArea';
import MaterialImage from '../images/material.jpg';
import { Divider } from "@material-ui/core";
import QuizImage from "../images/quizs.jpeg";
import ResultImage from '../images/result.jpeg';

import FeedbackImage from '../images/feedback.jpg';
import axios from "axios";

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  media: {
    height: '140px'
  }
};

class StudentDashboard extends Component {
  state = {
    level: ""
  };

  componentDidMount() {
    let data = localStorage.getItem("usertoken");

    console.log(data);
    let headers = {
      headers: {
        Authorization: `bearer ${data}`
      }
    };
    axios
      .get(`http://157.230.174.240:3006/api/v1/user/getuserbytoken`, headers)
      .then(response => {
        console.log("response", response);
        this.setState({ level: response.data.data.clearedlevel,feedback:response.data.data.feedback });
        console.log("getch state data", this.state.level);
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleLogout = () => {
    let data = localStorage.getItem("usertoken");

    console.log(data);
    let headers = {
      headers: {
        Authorization: `bearer ${data}`
      }
    };

    axios
      .get(`http://157.230.174.240:3006/api/v1/user/logout`, headers)
      .then(response => {
        console.log("response", response);

        if (response.data.flag === true) {
          this.setState({ backtoDash: true });
          localStorage.removeItem("usertoken");
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { classes } = this.props;
    console.log(this.state);
    //  console.log("props",this.props.props);
    // const classes = useStyles();
    return (
      <React.Fragment>
        <CssBaseline />
        <StudentAppbar />
        <main style={{display:"flex",flexDirection:"column"}}>
          {/* Hero unit */}
          {/* className={classes.heroContent} */}
          <div style={{marginTop:"85px"}}>
            <Container maxWidth="sm">
              <Typography
                component="h1"
                variant="h2"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                Student Workfield
              </Typography>
              <Typography
                variant="h5"
                align="center"
                color="textSecondary"
                paragraph
              >
                Student can read material about study and their intrested feild
                documetns and also give a test of quiz according to his leval as
                they cleared and check their result of test Giive us feedback
                about working experience with us.
              </Typography>
            </Container>
          </div>
          {/* className={classes.cardGrid} */}
          <Container >
            {/* End hero unit */}
            {/* <Grid  style={{display:"flex",flexDirection:"row",flexWrap:"wrap",justifyContent:"space-between",alignItems:"space-evenly"}}> */}
            <div className="section2">
              <Card className={classes.card} style={{ width: '250px',margin: '12px 0' }} >
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={MaterialImage}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Material
                    </Typography>
                    <Typography component="p">
                      This reading material will help you to clear the exams. <br/>
                      It's important to understand the road rules wherever your journey takes you.
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <Divider />
                <CardActions>
                <a target="_blank" href={"http://www.legislation.vic.gov.au/domino/Web_Notes/LDMS/LTObject_Store/ltobjst10.nsf/DDE300B846EED9C7CA257616000A3571/1AEF94CB51024A3ACA2582250073051A/$FILE/17-41sra002%20authorised.pdf"} style={{ textDecoration: 'unset' }}>
                  <Button size="small" color="primary" >
                      Download
                  </Button>
                </a>
                </CardActions>
                </Card>
                <Card className={classes.card} className={classes.card} style={{ width: '250px',margin: '12px 0'}}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={QuizImage}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Quiz
                    </Typography>
                    <Typography component="p">
                      Lets try Quiz and Complete the test <br/>
                      It's important to passes all level.
                    </Typography>
                    
                  </CardContent>
                </CardActionArea>
                <Divider />
                <CardActions>
                  {this.state.level === 3 ? (
                    <Typography component="p">
                    You have cleared all levels
                  </Typography>
               ) :  (
                <Link to="/quiz" style={{ textDecoration: 'unset' }}>
                <Button size="small" color="primary" >
            
                Take Quiz Level: {this.state.level + 1}
                </Button>
                </Link>
                  )}

                </CardActions>
                
              </Card>
              <Card className={classes.card} style={{ width: '250px',margin: '12px 0'}}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={ResultImage}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                     Result
                    </Typography>
                    <Typography component="p">
                     Your result is show your level 
                     and week part of your 
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <Divider />
                <CardContent>
                   
                    <Typography component="h6">
                    {this.state.level === 2 ? `You have cleared all levels.`:  `You've cleared level: ${this.state.level}` }
                    </Typography>
                  </CardContent>
                {/* <CardActions>
                <a target="_blank" href={""} style={{ textDecoration: 'unset' }}>
                  <Button size="small" color="primary" >
                      See Result 
                  </Button>
                </a>
                </CardActions> */}
                
              </Card>
              <Card className={classes.card} style={{ width: '250px',margin: '12px 0'}}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={FeedbackImage}
                    title="Contemplative Reptile"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      Feedback
                    </Typography>
                    <Typography component="p">
                     Feedback is useful to improving and be efficient
                     in the test.
                    </Typography>
                    <Divider />
                    <CardContent>
                    <Typography component="h6">
                    {Boolean(this.state.feedback) ? `Your feedback is:${this.state.feedback}` : "You don't have  any feedback." }
                    </Typography>

                    </CardContent>
                   
                  </CardContent>
                </CardActionArea>
                
                
                {/* <CardActions>
                <a target="_blank" href={""} style={{ textDecoration: 'unset' }}>
                  <Button size="small" color="primary" >
                     See Your Feedback
                  </Button>
                </a>
                </CardActions> */}
                
              </Card>

              {/* {cards.map((card, i) => (
                <Grid item key={i} xs={12} sm={6} md={4}>
                  {/* className={classes.card} 
                  <Card>
                
                    <CardMedia
                        className={classes.media}
                        image={Quizimage}
                      title="Image title"
                    />
              
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {card.title}
                      </Typography>
                      <Typography>
                        {card.description}{" "}
                        {card.type ? (
                          this.state.level === 0 ? (
                            <div>You have not cleared Any Level </div>
                          ) : (
                            <div>You have cleared {this.state.level} </div>
                          )
                        ) : null}{" "}
                      </Typography>
                    </CardContent>
                    <Divider />
                    <CardActions>
                      <Link to={`${card.pathname}`}>
                        <Button size="small" color="primary">
                          view
                        </Button>
                      </Link>
                    </CardActions>
                  </Card>
                </Grid>
              ))} */}
            {/* </Grid> */}
            </div>
          </Container>
        </main>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(StudentDashboard);



























// import React, { Component } from "react";

// import Button from "@material-ui/core/Button";

// import Card from "@material-ui/core/Card";
// import CardActions from "@material-ui/core/CardActions";
// import CardContent from "@material-ui/core/CardContent";
// import CardMedia from "@material-ui/core/CardMedia";
// import CssBaseline from "@material-ui/core/CssBaseline";
// import Grid from "@material-ui/core/Grid";

// import Typography from "@material-ui/core/Typography";
// import { makeStyles } from "@material-ui/core/styles";
// import Container from "@material-ui/core/Container";
// import { Link } from "react-router-dom";

// import StudentAppbar from "../Components/Student/StudentAppbar";

// import { cards } from "../Const/studentCardList";
// import { withStyles } from "@material-ui/core/styles";
// import CardActionArea from '@material-ui/core/CardActionArea';
// import MaterialImage from '../images/material.jpg';
// import { Divider } from "@material-ui/core";
// import QuizImage from "../images/quiz.jpg";
// import ResultImage from '../images/result.jpeg';

// import FeedbackImage from '../images/feedback.jpg';
// import axios from "axios";

// const styles = {
//   root: {
//     flexGrow: 1
//   },
//   grow: {
//     flexGrow: 1
//   },
//   menuButton: {
//     marginLeft: -12,
//     marginRight: 20
//   },
//   media: {
//     height: '140px'
//   }
// };

// class StudentDashboard extends Component {
//   state = {
//     level: ""
//   };

//   componentDidMount() {
//     let data = localStorage.getItem("usertoken");

//     console.log(data);
//     let headers = {
//       headers: {
//         Authorization: `bearer ${data}`
//       }
//     };
//     axios
//       .get(`http://157.230.174.240:3006/api/v1/user/getuserbytoken`, headers)
//       .then(response => {
//         console.log("response", response);
//         this.setState({ level: response.data.data.clearedlevel,feedback:response.data.data.feedback });
//         console.log("getch state data", this.state.level);
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   }

//   handleLogout = () => {
//     let data = localStorage.getItem("usertoken");

//     console.log(data);
//     let headers = {
//       headers: {
//         Authorization: `bearer ${data}`
//       }
//     };

//     axios
//       .get(`http://157.230.174.240:3006/api/v1/user/logout`, headers)
//       .then(response => {
//         console.log("response", response);

//         if (response.data.flag === true) {
//           this.setState({ backtoDash: true });
//           localStorage.removeItem("usertoken");
//         }
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   };

//   render() {
//     const { classes } = this.props;
//     console.log(this.state);
//     //  console.log("props",this.props.props);
//     // const classes = useStyles();
//     return (
//       <React.Fragment>
//         <CssBaseline />
//         <StudentAppbar />
//         <main>
//           {/* Hero unit */}
//           {/* className={classes.heroContent} */}
//           <div>
//             <Container maxWidth="sm">
//               <Typography
//                 component="h1"
//                 variant="h2"
//                 align="center"
//                 color="textPrimary"
//                 gutterBottom
//               >
//                 Student Workfield
//               </Typography>
//               <Typography
//                 variant="h5"
//                 align="center"
//                 color="textSecondary"
//                 paragraph
//               >
//                 Student can read material about study and their intrested feild
//                 documetns and also give a test of quiz according to his leval as
//                 they cleared and check their result of test Giive us feedback
//                 about working experience with us.
//               </Typography>
//             </Container>
//           </div>
//           {/* className={classes.cardGrid} */}
//           <Container maxWidth="md">
//             {/* End hero unit */}
//             <Grid container spacing={6}>

//               <Card className={classes.card} style={{ width: '370px', margin: '12px 0' }}>
//                 <CardActionArea>
//                   <CardMedia
//                     className={classes.media}
//                     image={MaterialImage}
//                     title="Contemplative Reptile"
//                   />
//                   <CardContent>
//                     <Typography gutterBottom variant="h5" component="h2">
//                       Material
//                     </Typography>
//                     <Typography component="p">
//                       This reading material will help you to clear the exams. <br/>
//                       It's important to understand the road rules wherever your journey takes you.
//                     </Typography>
//                   </CardContent>
//                 </CardActionArea>
//                 <Divider />
//                 <CardActions>
//                 <a target="_blank" href={""} style={{ textDecoration: 'unset' }}>
//                   <Button size="small" color="primary" >
//                       Download
//                   </Button>
//                 </a>
//                 </CardActions>
//                 </Card>
//                 <Card className={classes.card} style={{ width: '370px', margin: '12px 0 0 20px' }}>
//                 <CardActionArea>
//                   <CardMedia
//                     className={classes.media}
//                     image={QuizImage}
//                     title="Contemplative Reptile"
//                   />
//                   <CardContent>
//                     <Typography gutterBottom variant="h5" component="h2">
//                       Quiz
//                     </Typography>
//                     <Typography component="p">
//                       Lets try Quiz and Complete the test <br/>
//                       It's important to passes all level.
//                     </Typography>
                    
//                   </CardContent>
//                 </CardActionArea>
//                 <Divider />
//                 <CardActions>
//                   {this.state.level === 3 ? (
//                     <Typography component="p">
//                     You have cleared all levels
//                   </Typography>
//                ) :  (
//                 <Link to="/quiz" style={{ textDecoration: 'unset' }}>
//                 <Button size="small" color="primary" >
            
//                 Take Quiz Level: {this.state.level + 1}
//                 </Button>
//                 </Link>
//                   )}

//                 </CardActions>
                
//               </Card>
//               <Card className={classes.card} style={{ width: '370px', margin: '12px 0 ' }}>
//                 <CardActionArea>
//                   <CardMedia
//                     className={classes.media}
//                     image={ResultImage}
//                     title="Contemplative Reptile"
//                   />
//                   <CardContent>
//                     <Typography gutterBottom variant="h5" component="h2">
//                      Result
//                     </Typography>
//                     <Typography component="p">
//                      Your result is show your level 
//                      and week part of your 
//                     </Typography>
//                   </CardContent>
//                 </CardActionArea>
//                 <Divider />
//                 <CardContent>
                   
//                     <Typography component="h6">
//                     {this.state.level === 2 ? `You have cleared all levels.`:  `You've cleared level: ${this.state.level}` }
//                     </Typography>
//                   </CardContent>
//                 {/* <CardActions>
//                 <a target="_blank" href={""} style={{ textDecoration: 'unset' }}>
//                   <Button size="small" color="primary" >
//                       See Result 
//                   </Button>
//                 </a>
//                 </CardActions> */}
                
//               </Card>
//               <Card className={classes.card} style={{ width: '370px', margin: '12px 0 0 20px' }}>
//                 <CardActionArea>
//                   <CardMedia
//                     className={classes.media}
//                     image={FeedbackImage}
//                     title="Contemplative Reptile"
//                   />
//                   <CardContent>
//                     <Typography gutterBottom variant="h5" component="h2">
//                       Feedback
//                     </Typography>
//                     <Typography component="p">
//                      Feedback is useful to improving and be efficient
//                      in the test.
//                     </Typography>
//                     <Divider />
//                     <CardContent>
//                     <Typography component="h6">
//                     {Boolean(this.state.feedback) ? `Your feedback is:${this.state.feedback}` : "You don't have  any feedback." }
//                     </Typography>

//                     </CardContent>
                   
//                   </CardContent>
//                 </CardActionArea>
                
                
//                 {/* <CardActions>
//                 <a target="_blank" href={""} style={{ textDecoration: 'unset' }}>
//                   <Button size="small" color="primary" >
//                      See Your Feedback
//                   </Button>
//                 </a>
//                 </CardActions> */}
                
//               </Card>

//               {/* {cards.map((card, i) => (
//                 <Grid item key={i} xs={12} sm={6} md={4}>
//                   {/* className={classes.card} 
//                   <Card>
                
//                     <CardMedia
//                         className={classes.media}
//                         image={Quizimage}
//                       title="Image title"
//                     />
              
//                     <CardContent>
//                       <Typography gutterBottom variant="h5" component="h2">
//                         {card.title}
//                       </Typography>
//                       <Typography>
//                         {card.description}{" "}
//                         {card.type ? (
//                           this.state.level === 0 ? (
//                             <div>You have not cleared Any Level </div>
//                           ) : (
//                             <div>You have cleared {this.state.level} </div>
//                           )
//                         ) : null}{" "}
//                       </Typography>
//                     </CardContent>
//                     <Divider />
//                     <CardActions>
//                       <Link to={`${card.pathname}`}>
//                         <Button size="small" color="primary">
//                           view
//                         </Button>
//                       </Link>
//                     </CardActions>
//                   </Card>
//                 </Grid>
//               ))} */}
//             </Grid>
//           </Container>
//         </main>
//       </React.Fragment>
//     );
//   }
// }

// export default withStyles(styles)(StudentDashboard);
