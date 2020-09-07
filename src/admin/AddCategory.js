import React, { useState } from 'react';
import Layout from '../core/Layout';
import { isAuth } from '../auth/auth';

import axios from 'axios';

const AddCategory = (props) => {
  const [categoryName, setCategoryName] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [waiting, setWaiting] = useState(false);

  const { jwt, userData } = isAuth();

  const handleChange = (e) => {
    setError(false);
    setErrorMessage('');
    setCategoryName(e.target.value);
  };
  const clickSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    setSuccess(false);

    try {
      setWaiting(true);
      const res = await axios({
        url: `http://127.0.0.1:8000/api/v1/category/create/${userData.userId}`,
        method: 'POST',
        data: { name: categoryName },
        headers: {
          Authorization: 'Bearer ' + jwt,
        },
      });

      if (res.data.status === 'success') {
        setError(false);
        setSuccess(true);
        setWaiting(false);
      }
    } catch (err) {
      setError(true);
      setErrorMessage(err.response.data.message);
      setWaiting(false);
    }
  };
  const showSuccess = () => {
    if (success) {
      return (
        <h3 className="bg-success d-block mb-4 p-2">
          {categoryName} is created
        </h3>
      );
    }
    setTimeout(() => {
      setSuccess(false);
    }, 5000);
  };
  const showError = () => {
    if (error) {
      return <h3 className="bg-danger d-block mb-4 p-2">{errorMessage} </h3>;
    }
  };
  const showWaiting = () => {
    if (waiting && !error && !success) {
      return <h2 className="bg-info d-block mb-4 p-2">Waiting ....</h2>;
    }
  };
  const newCategoryForm = () => {
    return (
      <form onSubmit={clickSubmit}>
        <div className="form-group">
          <label className="text-muted">Name</label>
          <input
            type="text"
            className="form-control"
            onChange={handleChange}
            value={categoryName}
            autoFocus
            required
          />
        </div>
        <button className="btn btn-outline-primary ">Create Category</button>
      </form>
    );
  };
  return (
    <Layout
      title="Add new category"
      description={`Hi ${userData.name} ready to add a new category`}
      className="container"
    >
      <div className="row">
        <div className="col-8 offset-md-2">
          {showWaiting()}
          {showSuccess()}
          {showError()}
          {newCategoryForm()}
        </div>
      </div>
    </Layout>
  );
};
export default AddCategory;
