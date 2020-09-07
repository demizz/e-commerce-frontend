import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import ShowImage from './ShowImage';
import moment from 'moment';
import '../styles.css';
import { addItem, updateItem, removeItem } from './cartHelpers';

const Card = (props) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(props.product.count);
  const showViewButton = () => {
    return (
      !props.showViewProductButton && (
        <button className="btn btn-outline-primary mt-2 mb-2 mr-2">
          View Product
        </button>
      )
    );
  };
  const handleChange = (productId) => (event) => {
    setCount(event.target.value < 1 ? 1 : event.target.value);
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value);
    }
  };
  const showCartUpdateOptions = (cartUpdate) => {
    return (
      cartUpdate && (
        <div className="input-group mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text">Adjust Quantity</span>
          </div>
          <input
            type="number"
            onChange={handleChange(props.product._id)}
            className="form-control"
            value={count}
          />
        </div>
      )
    );
  };
  const addToCart = () => {
    addItem(props.product, () => {
      setRedirect(true);
    });
  };
  const shouldRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };
  const showAddToCartButton = (show) => {
    return (
      !show && (
        <button
          onClick={addToCart}
          className="btn btn-outline-success mt-2 mb-2"
        >
          Add to card
        </button>
      )
    );
  };
  const showRemoveButton = (show) => {
    return (
      show && (
        <button
          onClick={() => removeItem(props.product._id)}
          className="btn btn-outline-danger mt-2 mb-2"
        >
          remove product
        </button>
      )
    );
  };
  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-primary badge-pill">In Stock</span>
    ) : (
      <span className="badge badge-primary badge-pill"> out of stock</span>
    );
  };
  return (
    <div className="card">
      <div className="card-header name text-center">{props.product.name}</div>
      <div className="card-body">
        {shouldRedirect(redirect)}
        <ShowImage item={props.product} />
        <p className="lead mt-2 text-center font-weight-bold">
          {props.product.description.substring(0, 100)}
        </p>
        <p className="bg-success text-warning">
          Price : {props.product.price} ${' '}
        </p>
        <p className="bg-success text-warning">
          Category : {props.product.category && props.product.category.name}
        </p>
        <p className="bg-success text-warning font-italic">
          Added {moment(props.product.createdAt).fromNow()}
        </p>
        {showStock(props.product.quantity)}
        <br />
        <Link to={`/product/${props.product._id}`}>{showViewButton()}</Link>
        {showAddToCartButton(props.showAddCartButton)}
        {showCartUpdateOptions(props.cartUpdate)}
        {showRemoveButton(props.showRemoveProduct)}
      </div>
    </div>
  );
};

export default Card;
