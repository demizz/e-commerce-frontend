import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuth } from '../auth/auth';
import { Link, useParams, Redirect } from 'react-router-dom';
import axios from 'axios';

const UpdateProduct = (props) => {
  const { productId } = useParams();
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
    redirectToProfile: false,
    formData: null,
  });
  const {
    name,
    description,
    price,
    categories,
    errorMessage,
    category,
    shipping,
    quantity,

    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData,
  } = values;
  const { jwt, userData } = isAuth();
  const handleChange = (name) => (event) => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value;
    setValues({ ...values, [name]: value });
    formData.set(name, value);
  };
  const getProduct = async () => {
    setValues({ ...values, loading: true });
    try {
      const res = await axios({
        url: `${process.env.REACT_APP_BACKEND_URL}/product/${productId}`,
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + jwt,
        },
      });
      if (res.data.status === 'success') {
        setValues({
          ...values,
          name: res.data.product.name,
          description: res.data.product.description,
          price: res.data.product.price,
          category: res.data.product.category,
          shipping: res.data.product.shipping,
          quantity: res.data.product.quantity,
          formData: new FormData(),
        });
        findCategory();
      }
    } catch (err) {
      setValues({
        ...values,
        error: true,
        errorMessage: err.response.data.message,
        loading: false,
      });
    }
  };

  const findCategory = async () => {
    try {
      const res = await axios({
        url: `${process.env.REACT_APP_BACKEND_URL}/category/all`,
      });
      if (res.data.status === 'success') {
        setValues({
          categories: res.data.category,
          loading: false,
          formData: new FormData(),
        });
      }
    } catch (err) {
      setValues({
        ...values,
        error: true,
        errorMessage: err.response.data.message,
        loading: false,
      });
    }
  };

  const clickSubmit = async (event) => {
    event.preventDefault();
    setValues({ ...values, loading: true, error: false, errorMessage: '' });

    try {
      const res = await axios({
        url: `${process.env.REACT_APP_BACKEND_URL}/product/${productId}/${userData._id}`,
        method: 'PUT',
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
          redirectToProfile: true,
        });
      }
    } catch (err) {
      setValues({
        ...values,
        error: true,
        errorMessage: err.response.data.message,
        loading: false,
      });
    }
  };

  useEffect(() => {
    getProduct();
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
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>
        <button className="btn btn-outline-primary">update Product</button>
      </form>
    );
  };
  const redirectUser = () => {
    if (redirectToProfile) {
      if (!error) {
        return <Redirect to="/admin/products" />;
      }
    }
  };
  const showError = () => {
    if (error && !loading) {
      return (
        <div
          className="alert alert-danger"
          style={{ display: error ? '' : 'none' }}
        >
          {errorMessage}
        </div>
      );
    }
  };
  const showSuccess = () => {
    return (
      <div
        className="alert alert-info"
        style={{ display: createdProduct ? '' : 'none' }}
      >
        <h2>{`${createdProduct} is updated`}</h2>
      </div>
    );
  };

  const showLoading = () => {
    if (loading && !error) {
      return (
        <div className="alert alert-success">
          <h2>Loading ...</h2>
        </div>
      );
    }
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
          {redirectUser()}
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
