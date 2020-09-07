import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuth } from '../auth/auth';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

const AddProduct = (props) => {
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    categories: [],
    category: '',
    shipping: '',
    quantity: '',
    photo: '',
    loading: false,
    error: false,
    errorMessage: '',
    cretedProduct: '',
    redirectTo: false,
    formData: null,
  });
  const {
    name,
    description,
    price,
    categories,
    category,
    shipping,
    quantity,
    errorMessage,
    loading,
    error,
    createdProduct,
    redirectTo,
    formData,
  } = values;
  const { jwt, userData } = isAuth();
  const handleChange = (name) => (event) => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });

    formData.set(name, value);
  };
  const findCategory = async () => {
    try {
      const res = await axios({
        url: `${process.env.REACT_APP_BACKEND_URL}/category/all`,
      });
      if (res.data.status === 'success') {
        setValues({
          ...values,
          categories: res.data.category,
          formData: new FormData(),
        });
      }
    } catch (err) {
      setValues({
        ...values,
        error: false,
        errorMessage: err.response.data.message,
      });
    }
  };

  const clickSubmit = async (event) => {
    event.preventDefault();
    setValues({
      ...values,
      loading: true,
      error: false,
      errorMessage: '',
      loading: true,
    });

    try {
      const res = await axios({
        url: `${process.env.REACT_APP_BACKEND_URL}/product/create/${userData._id}`,
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + jwt,
        },
        data: formData,
      });

      if (res.data.status === 'success') {
        setValues({
          ...values,
          name: '',
          description: '',
          photo: '',
          price: '',
          quantity: '',
          loading: false,
          createdProduct: res.data.newProduct.name,
          formData: null,
          error: false,
          errorMessage: '',
          redirectTo: true,
        });
      }
    } catch (err) {
      setValues({
        ...values,
        loading: false,
        errorMessage: err.response.data.message,
        error: true,
      });
    }
  };
  useEffect(() => {
    findCategory();
  }, []);

  const newPostForm = () => {
    return (
      <form className="mb-3" onSubmit={clickSubmit}>
        <h4>Post Photo</h4>
        <div className="form-group">
          <label className="btn btn-outline-secondary">
            <input
              onChange={handleChange('photo')}
              type="file"
              name="photo"
              accept="image/*"
            />
          </label>
        </div>
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
          <label className="text-muted">Description</label>
          <textarea
            onChange={handleChange('description')}
            className="form-control"
            value={description}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Price</label>
          <input
            onChange={handleChange('price')}
            type="number"
            className="form-control"
            value={price}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Category</label>
          <select onChange={handleChange('category')} className="form-control">
            <option> please Select</option>

            {categories &&
              categories.map((item, key) => {
                return (
                  <option key={item._id} value={item._id}>
                    {item.name}
                  </option>
                );
              })}
          </select>
        </div>
        <div className="form-group">
          <label className="text-muted">Quantity</label>
          <input
            onChange={handleChange('quantity')}
            type="number"
            className="form-control"
            value={quantity}
          />
        </div>
        <div className="form-group">
          <label className="text-muted">Shipping</label>
          <select
            onChange={handleChange('shipping')}
            type="text"
            className="form-control"
          >
            <option> please Select</option>
            <option value={false}>No</option>
            <option value={true}>Yes</option>
          </select>
        </div>
        <button className="btn btn-outline-primary">Create Product</button>
      </form>
    );
  };
  const redirect = () => {
    if (redirectTo && !loading && !error) {
      return <Redirect to="/admin/products" />;
    }
  };
  const showError = () => {
    return (
      <div
        className="alert alert-danger"
        style={{ display: error ? '' : 'none' }}
      >
        {errorMessage}
      </div>
    );
  };
  const showSuccess = () => {
    return (
      <div
        className="alert alert-success"
        style={{ display: createdProduct ? '' : 'none' }}
      >
        <h2>{`${createdProduct} is created`}</h2>
      </div>
    );
  };

  const showLoading = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading ...</h2>
        </div>
      )
    );
  };
  return (
    <Layout
      title="Add new Product"
      description={`Hi ${userData.name} ready to add a new Product`}
      className="container"
    >
      <div className="row">
        <div className="col-8 offset-md-2">
          {showLoading()}
          {showSuccess()}
          {showError()}
          {newPostForm()}
          {redirect()}
        </div>
      </div>
    </Layout>
  );
};

export default AddProduct;
