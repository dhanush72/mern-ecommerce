import React, { useState } from "react";
import { Card, Tooltip } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import Placeholder from "../../assets/images/placeholder.png";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/rating";
import _ from "lodash";
import { useDispatch } from "react-redux";

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const { title, images, slug, price } = product;
  const [toolTip, setToolTip] = useState("Click to add");

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    let cart = [];

    //? check for window object
    if (typeof window !== undefined) {
      // * get cart from local storage
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // * push new to cart
      cart.push({
        ...product,
        count: 1,
      });

      // * remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);

      // * save to local storage
      localStorage.setItem("cart", JSON.stringify(unique));
      setToolTip("Added");

      // * add to redux
      dispatch({ type: "ADD_TO_CART", payload: unique });

      // * show cart items in side drawer
      dispatch({ type: "SET_VISIBLE", payload: true });
    }
  };

  return (
    <Card
      cover={
        <img
          className="product-img p-3"
          alt={title}
          src={images && images.length ? images[0].url : Placeholder}
        />
      }
      actions={[
        <Link to={`/product/${slug}`}>
          <EyeOutlined className="text-info" /> <br /> View
        </Link>,
        <Tooltip title={toolTip} color="green">
          <a onClick={handleAddToCart} disabled={product.quantity < 1}>
            <ShoppingCartOutlined
              className={product.quantity < 1 ? "text-danger" : "text-success"}
            />{" "}
            <br />
            {product.quantity < 1 ? (
              <p className="text-danger">Out of stock</p>
            ) : (
              " Add to cart"
            )}
          </a>
        </Tooltip>,
      ]}
    >
      {product && product.ratings && product.ratings.length > 0 ? (
        showAverage(product)
      ) : (
        <h6 className="text-danger mt-3">No rating yet</h6>
      )}
      <Meta
        title={title}
        // description={`${description && description.substring(0, 35)}...`}
      />
      <div className="mt-2">
        <h6 className="price">{`$${price}`}</h6>
      </div>
    </Card>
  );
};

export default ProductCard;
