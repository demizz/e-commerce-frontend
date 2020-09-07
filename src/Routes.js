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
import Orders from './admin/Orders';
import UserProfile from './users/UserProfile';
import ManageProducts from './admin/ManageProducts';
import UpdateProduct from './admin/UpdateProduct';
import Shop from './core/Shop';
import Product from './core/Product';
import Cart from './core/Cart';
const Routes = () => {
  return (
    <div>
      <Router>
        <Menu />
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>{' '}
          <Route path="/cart" exact>
            <Cart />
          </Route>{' '}
          <Route path="/shop" exact>
            <Shop />
          </Route>{' '}
          <Route path="/signup" exact>
            <Signup />
          </Route>{' '}
          <Route path="/login" exact>
            <Login />
          </Route>{' '}
          <Route path="/product/:productId" exact>
            <Product />
          </Route>
          <PrivateRoute
            path="/user/dashboard"
            exact
            component={UserDashboard}
          />{' '}
          <PrivateRoute path="/profile/:userId" exact component={UserProfile} />{' '}
          <AdminRoutes
            path="/admin/dashboard"
            exact
            component={AdminDashboard}
          />{' '}
          <AdminRoutes path="/create/Category" exact component={AddCategory} />{' '}
          <AdminRoutes path="/admin/orders" exact component={Orders} />{' '}
          <AdminRoutes
            path="/admin/product/update/:productId"
            exact
            component={UpdateProduct}
          />{' '}
          <AdminRoutes
            path="/admin/products"
            exact
            component={ManageProducts}
          />{' '}
          <AdminRoutes path="/create/Product" exact component={AddProduct} />
          <Redirect to="/" />
        </Switch>{' '}
      </Router>{' '}
    </div>
  );
};
export default Routes;
