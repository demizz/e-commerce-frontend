import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { useParams, Redirect } from 'react-router-dom';
import axios from 'axios';
const UserProfile = (props) => {
  const [info, setInfo] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    errorMessage: '',
    error: false,
    loading: false,
    success: false,
  });
  const {
    name,
    currentPassword,
    email,
    error,
    success,
    errorMessage,
    loading,
    newPassword,
  } = info;
  const jwt = localStorage.getItem('jwt');
  const userId = useParams();

  const init = async () => {
    setInfo({
      ...info,
      loading: true,
    });
    try {
      const res = await axios({
        url: `${process.env.REACT_APP_BACKEND_URL}/user/${userId.userId}`,
        headers: {
          Authorization: 'Bearer ' + jwt,
        },
      });
      if (res.data.status === 'success') {
        setInfo({
          ...info,
          name: res.data.user.name,

          email: res.data.user.email,

          loading: false,
        });
      }
    } catch (err) {
      setInfo({
        ...info,
        errorMessage: err.response.data.message,
        error: true,
        loading: false,
        success: false,
      });
    }
  };
  const sendUpdateRequest = async (name, email, password) => {
    setInfo({
      ...info,
      loading: true,
      success: false,
      error: false,
      errorMessage: '',
    });
    try {
      const res = await axios({
        url: `${process.env.REACT_APP_BACKEND_URL}/user/update/${userId.userId}`,
        method: 'PUT',
        headers: {
          Authorization: 'Bearer ' + jwt,
        },
        data: { name, currentPassword, newPassword, email },
      });
      if (res.data.status === 'success') {
        setInfo({
          ...info,
          name: res.data.updatedUser.name,
          email: res.data.updatedUser.email,
          success: true,
          loading: false,
        });
        localStorage.setItem('data', JSON.stringify(res.data.updatedUser));
      }
    } catch (err) {
      setInfo({
        ...info,
        errorMessage: err.response.data.message,
        loading: false,
        error: true,
        success: false,
      });
    }
  };

  useEffect(() => {
    init();
  }, []);
  const redirectUser = (val) => {
    if (val === true) {
      return <Redirect to="/cart" />;
    }
  };
  const handleChange = (name) => (e) => {
    setInfo({ ...info, [name]: e.target.value, error: '' });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    sendUpdateRequest(name, email, currentPassword, newPassword);
  };
  const profileUpdate = (name, email, password) => {
    return (
      <form>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            type="text"
            onChange={handleChange('name')}
            className="form-control"
            value={name}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Email</label>
          <input
            type="text"
            onChange={handleChange('email')}
            className="form-control"
            value={email}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Current password</label>
          <input
            type="password"
            onChange={handleChange('currentPassword')}
            className="form-control"
            value={currentPassword}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">New password</label>
          <input
            type="password"
            onChange={handleChange('newPassword')}
            className="form-control"
            value={newPassword}
          />
        </div>
        <button
          onClick={handleSubmit}
          className="btn btn-primary btn-block mb-4"
        >
          Update
        </button>
      </form>
    );
  };
  const showLoading = () => {
    if (loading && !error && !success) {
      return <div className="alert alert-info">Loading ...</div>;
    }
  };
  const showError = () => {
    if (error && !loading && !success) {
      return <div className="alert alert-danger">{errorMessage}</div>;
    }
  };
  const showSuccess = () => {
    if (!error && !loading && success) {
      return (
        <div className="alert alert-success">
          your profile has been updated successfully
        </div>
      );
    }
  };
  return (
    <Layout
      title="Profile"
      description="Update Your Profile"
      className="container-fluid"
    >
      <h2>Profile </h2>
      {showError()}
      {showSuccess()}
      {showLoading()}
      {profileUpdate(name, email, currentPassword, newPassword)}
      {redirectUser(success)}
    </Layout>
  );
};

export default UserProfile;
