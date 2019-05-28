import  React , {Component} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link} from 'react-router-dom'
import { Redirect} from 'react-router-dom';
import StudentAppbar from '../Components/Student/StudentAppbar';

import {cards} from '../Const/studentCardList';

import axios from 'axios';

const useStyles = makeStyles(theme => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },    
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

class Quiz extends Component {
 
     
   handleLogout = () => {
    let data = localStorage.getItem("usertoken")
           
    console.log(data)
     let headers = {
       headers: {
        Authorization: `bearer ${data}`
       }
        
     } 
  


    axios.get(`http://157.230.174.240:3006/api/v1/user/logout`,headers)
    .then(response => {
      console.log("response",response);
     
    
      if(response.data.flag === true ) {
    
        this.setState({backtoDash : true});
        localStorage.removeItem("usertoken")
      }
    })
    .catch(error => {
      console.log(error);
    });
  }

  render() {
   
    // const classes = useStyles();
    return (
         <React.Fragment>
    <CssBaseline />
    <StudentAppbar/>
    <main>
      {/* Hero unit */}
      {/* className={classes.heroContent} */}
      <div >
        <Container maxWidth="sm">
          <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
            Student Workfield
          </Typography>
          <Typography variant="h5" align="center" color="textSecondary" paragraph>
            Student can read material about study and their intrested feild documetns and also give a test of quiz according
            to his leval as they cleared and check their result of test
            Giive us feedback about working experience with us.
          </Typography>
         
        </Container>
      </div>
      {/* className={classes.cardGrid} */}
      <Container  maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={6}>
          {cards.map((card,i) => (
            <Grid item key={i} xs={12} sm={6} md={4}>
              {/* className={classes.card} */}
              <Card >
              {/* className={classes.cardMedia} */}
                <CardMedia
                 
                  image="https://source.unsplash.com/book"
                  title="Image title"
                />
                {/* className={classes.cardContent} */}
                <CardContent >
                  <Typography gutterBottom variant="h5" component="h2">
                   {card.title}
                  </Typography>
                  <Typography>
                   {card.description}
                  </Typography>
                </CardContent>
                <CardActions>
                 <Link to={`${card.pathname}`}><Button size="small" color="primary">
                    View 
                  </Button>
                </Link>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </main>
   
   
  </React.Fragment>
    )
  }
}



export default Quiz;










