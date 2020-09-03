import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { URL } from '../config';
import Card from './Card';
import axios from 'axios';
const Home = (props) => {
  const [productBySell, setProductBySell] = useState([]);
  const [productByArrival, setProductByArrival] = useState([]);
  const [error, setError] = useState(false);
  const loadProductBySell = async () => {
    try {
      const res = await axios({
        url: `http://127.0.0.1:8000/api/v1/product/list?sortBy=sold&order=desc&limit=100`,
      });
      if (res.data.status === 'success') {
        console.log(res.data.listProduct);
        setProductBySell(res.data.listProduct);
      }
    } catch (err) {
      setError(err.response.data.message);
    }
  };
  const loadProductByArrival = async () => {
    try {
      const res = await axios({
        url: `http://127.0.0.1:8000/api/v1/product/list?sortBy=createdAt&order=desc&limit=100`,
      });
      if (res.data.status === 'success') {
        setProductByArrival(res.data.listProduct);
      }
    } catch (err) {
      setError(err.response.data.message);
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
      description="Node React E-commerce App"
    >
      <h2 className="mb-4">Best Sellers</h2>
      <div className="row">
        {productBySell.map((item, key) => {
          return <Card key={item._id} product={item} />;
        })}
      </div>

      <h2 className="mb-4">Best Arrivals</h2>
      <div className="row">
        {productByArrival.map((item, key) => {
          return <Card key={item._id} product={item} />;
        })}
      </div>
    </Layout>
  );
};

export default Home;
