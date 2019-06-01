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
          </Toolbar>
        </AppBar>
        <div style={{ marginTop: '64px' }}>  
          <SectionCorousel />
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
