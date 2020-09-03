import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import axios from 'axios';
import Checkbox from './Checkbox';

import Card from './Card';
const Shop = (props) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState();
  const getCategories = async () => {
    try {
      const res = await axios({
        url: `http://127.0.0.1:8000/api/v1/category/all`,
      });
      if (res.data.status === 'success') {
        setData(res.data.category);
      }
    } catch (err) {
      console.log(err.response.data.message);
      setError(err.response.data.message);
    }
  };
  useEffect(() => {
    getCategories();
  }, []);
  return (
    <Layout
      title="Shop Page"
      className="container-fluid"
      description="shearch and ch"
    >
      <div className="row">
        <div className="col-4">
          <h4>Filtred by categories</h4>
          <ul>
            <Checkbox categories={data} />
          </ul>
        </div>
        <div className="col-8">right</div>
      </div>
    </Layout>
  );
};

export default Shop;
