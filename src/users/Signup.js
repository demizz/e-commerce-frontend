import React, { useState } from 'react';
import Layout from '../core/Layout';
import { URL } from '../config.js';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Signup = (props) => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: 'false',
  });
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  const { name, email, password, success, error } = values;

  const submitHandler = async (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    try {
      const res = await axios({
        url: `http://127.0.0.1:8000/api/v1/auth/signup`,
        method: 'POST',
        data: { name, email, password },
      });

      if (res.data.status === 'success') {
        setValues({
          ...values,
          name: '',
          email: '',
          password: '',
          error: '',
          success: true,
        });
      }
    } catch (err) {
      console.log(err.response.data.message);
      setValues({
        ...values,
        error: err.response.data.message,
        success: false,
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
  const showSuccess = () => {
    return (
      <div
        className="alert alert-info"
        style={{ display: success ? '' : 'none' }}
      >
        new Account was created plus try to <Link to="/login">login</Link>
      </div>
    );
  };
  const signUpForm = () => {
    return (
      <form>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            onChange={handleChange('name')}
            type="text"
            className="form-control"
            value={name}
          />
        </div>
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
      title="Signup "
      className="container col-md-8 offset-md-2"
      description="signup to Node React E-commerce App"
    >
      {process.env.REACT_APP_BACKEND_URL}
      {URL}
      {showSuccess()}
      {showError()}
      {signUpForm()}
    </Layout>
  );
};

export default Signup;
