import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Login from "./admin/login";
import DepartmentListDetail from "./department/department-list-detail";
import DepartmentList from "./department/department-list";
import EmployeeListDetail from "./employee/employee-list-detail";
import EmployeeList from "./employee/employee-list";
import AdminList from "./admin/admin-list";
import ChangePassword from "./admin/changePassword";

function App() {
  const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("token") ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <PrivateRoute exact path="/admin-list" component={AdminList} />
        <PrivateRoute exact path="/changepassword" component={ChangePassword} />
        <PrivateRoute
          exact
          path="/department-list-detail/:id"
          component={DepartmentListDetail}
        />
        <PrivateRoute
          exact
          path="/department-list"
          component={DepartmentList}
        />
        <PrivateRoute
          exact
          path="/employee-list-detail/:id"
          component={EmployeeListDetail}
        />
        <PrivateRoute exact path="/employee-list" component={EmployeeList} />
      </Switch>
    </Router>
  );
}

export default App;
