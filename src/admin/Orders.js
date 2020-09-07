import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../core/Layout';
const Orders = (props) => {
  const userData = localStorage.getItem('data');
  const jwt = localStorage.getItem('jwt');
  const [orders, setOrders] = useState([]);
  const [statusValues, setStatusValues] = useState([]);
  const loadOrders = async () => {
    try {
      const res = await axios({
        url: `http://127.0.0.1:8000/api/v1/order/list/${userData._id}`,
        headers: {
          authorization: 'Bearer ' + jwt,
        },
      });
      if (res.data.status === 'success') {
        setOrders(res.data.list);
      }
    } catch (err) {}
  };
  const getStatusValues = async () => {
    try {
      const res = await axios({
        url: `http://127.0.0.1:8000/api/v1/order/status-values/${userData._id}`,
        headers: {
          authorization: 'Bearer ' + jwt,
        },
      });
      if (res.data.status === 'success') {
        setStatusValues(res.data.result);
      }
    } catch (err) {}
  };
  useEffect(() => {
    loadOrders();
    getStatusValues();
  }, []);
  const showOrdersLength = () => {
    if (orders.length > 0) {
      return (
        <h1 className="text-danger display-2">TotalOrders:{orders.length}</h1>
      );
    } else {
      return <h1 className="text-danger"> no Orders</h1>;
    }
  };
  const showInput = (key, value) => {
    return (
      <div className="input-group mb-2 mr-sm-2">
        <div className="input-group-prepend">
          <div className="input-group-text">{key}</div>
          <input type="text" value={value} className="form-control" readOnly />
        </div>
      </div>
    );
  };
  const handleStatusChange = async (event, orderId) => {
    try {
      const res = await axios({
        url: `http://127.0.0.1:8000/api/v1/order/update-order/${orderId}/${userData._id}`,
        method: 'PUT',
        headers: {
          authorization: 'Bearer ' + jwt,
        },
        data: {
          status: event.target.value,
        },
      });
      if (res.data.status === 'success') {
        loadOrders();
      }
    } catch (err) {}
  };
  const showStatus = (item) => {
    return (
      <div className="fom-group">
        <h3 className="mark mb-4">Status :{item.status}</h3>
        <select
          className="form-control"
          onChange={(event) => handleStatusChange(event, item._id)}
        >
          <option>Update Status</option>
          {statusValues.map((status, key) => {
            return (
              <option key={status} value={status}>
                {status}
              </option>
            );
          })}
        </select>
      </div>
    );
  };
  return (
    <Layout title="Orders" descripition="you can manage all orders here">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showOrdersLength()}
          {orders.map((item, key) => {
            return (
              <div
                className="mt-5"
                key={item._id}
                style={{ borderBottom: '5px solid indigo' }}
              >
                <h2 className="mb-5">
                  <span className="bg-primary">Order ID :{item._id}</span>
                </h2>
                <ul className="list-group mb-2">
                  <li className="list-group-item">{showStatus(item)}</li>

                  <li className="list-group-item">Transaction ID : </li>
                  <li className="list-group-item">Amount :{item.amount}</li>
                  <li className="list-group-item">
                    Orderd By :{item.user.name}
                  </li>
                  <li className="list-group-item">
                    Order On :{item.createdAt}
                  </li>
                  <li className="list-group-item">
                    Delivery address: {item.address}
                  </li>
                </ul>
                <h3 className="mt-4 mb-4 font-italic">
                  Total products in the order : {item.products.length}
                </h3>
                {item.products.map((p, key) => {
                  return (
                    <div
                      className="mb-4"
                      key={p._id}
                      style={{ padding: '20px', border: '1px solid indigo' }}
                    >
                      {showInput('Product name', p.name)}
                      {showInput('Product price', p.price)}
                      {showInput('Product total', p.count)}
                      {showInput('Product ID', p._id)}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
