import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';

const AdminDashboard = (props) => {
  const { _id, name, email, role } = JSON.parse(localStorage.getItem('data'));
  const adminLinks = () => {
    return (
      <div className="card">
        <h4 className="card-header">Admin Links</h4>
        <ul className="list-group">
          <li className="list-group-item">
            <Link className="nav-link" to="/create/category">
              Create Category
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/create/product">
              Create Product
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/admin/orders">
              list of orders
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/admin/products">
              Manage Products
            </Link>
          </li>
        </ul>
      </div>
    );
  };
  const adminInfo = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">User Information</h3>
        <ul className="list-group">
          <li className="list-group-item">{name}</li>
          <li className="list-group-item">{email}</li>
          <li className="list-group-item">
            {role === 'admin' ? 'admin' : 'Registered User'}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <Layout
      title="User Dashbord"
      description={`Hi ${name}`}
      className="container"
    >
      <div className="row">
        <div className="col-3">{adminLinks()}</div>
        <div className="col-9">{adminInfo()}</div>
      </div>
    </Layout>
  );
};

export default AdminDashboard;
