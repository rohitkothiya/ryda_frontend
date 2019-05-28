import React, { Component } from 'react';

import './App.css';
import { BrowserRouter as Router, Route,withRouter} from "react-router-dom";

import Dashboard from './views/Pages/DashboardPage';
import Login from './views/Pages/LoginPage';
import Register from './views/Pages/RegisterPage';
import Resetpassword from './views/Pages/ResetPasswordPage';
import Studentdash from './views/Pages/StudentDashboard';

import Admindash from './views/Components/Admin/AdminDashboard';

import Adminsurvey from './views/Components/Admin/AdminSurvey';
import Adminnews from './views/Components/Admin/AdminNews';
import Adminuserdata from './views/Components/Admin/AdminUserdata';
import Userquiz from './views/Pages/Quiz';
// import Addqns from './views/Pages/addquestion';
import Addquiz from './views/Components/Admin/AddQuestions';




class App extends Component {
  render() {
  
    return (
    
     
              
              <Router >
      <div>

        <Route path="/" exact component={Dashboard} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/resetpassword" component={Resetpassword} />
        <Route path="/admin" exact component={Admindash} />
        <Route path="/studentdashboard" exact component={Studentdash} />
 
        <Route path="/admin/news" exact component={Adminnews} />
        <Route path="/admin/userdata" exact component={Adminuserdata} />
        <Route path="/admin/survey" exact component={Adminsurvey} />
        <Route path="/quiz" exact component={Userquiz} />
        <Route path="/addquiz" exact component={Addquiz} />
      </div>
    </Router>

   
    );
  }
}

export default withRouter(App);



