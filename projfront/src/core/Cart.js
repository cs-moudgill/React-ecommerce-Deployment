import React, { useEffect, useState } from "react";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/CartHelper";
import Paymentb from "./PaymentB";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart());
  }, [reload]);

  const loadAllProducts = () => {
    return (
      <div>
        <h2>This section is to load products</h2>
        {products && products.map((product, index) => (
          <Card
            key={index}
            product={product}
            addCartOption={false}
            removeCartOption={true}
            setReload={setReload}
            reload={reload}
          />
        ))}
      </div>
    );
  };

 
  return (
    <Base title="Your Cart" description="Ready to Checkout">
      <div className="row text-center">
        <div className="col-6">
          {products.length > 0 ? (
            loadAllProducts()
          ) : (
            <h3>No products added in Cart.</h3>
          )}
        </div>
        <div className="col-6">
          <Paymentb products={products} setReload={setReload} reload={reload} />
        </div>
      </div>
    </Base>
  );
};

export default Cart; //here this file renders the data to Routes.js.
