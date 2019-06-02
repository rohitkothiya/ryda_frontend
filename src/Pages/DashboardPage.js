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
  }
};

class Dashboard extends Component {
  state = {
    showSurveyForm: false
  };

  handleSurveyform = () => {
    console.log("clicked");
    this.setState({ showSurveyForm: true });
  };

  componentDidMount() {
    axios
      .get(`http://157.230.174.240:3006/api/v1/news/getall`)
      .then(response => {
        console.log("response", response);
        console.log("response data data", response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { classes } = this.props;
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

            <Link to={{ pathname: "/login" }} style={{ textDecoration: 'unset' }}>
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
                  image={logo}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    News
                  </Typography>
                  <Typography component="p">
                    Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                    across all continents except Antarctica
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button size="small" color="primary">
                  View More
                </Button>
              </CardActions>
            </Card>
            <Card className={classes.card} style={{ width: '370px', margin: '12px 0' }}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={logo}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Materials
                </Typography>
                <Typography component="p">
                  Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                  across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button size="small" color="primary">
                Download
              </Button>
            </CardActions>
          </Card>
          <Card className={classes.card} style={{ width: '370px', margin: '12px 0' }}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={logo}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  Survey
                </Typography>
                <Typography component="p">
                  Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                  across all continents except Antarctica
                </Typography>
              </CardContent>
            </CardActionArea>
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
            It's important to understand the road rules wherever your journey takes you. <br/>
            RSE is often asked to clarify common  road rules and this page has a number of links to help.<br/>
            <br/>
            Below are explanations of the road rules we are commonly asked to explain. <br/>
            RSE encourages all road users to treat each other with respect, and remember that <br/>
            the rules talk about ‘giving way’ to other road users, and not who has ‘right of way’.  <br/>
            In fact under the rules no user has ‘right of way’.<br/>
            <br/>
            The Road Safety Road Rules were updated on 1 July 2017. 
            Advice on this page is based on RSE is in the process of updating our information based upon <br/>
            the &nbsp;
            <a target="_blank" href="http://www.legislation.vic.gov.au/domino/Web_Notes/LDMS/LTObject_Store/ltobjst10.nsf/DDE300B846EED9C7CA257616000A3571/1AEF94CB51024A3ACA2582250073051A/$FILE/17-41sra002%20authorised.pdf">
             updated Victorian Road Safety Road Rules 2017 (version 30/1/2018) (534 pages).
            </a><br/>
            For detailed information on the rules, refer to the rules referenced in each section.<br/>
            <br/>
            This information on this website is general information only.  <br/>
            The information is not legal advice, and should not be treated as such. <br/>
            RSE does not provide legal advice to Members or the public in relation to particular incidents and <br/>
            you should not rely on the information on this website as an alternative to legal advice.   <br/>
            If you have any specific questions about any legal matter you should consult a lawyer or other professional legal services provider.
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

          {this.state.showSurveyForm ? (
            <SurveyForm open={this.state.showSurveyForm} />
          ) : null} 
        </div>
      </div>
    );
  }
}
// Dashboard.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(withRouter(Dashboard));
