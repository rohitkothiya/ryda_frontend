import React, { Component } from "react";
// import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import DirectionsCar from "@material-ui/icons/DirectionsCar";
import { Link, withRouter } from "react-router-dom";
import SurveyForm from "../Components/SurveyForm";
import axios from "axios";
import SectionCorousel from "../Components/SectionCorousel";
import logo from '../images/logo1.jpg';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { IoLogoFacebook, IoLogoInstagram, IoLogoTwitter, IoLogoYoutube } from "react-icons/io";
import SurveyImage from '../images/survey.jpg';
import MaterialImage from '../images/material.jpg';
import NewsImage from '../images/news.jpg';
import { Divider } from "@material-ui/core";
import Newsticker from 'react-newsticker';
const news = [
 { id:"hello how r i"},
 { id:"hello how rsdsdsdsdsds i"},
 { id:"hello how rdsdsdsdsdsdsdsdsdsds i"}
];

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

class Dashboard extends Component {
  state = {
    showSurveyForm: false,
    allNews:[]
  };

  handleSurveyform = () => {
    console.log("clicked");
    this.setState({ showSurveyForm: !this.state.showSurveyForm });
  };

  componentDidMount() {
    axios
      .get(`http://157.230.174.240:3006/api/v1/news/getall`)
      .then(response => {
        console.log("response", response);
        console.log("response data data", response.data.data);
        this.setState({allNews:[...this.state.allNews,...response.data.data]});
        console.log("Fetching News",this.state.allNews)
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { classes } = this.props;
     console.log("state news",this.state.allNews)
   {this.state.allNews.map(itm => console.log(itm.link))}
    const newsObj = this.state.allNews.map(item => item);
    console.log("object news ",newsObj)
    return (
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.appBar}>
          <Toolbar>
            {/* <IconButton
              color="inherit"
              aria-label="Menu"
              style={{ marginRight: '8px' }}
            >
              <DirectionsCar />
            </IconButton> */}
            <img height="48" src={logo} style={{ borderRadius: '6px' }} />
            <Typography variant="h6" color="inherit" className={classes.grow} style={{ marginLeft: '14px' }}>
              Road Safety Education
            </Typography>
            {/* <Button color="Primary" onClick={this.handleSurveyform}>
              Surveyform
            </Button> */}

            <Link to={{ pathname: "/login" }} style={{ textDecoration: 'unset'}} >
              <Button tag={Link} color="Primary">
                <span style={{ color: 'white' }} > Login </span>
              </Button>
            </Link>
            <a href="#aboutus" style={{ textDecoration: 'unset', color: 'white' }}>
              <Button tag={Link} color="Primary">
                <span style={{ color: 'white' }} > About Us </span>
              </Button>
            </a>
            <a href="#contactus" style={{ textDecoration: 'unset', color: 'white' }}>
              <Button tag={Link} color="Primary">
                <span style={{ color: 'white' }} > Contact us </span>
              </Button>
            </a>
            <Link to={{ pathname: "/register" }} style={{ textDecoration: 'unset' }}>
              <Button tag={Link} color="Primary">
                <span style={{ color: 'white' }} > Register now </span>
              </Button>
            </Link>
          </Toolbar>
        </AppBar>
        <div style={{ marginTop: '64px', display: 'flex', flexDirection: 'column' }}>  
          <SectionCorousel />
          <div className="section2">
            <Card className={classes.card} style={{ width: '370px', margin: '12px 4px' }}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={NewsImage}
                  title="Contemplative Reptile"
                />
                <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                    News
                  </Typography>
                   <Newsticker style={{backgroundColor: 'red' }} news={this.state.allNews.map(news =>  {
                     return (
                       <div style={{color:"white",display:"flex",flexDirection:"column",fontSize:"16px",backgroundColor:"#3f98b5",padding:"10px 5px 5px 10px"}}><span >{news.newsstring} </span><br/><a target="_blank" href={news.link}>{news.link} </a> <br/> </div>
                     )
                   })} />
                   
                  {/*
                  <Typography component="p">
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                    across all continents except Antarctica
                  </Typography> */}
                </CardContent>
              </CardActionArea>
              <Divider />
              {/* <CardActions>
                <Button size="small" color="primary">
                  View More
                </Button>'
              </CardActions> */}
            </Card>
            <Card className={classes.card} style={{ width: '370px', margin: '12px 0' }}>
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
          <Card className={classes.card} style={{ width: '370px', margin: '12px 0' }}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={SurveyImage}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Survey
                </Typography>
                <Typography component="p">
                  These surveys provide important input for us. Your opinion is greatly valued.
                </Typography>
              </CardContent>
            </CardActionArea>
            <Divider />
            <CardActions>
              <Button size="small" color="primary" onClick={this.handleSurveyform}>
                Take survey
              </Button>
            </CardActions>
          </Card>
          </div>
          <div id="aboutus" style={{ padding: '5vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
            <h1> About Us </h1>
            <Typography component="p">
              We understand how important it is to have complete transparency about our test creation methods, <br />
              especially since we work with educational non-profit organisations, like schools and libraries.<br />
              Our team of professional writers actually takes the time to look at each state’s driver’s licence manual. <br />
              A test is then created using the information directly from the manual.<br />
              <br/>
              Once a practice test is ready, we triple-check each test before uploading it, <br/>
              to ensure the fewest errors possible. Additionally, once available publically, <br/>
              each question has a button for reporting any issues, and we encourage and appreciate feedback <br/>
              from test-takers, teachers, parents, librarians, or any other parties interested in driver safety. <br/>
              We’re always happy to open a dialogue and correct any concern in a timely manner.<br/>
              <br/>
              We understand how important accuracy is, since we base our tests on driver’s licence manuals, <br/>
              so when manuals are updated, our questions get updated as well. We constantly monitor government websites <br/>
              for every state, and make certain that any test questions affected by a manual’s update are immediately updated on <br/>
              our site, too. We also update the free electronic copy of the state’s driver’s licence manuals on our site, <br/>
              normally within a few days after the official source.<br/>
            </Typography>
          </div>

          <div id="contactus" style={{ padding: '5vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
            <h1> Contact Us </h1>
            <pre>
            RYDA E-Learning, Inc., <br/>
            1466 Limeridge Road East, Hamilton, ON, <br/>
            CA L8W3J9, <br/>
            Telephone: 1-888-392-2170 <br/>
            </pre>
          </div>

          <div className="footer">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow} style={{ marginLeft: '14px' }}>
              @meetpatel
            </Typography>

            <div style={{ display: 'flex' }}>
              <IoLogoFacebook style={{ fontSize: '24px', marginLeft: '16px' }}/>
              <IoLogoInstagram style={{ fontSize: '24px', marginLeft: '16px' }}/>
              <IoLogoTwitter style={{ fontSize: '24px', marginLeft: '16px' }}/>
              <IoLogoYoutube style={{ fontSize: '24px', marginLeft: '16px' }}/>
            </div>
          </Toolbar>
        </div>

         
            <SurveyForm open={this.state.showSurveyForm} closed={this.handleSurveyform} />
        
        </div>
      </div>
    );
  }
}
// Dashboard.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(withRouter(Dashboard));
