import React from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { logout } from '../../auth/auth';
import { itemTotal } from '../cartHelpers';
const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return {
      color: '#ff9900',
    };
  } else {
    return {
      color: '#ffffff',
    };
  }
};
const Menu = (props) => {
  const jwt = localStorage.getItem('jwt');
  const user = JSON.parse(localStorage.getItem('data'));
  const history = useHistory();
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary ">
        <ul className="navbar-nav  mr-auto">
          <li className="nav-item mr-4 ">
            <Link
              className="nav-link"
              style={isActive(props.history, '/')}
              to="/"
            >
              Home{' '}
            </Link>{' '}
          </li>{' '}
          <li className="nav-item mr-4">
            <Link
              className="nav-link"
              style={isActive(props.history, '/shop')}
              to="/shop"
            >
              Shop{' '}
            </Link>{' '}
          </li>{' '}
          <li className="nav-item mr-4">
            <Link
              className="nav-link"
              style={isActive(props.history, '/cart')}
              to="/cart"
            >
              Cart{' '}
              <sup>
                <small className="cart-badge"> {itemTotal()} </small>{' '}
              </sup>{' '}
            </Link>{' '}
          </li>{' '}
          {jwt && user.role === 'user' && (
            <li className="nav-item mr-4">
              <Link
                className="nav-link"
                style={isActive(history, '/dashboard')}
                to="/user/dashboard"
              >
                Dashboard{' '}
              </Link>{' '}
            </li>
          )}{' '}
          {jwt && user.role === 'admin' && (
            <li className="nav-item mr-4">
              <Link
                className="nav-link"
                style={isActive(history, '/dashboard')}
                to="/admin/dashboard"
              >
                Dashboard{' '}
              </Link>{' '}
            </li>
          )}{' '}
        </ul>{' '}
        <ul className="navbar-nav  ml-auto">
          {!jwt && (
            <li className="nav-item mr-4">
              <Link
                className="nav-link"
                style={isActive(props.history, '/signup')}
                to="/signup"
              >
                Signup{' '}
              </Link>{' '}
            </li>
          )}
          {!jwt && (
            <li className="nav-item ">
              <Link
                className="nav-link"
                style={isActive(props.history, '/login')}
                to="/login"
              >
                Login{' '}
              </Link>{' '}
            </li>
          )}{' '}
          {jwt && (
            <li className="nav-item ">
              <Link
                className="nav-link"
                style={{
                  cursor: 'pointer',
                  color: '#ffffff',
                }}
                to="/login"
                onClick={() =>
                  logout(() => {
                    history.push('/');
                  })
                }
              >
                Logout{' '}
              </Link>{' '}
            </li>
          )}
        </ul>{' '}
      </nav>
    </div>
  );
};

export default withRouter(Menu);
