import React, { Component } from "react";

import "./App.css";
import { BrowserRouter as Router, Route, withRouter } from "react-router-dom";

import Dashboard from "./Pages/DashboardPage";
import Login from "./Pages/LoginPage";
import Register from "./Pages/RegisterPage";
import Resetpassword from "./Pages/ResetPasswordPage";
import Studentdash from "./Pages/StudentDashboard";

import Admindash from "./Components/Admin/AdminDashboard";

import Adminsurvey from "./Components/Admin/AdminSurvey";
import Adminnews from "./Components/Admin/AdminNews";
import Adminuserdata from "./Components/Admin/AdminUserdata";
import Userquiz from "./Components/Student/Quiz";
// import Addqns from './views/Pages/addquestion';
import Addquiz from "./Components/Admin/AdminQuiz";


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Route path="/" exact component={Dashboard} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/resetpassword" component={Resetpassword} />
          {/* <Route path="/admin" exact component={Admindash} /> */}
          <Route path="/studentdashboard" exact component={Studentdash} />
          {/* <Route path="/profile" exact component={Profile} /> */}
          <Route path="/admin/news" exact component={Adminnews} />
          <Route path="/admin/userdata" exact component={Adminuserdata} />
          <Route path="/admin/survey" exact component={Adminsurvey} />
          <Route path="/quiz" exact component={Userquiz} />
          <Route path="/admin/addquiz" exact component={Addquiz} />
        </div>
      </Router>
    );
  }
}

export default withRouter(App);
