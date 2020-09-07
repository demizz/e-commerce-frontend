import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { URL } from '../config';
import Card from './Card';
import axios from 'axios';
import queryString from 'query-string';

const Search = (props) => {
  const [data, setData] = useState({
    categories: [],
    category: '',
    search: '',
    results: [],
    searched: false,
  });
  const { categories, category, search, results, searched } = data;
  const [error, setError] = useState('');
  const getCategories = async () => {
    try {
      const res = await axios({
        url: `${process.env.REACT_APP_BACKEND_URL}/category/all`,
      });
      if (res.data.status === 'success') {
        setData({ ...data, categories: res.data.category });
      }
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const handleChange = (name) => (event) => {
    setData({ ...data, [name]: event.target.value, searched: false });
  };

  const searchSubmit = (event) => {
    event.preventDefault();
    searchData();
  };
  const searchData = async () => {
    if (search && category) {
      const query = queryString.stringify({ search, category });

      try {
        const res = await axios({
          url: `${process.env.REACT_APP_BACKEND_URL}/product/search?${query}`,
        });
        if (res.data.status === 'success') {
          setData({
            ...data,
            results: res.data.list,
            searched: true,
          });
        }
      } catch (err) {}
    }
  };

  const searchForm = () => {
    return (
      <form onSubmit={searchSubmit}>
        <span className="input-group-text">
          <div className="input-group input-group-lg">
            <div className="input-group-prepent">
              <select className="btn mr-2 " onChange={handleChange('category')}>
                <option value="All">ALL</option>
                {categories.map((cat, key) => {
                  return (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  );
                })}
              </select>
            </div>
            <input
              type="search"
              className="form-control"
              onChange={handleChange('search')}
              placeholder="Search by name"
            />
          </div>
          <div className="btn input-group-append" style={{ border: 'none' }}>
            <button className="input-group-text">Search</button>
          </div>
        </span>
      </form>
    );
  };
  const searchMessage = (searched, results) => {
    if (searched && results.length > 0) {
      return `Found ${results.length} product`;
    }
    if (searched && results.length < 1) {
      return ` No Product Found`;
    }
  };
  const searchedProducts = (results = []) => {
    return (
      <div>
        <h2 className="mt-4 mb-4">{searchMessage(searched, results)}</h2>
        <div className="row">
          {results.map((item, key) => (
            <Card key={item._id} product={item} />
          ))}
        </div>
      </div>
    );
  };
  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      <div className="container">{searchForm()}</div>
      <div className="container-fluid mb-3">{searchedProducts(results)}</div>
    </div>
  );
};

export default Search;
