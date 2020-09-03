import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
const UserDashbord = (props) => {
  const { _id, name, email, role } = JSON.parse(localStorage.getItem('data'));
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
            <Link className="nav-link" to="/profile/update">
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
  const purchaseHistory = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">purchase history</h3>
        <ul className="list-group">
          <li className="list-group-item">history</li>
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
        <div className="col-3">{userLinks()}</div>
        <div className="col-9">
          {userInfo()}
          {purchaseHistory()}
        </div>
      </div>
    </Layout>
  );
};

export default UserDashbord;
