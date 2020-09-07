import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { URL } from '../config';
import Card from './Card';
import axios from 'axios';
import Search from './Search';
const Home = (props) => {
  const [productBySell, setProductBySell] = useState([]);
  const [productByArrival, setProductByArrival] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const loadProductBySell = async () => {
    try {
      const res = await axios({
        url: `http://127.0.0.1:8000/api/v1/product/list?sortBy=sold&order=desc&limit=100`,
      });
      if (res.data.status === 'success') {
        setProductBySell(res.data.listProduct);
        setLoading(false);
      }
    } catch (err) {
      setError(true);
      setErrorMessage(err.response.data.message);
      setLoading(false);
    }
  };
  const loadProductByArrival = async () => {
    setLoading(true);
    try {
      const res = await axios({
        url: `http://127.0.0.1:8000/api/v1/product/list?sortBy=createdAt&order=desc&limit=100`,
      });
      if (res.data.status === 'success') {
        setProductByArrival(res.data.listProduct);
      }
    } catch (err) {
      setError(true);
      setErrorMessage(err.response.data.message);
      setLoading(false);
    }
  };
  const showLoading = () => {
    if (loading && !error) {
      return <h2 className="alert alert-primary">Loading ...</h2>;
    }
  };
  const showError = () => {
    if (!loading && error) {
      return <h2 className="alert alert-danger">{errorMessage}</h2>;
    }
  };
  useEffect(() => {
    loadProductByArrival();
    loadProductBySell();
  }, []);
  return (
    <Layout
      title="Home Page"
      className="container-fluid"
      description="Web Technologies E-commerce App"
    >
      <Search />
      {showLoading()}
      {showError()}
      {!loading && !error && (
        <React.Fragment>
          <h2 className="mb-4">Best Sellers</h2>
          <div className="row">
            {productByArrival.map((item, key) => {
              return (
                <div key={item._id} className="col-md-4 col-sm-12 mb-3">
                  <Card product={item} />
                </div>
              );
            })}
          </div>
          <h2 className="mb-4">Best Arrival</h2>
          <div className="row">
            {productBySell.map((item, key) => {
              return (
                <div key={item._id} className="col-md-4 col-sm-12 mb-3">
                  <Card product={item} />
                </div>
              );
            })}
          </div>
        </React.Fragment>
      )}
    </Layout>
  );
};

export default Home;
