import React from 'react';
import { Link, withRouter, useHistory } from 'react-router-dom';
import { logout, isAuth } from '../../auth/auth';

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: '#ff9900' };
  } else {
    return { color: '#ffffff' };
  }
};
const Menu = (props) => {
  const jwt = localStorage.getItem('jwt');
  const user = JSON.parse(localStorage.getItem('data'));
  const history = useHistory();
  return (
    <div>
      <ul className="nav nav-tabs bg-primary">
        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(props.history, '/')}
            to="/"
          >
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link
            className="nav-link"
            style={isActive(props.history, '/shop')}
            to="/shop"
          >
            Shop
          </Link>
        </li>
        {!jwt && (
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(props.history, '/signup')}
              to="/signup"
            >
              Signup
            </Link>
          </li>
        )}

        {!jwt && (
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(props.history, '/login')}
              to="/login"
            >
              Login
            </Link>
          </li>
        )}
        {jwt && (
          <li className="nav-item">
            <Link
              className="nav-link"
              style={{ cursor: 'pointer', color: '#ffffff' }}
              to="/login"
              onClick={() =>
                logout(() => {
                  history.push('/');
                })
              }
            >
              Logout
            </Link>
          </li>
        )}

        {jwt && user.role === 'user' && (
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, '/dashboard')}
              to="/user/dashboard"
            >
              Dashboard
            </Link>
          </li>
        )}
        {jwt && user.role === 'admin' && (
          <li className="nav-item">
            <Link
              className="nav-link"
              style={isActive(history, '/dashboard')}
              to="/admin/dashboard"
            >
              Dashboard
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default withRouter(Menu);
