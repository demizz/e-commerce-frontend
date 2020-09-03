import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import { URL } from '../config.js';
import axios from 'axios';

const Login = (props) => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    redirectToReferrer: false,
  });
  const { email, password, loading, error, redirectToReferrer } = values;
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setValues({
      ...values,
      error: false,
      loading: true,
      redirectToReferrer: false,
    });
    try {
      const res = await axios({
        url: `http://127.0.0.1:8000/api/v1/auth/login`,
        method: 'POST',
        data: { email, password },
      });
      console.log(res.data);
      if (res.data.status === 'succes') {
        if (typeof window !== undefined) {
          localStorage.setItem('jwt', res.data.token);
          console.log('to localStorage', res.data.user);
          localStorage.setItem('data', JSON.stringify(res.data.user));
        }
        setValues({
          ...values,

          success: true,
          loading: false,
          redirectToReferrer: true,
        });
      }
    } catch (err) {
      console.log(err.response.data.message);
      setValues({
        ...values,
        error: err.response.data.message,
        success: false,
        loading: false,
        redirectToReferrer: false,
      });
    }
  };
  const showError = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? '' : 'none' }}
      >
        {error}
      </div>
    );
  };
  const showLoading = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>loading ...</h2>
        </div>
      )
    );
  };
  const redirectUser = () => {
    const user = JSON.parse(localStorage.getItem('data'));
    if (redirectToReferrer) {
      if (user.role === 'admin') {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }
    if (user) {
      return <Redirect to="/" />;
    }
  };
  const signUpForm = () => {
    return (
      <form>
        <div className="form-group">
          <label className="text-muted">Email</label>
          <input
            onChange={handleChange('email')}
            type="email"
            className="form-control"
            value={email}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Password</label>
          <input
            onChange={handleChange('password')}
            type="password"
            className="form-control"
            value={password}
          />
        </div>
        <button onClick={submitHandler} className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  };
  return (
    <Layout
      title="Login "
      className="container col-md-8 offset-md-2"
      description="signup to Node React E-commerce App"
    >
      {process.env.REACT_APP_BACKEND_URL}
      {URL}
      {showLoading()}
      {showError()}
      {signUpForm()}
      {redirectUser()}
    </Layout>
  );
};

export default Login;
