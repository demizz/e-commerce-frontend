import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import Signup from './users/Signup';
import Login from './users/Login';
import Home from './core/Home';
import Menu from './core/Navigation/Menu';
import UserDashboard from './users/UserDashboard';
import AdminDashboard from './users/AdminDashboard';
import PrivateRoute from './auth/PrivateRoutes';
import AdminRoutes from './auth/AdminRoutes';
import AddCategory from './admin/AddCategory';
import AddProduct from './admin/AddProduct';
import Shop from './core/Shop';

const Routes = () => {
  return (
    <div>
      <Router>
        <Menu />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/shop" exact>
            <Shop />
          </Route>
          <Route path="/signup" exact>
            <Signup />
          </Route>
          <Route path="/login" exact>
            <Login />
          </Route>

          <PrivateRoute
            path="/user/dashboard"
            exact
            component={UserDashboard}
          />
          <AdminRoutes
            path="/admin/dashboard"
            exact
            component={AdminDashboard}
          />
          <AdminRoutes path="/create/Category" exact component={AddCategory} />
          <AdminRoutes path="/create/Product" exact component={AddProduct} />

          <Redirect to="/" />
        </Switch>
      </Router>
    </div>
  );
};
export default Routes;
