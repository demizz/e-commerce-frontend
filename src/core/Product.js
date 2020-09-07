import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from './Layout';
import { URL } from '../config';
import Card from './Card';
import axios from 'axios';
const Product = (props) => {
  const [product, setProduct] = useState({});
  const [relatedProduct, setRelatedProduct] = useState([]);

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const loadingSingleProduct = async (productId) => {
    try {
      setLoading(true);
      const res = await axios({
        url: `http://127.0.0.1:8000/api/v1/product/${productId}`,
      });
      if (res.data.status === 'success') {
        setProduct(res.data.product);

        listRelated(res.data.product._id);
      }
    } catch (err) {
      setErrorMessage(err.response.data.message);
      setError(true);
      setLoading(false);
    }
  };
  const listRelated = async (pId) => {
    try {
      const res = await axios({
        url: `http://127.0.0.1:8000/api/v1/product/related/${pId}`,
      });
      if (res.data.status === 'success') {
        setRelatedProduct(res.data.relatedProduct);
        setLoading(false);
      }
    } catch (err) {
      setErrorMessage(err.response.data.message);
      setError(true);
      setLoading(false);
    }
  };
  useEffect(() => {
    loadingSingleProduct(params.productId);
  }, [params]);
  const showError = () => {
    if (error && !loading) {
      return <h2 className="alert alert-danger">{errorMessage}</h2>;
    }
  };
  const showLoading = () => {
    if (loading && !error) {
      return <h2 className="alert alert-info">Loading ....</h2>;
    }
  };
  return (
    <Layout
      title={product && product.name}
      description={
        product && product.description && product.description.substring(0, 100)
      }
      className="container-fluid"
    >
      <div className="row">
        <div className="col-md-8">
          {showLoading()}
          {showError()}
          {product && product.description && (
            <Card showViewProductButton={true} product={product} />
          )}
        </div>
        <div className="col-md-4">
          <h4>Related Product</h4>

          {relatedProduct &&
            relatedProduct.map((item, key) => {
              return (
                <div className="mb-3" key={item._id}>
                  <Card product={item} />
                </div>
              );
            })}
        </div>
      </div>
    </Layout>
  );
};

export default Product;
