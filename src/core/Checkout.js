import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import DropIn from 'braintree-web-drop-in-react';
import { emptyCart } from './cartHelpers';
const Checkout = (props) => {
  const jwt = localStorage.getItem('jwt');
  const userData = localStorage.getItem('data');
  const [data, setData] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: '',
    instance: {},
    address: '',
  });
  const getTotal = () => {
    return props.products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price;
    }, 0);
  };
  const getBraintreeToken = async () => {
    try {
      const res = await axios({
        url: `${process.env.REACT_APP_BACKEND_URL}/braintree/getToken/${userData._id}`,
        headers: {
          Authorization: 'Bearer ' + jwt,
        },
      });
      if (res.data.status === 'success') {
        setData({ clientToken: res.data.response.clientToken });
      }
    } catch (err) {
      setData({ ...data, error: err.response.data.message });
    }
  };
  const createOrder = async (createOrderData) => {
    try {
      const res = await axios({
        url: `${process.env.REACT_APP_BACKEND_URL}/order/create/${userData._id}`,
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + jwt,
        },
        data: {
          order: createOrderData,
        },
      });
      if (res.data.status === 'success') {
      }
    } catch (err) {}
  };
  const processPayment = async (payment) => {
    try {
      const res = await axios({
        url: `${process.env.REACT_APP_BACKEND_URL}/braintree/payment/${userData._id}`,
        method: 'POST',
        data: payment,
        headers: {
          Authorization: 'Bearer ' + jwt,
        },
      });
      if (res.data.status === 'success') {
        const createOrderData = {
          products: props.products,
          transaction_id: res.data.result.transaction.id,
          amount: res.data.result.transaction.amount,
          address: data.address,
        };
        createOrder(createOrderData);
        setData({ ...data, success: res.data.result.success });
        emptyCart(() => {});
        setData({ ...data, loading: false, success: true });
        //setData({ ...data, clientToken: res.data.response.clientToken });
      }
    } catch (err) {
      setData({ ...data, loading: false });
      // setData({ ...data, error: err.response.data.message });
    }
  };
  const showLoading = (loading) => {
    return loading && <h2>Loading...</h2>;
  };

  const buy = () => {
    setData({ ...data, loading: true });
    let nonce;
    let getNonce = data.instance
      .requestPaymentMethod()
      .then((data) => {
        nonce = data.nonce;

        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getTotal(props.products),
        };
        processPayment(paymentData);
      })
      .catch((error) => {
        setData({ ...data, error: error.message });
      });
  };
  const showError = (error) => (
    <div
      className="alert alert-danger"
      style={{ display: error ? '' : 'none' }}
    >
      {error}
    </div>
  );
  const handleAddress = (e) => {
    setData({ ...data, address: e.target.value });
  };
  const showSuccess = (success) => (
    <div
      className="alert alert-success"
      style={{ display: success ? '' : 'none' }}
    >
      Thanks ! your payment was successful
    </div>
  );
  const showDropIn = () => {
    return (
      <div onBlur={() => setData({ ...data, error: '' })}>
        {data.clientToken !== null && props.products.length > 0 ? (
          <div>
            <div className="form-group mb-3">
              <label className="text-muted">Delivery address:</label>
              <textarea
                onChange={handleAddress}
                className="form-control"
                value={data.address}
                placeholder="Type your delivery address here ..."
              />
            </div>
            <DropIn
              options={{
                authorization: data.clientToken,
              }}
              onInstance={(instance) => (data.instance = instance)}
            />
            <button className="btn btn-success btn-block" onClick={buy}>
              Pay
            </button>
          </div>
        ) : null}
      </div>
    );
  };
  const authenticationCheckout = () => {
    return jwt ? (
      <div>{showDropIn()}</div>
    ) : (
      <Link to="/login">
        <button className="btn btn-primary">login to checkout</button>
      </Link>
    );
  };
  useEffect(() => {
    getBraintreeToken();
  }, []);
  return (
    <div>
      <h2>Total:${getTotal()}</h2>
      {showLoading(data.loading)}
      {showError(data.error)}
      {showSuccess(data.success)}
      {authenticationCheckout()}
    </div>
  );
};

export default Checkout;
