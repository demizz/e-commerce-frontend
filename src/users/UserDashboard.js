import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import axios from 'axios';
const UserDashbord = (props) => {
  const { _id, name, email, role } = JSON.parse(localStorage.getItem('data'));
  const jwt = localStorage.getItem('jwt');
  const [history, setHistory] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const userLinks = () => {
    return (
      <div className="card">
        <h4 className="card-header">User Links</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/cart">
              My Cart
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to={`/profile/${_id}`}>
              Update Profile
            </Link>
          </li>
        </ul>
      </div>
    );
  };
  const userInfo = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">User Information</h3>
        <ul className="list-group">
          <li className="list-group-item">{name}</li>
          <li className="list-group-item">{email}</li>
          <li className="list-group-item">{role}</li>
        </ul>
      </div>
    );
  };
  const noOrders = () => {
    if (!loading && !error && history.length === 0) {
      return <h2 className="alert alert-info">you have no orders</h2>;
    }
  };
  const purchaseHistory = (list) => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">purchase history</h3>
        <ul className="list-group">
          <li className="list-group-item">
            {noOrders()}
            {history &&
              history.length > 0 &&
              history.map((order, key) => {
                return (
                  <div key={order._id}>
                    {order.products.map((product, key) => {
                      return (
                        <div key={product._id}>
                          <h6 className="text-info">
                            product Name : {product.name}
                          </h6>
                          <h6 className="text-info">
                            product price : {product.price} $
                          </h6>
                          <h6 className="text-info">count : {product.count}</h6>
                        </div>
                      );
                    })}
                    <h6 className="text-info">amount : {order.amount} $ </h6>
                    <h6 className="text-info">
                      created At : {order.createdAt}{' '}
                    </h6>
                    <hr />
                  </div>
                );
              })}{' '}
            <hr />
          </li>
        </ul>
      </div>
    );
  };
  const listOfOrders = async () => {
    setLoading(true);
    try {
      const res = await axios({
        url: `http://127.0.0.1:8000/api/v1/user/orders/by/${_id}`,

        headers: {
          Authorization: 'Bearer ' + jwt,
        },
      });
      if (res.data.status === 'success') {
        setHistory(res.data.listOfOrders);

        setLoading(false);
        setErrorMessage('');
        setError(false);
      }
    } catch (err) {
      setError(true);

      setErrorMessage(err.response.data.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    listOfOrders();
  }, []);
  const showError = () => {
    if (error && !loading) {
      return <h2 className="alert alert-danger">{errorMessage}</h2>;
    }
  };
  return (
    <Layout
      title="User Dashbord"
      description={`Hi ${name}`}
      className="container"
    >
      <div className="row">
        <div className="col-3">{userLinks()}</div>
        <div className="col-9">
          {showError()}

          {userInfo()}
          {purchaseHistory(history)}
        </div>
      </div>
    </Layout>
  );
};

export default UserDashbord;
