import React, { useState } from "react";
import { Drawer, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Placeholder from "../../assets/images/placeholder.png";

const SideDrawer = () => {
  const { drawer, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  return (
    <Drawer
      title={`Cart - ${cart.length} Product`}
      placement="right"
      onClose={() => {
        dispatch({ type: "SET_VISIBLE", payload: false });
      }}
      visible={drawer}
      width={320}
    >
      {cart.map((product) => (
        <div className="row" key={product._id}>
          <div className="col">
            {product.images[0] ? (
              <div className="cart-drawer">
                <img
                  className="border img-sm mb-3"
                  src={product.images[0].url}
                  alt={product.title}
                />
                <div className="cart-drawer-info">
                  <p className="mb-0"> {product.title} </p>
                  <strong>x {product.count}</strong>
                </div>
              </div>
            ) : (
              <div className="cart-drawer">
                <img
                  className="border img-sm mb-3"
                  src={Placeholder}
                  alt={product.title}
                />
                <div className="cart-drawer-info">
                  <p className="mb-0"> {product.title} </p>
                  <strong>x {product.count}</strong>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
      <hr />
      <Link to="/cart">
        <Button
          type="primary"
          block
          onClick={() => dispatch({ type: "SET_VISIBLE", payload: false })}
        >
          Checkout
        </Button>
      </Link>
    </Drawer>
  );
};

export default SideDrawer;
