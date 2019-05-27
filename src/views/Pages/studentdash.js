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

import axios from 'axios';

const cards = [
  {
      title:"Reading Material",
      description:"you can read material about study"
  },
  {
    title:"Quiz",
    description:"Apply for Quiz test according to your leval"
},
{
  title:"Result",
  description:"Check your quiz results"
},
{
  title:"Feedback",
  description:"Give us feedback about quiz"
},
];



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
  state ={
    backtoDash :false
  }
     
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
    if(this.state.backtoDash ) 
    {
     return   <Redirect to="/login" />
    }
   
    // const classes = useStyles();
    return (
         <React.Fragment>
    <CssBaseline />
    <AppBar position="relative" style={{display:"flex",justifyContent:"space-between"}}>
      <Toolbar>
      {/* className={classes.icon}  */}
        <CameraIcon  />
        <Typography variant="h6" color="inherit" noWrap>
          Student Dashboard
        </Typography>
        <Link to={{pathname:'/dashboard'}}><Button color="Primary" onClick={this.handleLogout}>Logout</Button></Link>
      </Toolbar>
    </AppBar>
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
                 
                  image="https://source.unsplash.com/books"
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
                 <Link to={{pathname:"/quiz"}}><Button size="small" color="primary">
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










// class  Register extends Component { 


    


//   render() {
//    
//   return (
//     <React.Fragment>
//     <CssBaseline />
//     <AppBar position="relative">
//       <Toolbar>
//         <CameraIcon className={classes.icon} />
//         <Typography variant="h6" color="inherit" noWrap>
//           Student Dashboard
//         </Typography>
//       </Toolbar>
//     </AppBar>
//     <main>
//       {/* Hero unit */}
//       <div className={classes.heroContent}>
//         <Container maxWidth="sm">
//           <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
//             Student Workfield
//           </Typography>
//           <Typography variant="h5" align="center" color="textSecondary" paragraph>
//             Student can read material about study and their intrested feild documetns and also give a test of quiz according
//             to his leval as they cleared and check their result of test
//             Giive us feedback about working experience with us.
//           </Typography>
         
//         </Container>
//       </div>
//       <Container className={classes.cardGrid} maxWidth="md">
//         {/* End hero unit */}
//         <Grid container spacing={6}>
//           {cards.map((card,i) => (
//             <Grid item key={i} xs={12} sm={6} md={4}>
//               <Card className={classes.card}>
//                 <CardMedia
//                   className={classes.cardMedia}
//                   image="https://source.unsplash.com/books"
//                   title="Image title"
//                 />
//                 <CardContent className={classes.cardContent}>
//                   <Typography gutterBottom variant="h5" component="h2">
//                    {card.title}
//                   </Typography>
//                   <Typography>
//                    {card.description}
//                   </Typography>
//                 </CardContent>
//                 <CardActions>
//                   <Button size="small" color="primary">
//                     View 
//                   </Button>
                
//                 </CardActions>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       </Container>
//     </main>
   
   
//   </React.Fragment>
//   );
//   }
// }



// export default Register;