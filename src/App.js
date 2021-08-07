import React from "react";
import axios from "axios";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./pages/login";
import Registration from "./pages/registration";
import Departments from "./pages/dataList/departmentList";
import Employees from "./pages/dataList/employeeList";
import Questions from "./pages/dataList/questionsList";

export function App() {
  axios.defaults.withCredentials = true;
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register" component={Registration} />
        <Route exact path="/departments" exact component={Departments} />
        <Route path="/employees" exact component={Employees} />
        <Route path="/questions" exact component={Questions} />
      </Switch>
    </Router>
  );
}
