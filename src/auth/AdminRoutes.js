import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAuth } from './auth';
const AdminRoutes = ({ component: Component, ...rest }) => {
  const { role } = JSON.parse(localStorage.getItem('data'));
  const userJwt = localStorage.getItem('jwt');
  return (
    <Route
      {...rest}
      render={(props) =>
        userJwt && role === 'admin' ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        )
      }
    />
  );
};
export default AdminRoutes;
