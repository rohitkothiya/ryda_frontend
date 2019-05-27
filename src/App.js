import React, { Component } from 'react';
import Login from './views/Pages/login';
import './App.css';
import { BrowserRouter as Router, Route,withRouter} from "react-router-dom";
import Register from './views/Pages/register';
import Dashboard from './views/Pages/dashboard';
import Admindash from './views/Pages/adminddash';
import Studentdash from './views/Pages/studentdash';
import Adminsurvay from './views/Pages/adminsurvay';
import Adminnews from './views/Pages/adminnews';
import Userdata from './views/Pages/adminregister';
import Userquiz from './views/Pages/quiz';
// import Addqns from './views/Pages/addquestion';
import Addquiz from './views/Pages/addques';

class App extends Component {
  render() {
  
    return (
    
     
              
              <Router >
      <div>
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {/* <li>
              <Link to="/login/">Login</Link>
            </li>
            <li>
              <Link to="/register/">Register</Link>
            </li>
          </ul>
        </nav>  */}

        <Route path="/" exact component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/admin" exact component={Admindash} />
        <Route path="/student" exact component={Studentdash} />
 
        <Route path="/admin/news" exact component={Adminnews} />
        <Route path="/admin/userdata" exact component={Userdata} />
        <Route path="/admin/survey" exact component={Adminsurvay} />
        <Route path="/quiz" exact component={Userquiz} />
        <Route path="/addquiz" exact component={Addquiz} />
      </div>
    </Router>

   
    );
  }
}

export default withRouter(App);



