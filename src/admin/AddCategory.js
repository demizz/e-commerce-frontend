import React, { useState } from 'react';
import Layout from '../core/Layout';
import { isAuth } from '../auth/auth';
import { Link } from 'react-router-dom';
import { createCategory } from './apiAdmin';
import axios from 'axios';

const AddCategory = (props) => {
  const [categoryName, setCategoryName] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);

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
      const res = await axios({
        url: `http://127.0.0.1:8000/api/v1/category/create/${userData.userId}`,
        method: 'POST',
        data: { name: categoryName },
        headers: {
          Authorization: 'Bearer ' + jwt,
        },
      });
      console.log(res);
      if (res.data.status === 'success') {
        setError(false);
        setSuccess(true);
      }
    } catch (err) {
      setError(true);
      setErrorMessage(err.response.data.message);
      console.log(err.response.data.message);
    }
  };
  const showSuccess = () => {
    if (success) {
      return <h3 className="text-success">{categoryName} is created</h3>;
    }
  };
  const showError = () => {
    if (error) {
      return <h3 className="text-danger">{errorMessage} </h3>;
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
          {showSuccess()}
          {showError()}
          {newCategoryForm()}
        </div>
      </div>
    </Layout>
  );
};
export default AddCategory;
