import React from "react";
import { Card, Tag } from "antd";
import { ShoppingCartOutlined, HeartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import Placeholder from "../../assets/images/placeholder.png";
import ProductListItems from "./ProductListItems";
import StarRatings from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import { showAverage } from "../../functions/rating";

const { Meta } = Card;

const SingleProduct = ({ product, star, onStarClick }) => {
  const { _id, title, description, images, slug, category } = product;

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
            <>
              <ShoppingCartOutlined className="text-success" /> Add to Cart
            </>,
            <Link to={`/product/${slug}`}>
              <HeartOutlined className="text-secondary" /> <br /> Add to
              Wishlist
            </Link>,
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
