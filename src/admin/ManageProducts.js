import React, { useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

import Layout from '../core/Layout';

const ManageProducts = (props) => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [deletedSuccess, setDeletedSuccess] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const jwt = localStorage.getItem('jwt');
  const userData = JSON.parse(localStorage.getItem('data'));

  const getAllProduct = async () => {
    setLoading(true);
    try {
      const res = await axios({
        url: `http://127.0.0.1:8000/api/v1/product/list`,
        method: 'GET',
      });
      if (res.data.status === 'success') {
        setProducts(res.data.listProduct);

        setLoading(false);
      }
    } catch (err) {
      setError(true);
      setLoading(false);
      setErrorMessage(err.response.data.message);
    }
  };

  const deleteProduct = async (productId) => {
    setLoading(true);
    try {
      const res = await axios({
        url: `http://127.0.0.1:8000/api/v1/product/${productId}/${userData._id}`,
        method: 'DELETE',
        headers: {
          Authorization: 'Bearer ' + jwt,
        },
      });
      if (res.data.status === 'success') {
        setDeletedSuccess(true);
        setRedirect(true);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      setError(true);
      setErrorMessage(err.response.data.message);
    }
  };
  useEffect(() => {
    getAllProduct();
  }, [deletedSuccess]);
  const showError = () => {
    if (error && !loading) {
      return <h2 className="alert alert-danger">{errorMessage}</h2>;
    }
  };
  const showLoading = () => {
    if (!error && loading) {
      return <h2 className="alert alert-info">Loading....</h2>;
    }
  };
  const showDeletingSuccess = () => {
    if (!error && deletedSuccess) {
      setTimeout(() => {
        return <h2 className="alert alert-success">deleted successfully</h2>;
      }, 4000);
    }
  };
  const redirectTo = () => {
    if (redirect) {
      if (!error && deletedSuccess) {
        return <Redirect to="/" />;
      }
    }
  };

  return (
    <Layout
      title="User Dashbord"
      description="Manage your products"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-12">
          <h2 className="text-center">Total : {products.length} product</h2>
          <hr />
          <ul className="list-group">
            {showLoading()}
            {showError()}
            {showDeletingSuccess()}
            {/* {redirectTo()} */}

            {!error &&
              !loading &&
              products.map((p, key) => {
                return (
                  <li
                    key={p._id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div className="row" style={{ width: '100%' }}>
                      <div className="col-4">
                        <strong>{p.name}</strong>
                      </div>
                      <div className="col-4  mr-auto">
                        <Link to={`/admin/product/update/${p._id}`}>
                          <span className="badge badge-warning badge-pill ml-2 mr-2 p-2 d-inline-block">
                            Update
                          </span>{' '}
                        </Link>
                      </div>
                      <div className="col-4 mr-auto">
                        <span
                          onClick={() => deleteProduct(p._id)}
                          className="badge badge-danger badge-pill ml-2 mr-2 p-2 d-inline-block"
                          style={{ cursor: 'pointer' }}
                        >
                          delete{' '}
                        </span>
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default ManageProducts;
