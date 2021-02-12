import React, { useState } from "react";
import { Card, Tag, Tooltip } from "antd";
import { ShoppingCartOutlined, HeartOutlined } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import Placeholder from "../../assets/images/placeholder.png";
import ProductListItems from "./ProductListItems";
import StarRatings from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import { showAverage } from "../../functions/rating";
import { useDispatch } from "react-redux";
import _ from "lodash";
import { addToWishlist } from "../../functions/user";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const { Meta } = Card;

const SingleProduct = ({ product, star, onStarClick }) => {
  const { _id, title, description, images, category } = product;
  const [toolTip, setToolTip] = useState("Click to add");

  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const history = useHistory();

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

  const handleWishlist = (e) => {
    e.preventDefault();
    addToWishlist(product._id, user.token).then((res) => {
      console.log("added to wishlist", res.data);
      toast.success("Added to wishlist");
      history.push("/user/wishlist");
    });
  };

  return (
    <>
      <div className="col-md-6 ">
        {images && images.length ? (
          <Carousel showArrows={true} autoPlay infiniteLoop>
            {images &&
              images.map((image) => (
                <img src={image.url} key={image.public_id} alt={title} />
              ))}
          </Carousel>
        ) : (
          <Card
            cover={
              <img
                className="product-img card-img"
                alt={title}
                src={Placeholder}
              />
            }
          />
        )}
      </div>
      <div className="col-md-6">
        <Card
          actions={[
            <Tooltip title={toolTip} color="green">
              <a onClick={handleAddToCart}>
                <ShoppingCartOutlined className="text-success" /> <br /> Add to
                cart
              </a>
            </Tooltip>,
            <a onClick={handleWishlist}>
              <HeartOutlined className="text-secondary" /> <br /> Add to
              Wishlist
            </a>,
            <RatingModal>
              <div className="text-center">
                <StarRatings
                  name={_id}
                  numberOfStars={5}
                  rating={star}
                  changeRating={onStarClick}
                  isSelectable={true}
                  starRatedColor="red"
                />
              </div>
            </RatingModal>,
          ]}
        >
          {category && (
            <Link to={`/category/${category.slug}`}>
              <Tag color="blue" className="mb-2">
                {category.name}
              </Tag>
            </Link>
          )}
          <h3 className="title">{title}</h3>
          <Meta description={description} />

          {product && product.ratings && product.ratings.length > 0 ? (
            showAverage(product)
          ) : (
            <h6 className="text-danger mt-3">No rating yet</h6>
          )}

          <hr />

          <div className="row">
            <div className="col">
              <ProductListItems product={product} />
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default SingleProduct;
