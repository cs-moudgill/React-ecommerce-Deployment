import React, { useEffect, useState } from "react";
import { emptyCart } from "./helper/CartHelper";
import { createOrder } from "./helper/OrderHelper";
import { getmeToken, processPayment } from "./helper/Paymentbhelper";
import DropIn from "braintree-web-drop-in-react";
import { isAuthenticated } from "../auth/helper";

const Paymentb = ({ products, setReload, reload = false }) => {
  const [info, setInfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: {},
  });
  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getmeToken(userId, token).then((info) => {
      if (info.error) {
        setInfo({ ...info, error: info.error });
      } else {
        const clientToken = info.clientToken;
        setInfo({ clientToken });
      }
    });
  };

  const showDropIn = () => {
    return (
      <div>
        {info.clientToken !== null && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) => (info.instance = instance)}
            />
            <button
              className="btn btn-block btn-success rounded"
              onClick={onPurchase}
            >
              Buy
            </button>
          </div>
        ) : (
          <h3>Please Login or add something to cart</h3>
        )}
      </div>
    );
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const onPurchase = () => {
    setInfo({ loading: true });
    let nonce;
    let getNonce = info.instance.requestPaymentMethod().then((data) => {
      nonce = data.nonce;
      const paymentInfo = {
        paymentMethodNonce: nonce,
        amount: getAmount(),
      };
      processPayment(userId,token,paymentInfo).then((response)=>{
        setInfo({...info,success:response.success,loading:false})
        console.log('Payment Success');
        const orderData={
          products:products,
          transaction_id:response.transaction_id,
          amount:response.transaction.amount
        }
        createOrder(userId,token,orderData);

        emptyCart(()=>{
          console.log('Cleared');
        })
        setReload(true);
      })
      .catch((err)=>{
        setInfo({loading:false,success:false})
        console.log('Payment Failed');
      })
    });
  };

  const getAmount = () => {
    let amount = 0;
    products.map((product) => {
      amount = amount + product.price;
    });
    return amount;
  };

  return (
    <div>
      <h1>Your bill is ${getAmount()}</h1>
      {showDropIn()}
    </div>
  );
};

export default Paymentb;
