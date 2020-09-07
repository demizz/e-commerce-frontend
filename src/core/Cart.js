import React, { useState, useEffect } from 'react';
import Layout from './Layout';
import { Link } from 'react-router-dom';
import Card from './Card';
import { getCart } from './cartHelpers';
import Checkout from './Checkout';

const Cart = (props) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getCart());
  }, []);
  const showItems = (items) => {
    return (
      <div>
        <h2> your cart has{`${items.length}`} items </h2>
        <hr />
        {items.map((product, key) => (
          <Card
            key={product._id}
            product={product}
            cartUpdate={true}
            showAddCartButton={true}
            showRemoveProduct={true}
          />
        ))}
      </div>
    );
  };
  const noItemsMessage = () => (
    <h2>
      Your cart is empty .<br />
      <Link to="/shop">Continue Shopping</Link>
    </h2>
  );
  return (
    <Layout
      title="Shopping Cart"
      className="container-fluid"
      description="Manage your cart items.add remove checkout or continue shopping"
    >
      <div className="row">
        <div className="col-6">
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>
        <div className="col-6">
          <h2 className="mb-4">Your cart Summary</h2>
          <hr />
          <Checkout products={items} />
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
