import React from "react";
import { Card } from "antd";
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import Placeholder from "../../assets/images/placeholder.png";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/rating";

const { Meta } = Card;

const ProductCard = ({ product }) => {
  const { title, images, slug, price } = product;

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

      // * save to local storage
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
        <a onClick={handleAddToCart}>
          <ShoppingCartOutlined className="text-success" /> <br /> Add to cart
        </a>,
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
