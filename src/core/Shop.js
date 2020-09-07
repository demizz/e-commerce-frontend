import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import axios from 'axios';
import Checkbox from './Checkbox';
import { prices } from './FixedPrice';
import RadioBox from './RadioBox';

import Card from './Card';
const Shop = (props) => {
  const [data, setData] = useState([]);
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  });
  const [error, setError] = useState(false);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [limit, setLimit] = useState(3);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);
  const getCategories = async () => {
    try {
      const res = await axios({
        url: `${process.env.REACT_APP_BACKEND_URL}/category/all`,
      });
      if (res.data.status === 'success') {
        setData(res.data.category);
      }
    } catch (err) {
      setErrorMessage(err.response.data.message);
      setError(true);
    }
  };

  const handlePrice = (value) => {
    const data = prices;
    let array = [];
    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };
  const loadFilterResult = async (newSkip, newLimit, newFilters) => {
    const data = {
      limit: newLimit,
      skip: newSkip,
      filters: newFilters,
    };
    setLoading(true);
    try {
      const res = await axios({
        url: `${process.env.REACT_APP_BACKEND_URL}/product/by/search`,
        method: 'POST',
        data,
      });
      if (res.data.status === 'success') {
        setFilteredResults(res.data.result);
        setSize(res.data.result.length);
        setLoading(false);
        setSkip(0);
      }
    } catch (err) {
      setErrorMessage(err.response.data.message);
      setError(true);
      setLoading(false);
    }
  };
  const loadMore = async () => {
    let toskip = skip + limit;
    const data = {
      limit,
      skip: toskip,
      filters: myFilters.filters,
    };

    try {
      const res = await axios({
        url: `${process.env.REACT_APP_BACKEND_URL}/product/by/search`,
        method: 'POST',
        data,
      });
      if (res.data.status === 'success') {
        setFilteredResults([...filteredResults, res.data.result]);
        //setSize(res.data.result.length);
        setSkip(toskip);
      }
    } catch (err) {
      setErrorMessage(err.response.data.message);
      setError(true);
    }
  };
  const loadMoreButton = () => {
    return (
      size > 0 &&
      size > limit && (
        <button onClick={loadMore} className="btn btn-warning mb-5 ">
          Load More
        </button>
      )
    );
  };
  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;
    if (filterBy === 'price') {
      let priceValues = handlePrice(filters);

      newFilters.filters[filterBy] = priceValues;
    }
    setMyFilters(newFilters);
    loadFilterResult(skip, limit, myFilters.filters);
  };
  useEffect(() => {
    getCategories();

    loadFilterResult(skip, limit, myFilters.filters);
  }, []);
  const showError = () => {
    if (error && !loading) {
      return <h2 className="alert alert-danger"> {errorMessage}</h2>;
    }
  };
  const showNoResult = () => {
    if (!loading && size === 0) {
      return <h2 className="alert alert-warning btn-block">No result</h2>;
    }
  };
  const showLoading = () => {
    if (!error && loading) {
      return <h2 className="alert alert-primary">...Loading</h2>;
    }
  };
  return (
    <Layout
      title="Shop Page"
      className="container-fluid"
      description="Filter the products and find what you prefer"
    >
      <div className="row">
        <div className="col-4">
          <h4>Categories</h4>
          <ul>
            <Checkbox
              categories={data}
              handleFilters={(filters) => handleFilters(filters, 'category')}
            />
          </ul>
          <h4> Price range</h4>
          <ul>
            <RadioBox
              prices={prices}
              handleFilters={(filters) => handleFilters(filters, 'price')}
            />
          </ul>
        </div>
        <div className="col-8">
          <h2 className="mb-4">Products</h2>
          <div className="row">
            {showNoResult()}
            {showLoading()}
            {showError()}
            {!error &&
              !loading &&
              filteredResults.map((product, key) => (
                <div key={product._id} className="col-md-4 col-sm-12 mb-3">
                  <Card product={product} />
                </div>
              ))}
          </div>
          <hr />
          {loadMoreButton()}
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
