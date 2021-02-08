import React, { useState, useEffect } from "react";
import {
  getProduct,
  getProductStar,
  getProductRelated,
} from "../functions/product";
import SingleProduct from "../components/card/SingleProduct";
import { useSelector } from "react-redux";
import ProductCard from "../components/card/ProductCard";
import RelatedProduct from "../components/card/RelatedProduct";

const Product = ({ match }) => {
  const [product, setProduct] = useState([]);
  const [related, setRelated] = useState([]);
  const [star, setStar] = useState(0);
  const { slug } = match.params;

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadProduct();
  }, [slug]);

  useEffect(() => {
    if (product.ratings && user) {
      const existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === user._id.toString()
      );
      // * current user star
      existingRatingObject && setStar(existingRatingObject.star);
    }
  });

  const loadProduct = () => {
    getProduct(slug)
      .then((res) => {
        setProduct(res.data);

        // * related products
        getProductRelated(res.data._id).then((res) => setRelated(res.data));
      })
      .catch((error) => console.log("product:", error));
  };

  const onStarClick = (newRating, name) => {
    setStar(newRating);
    getProductStar(name, newRating, user.token)
      .then((res) => {
        loadProduct();
      })
      .catch((error) => console.log("rating:", error));
  };

  return (
    <div className="container-fluid py-3">
      <div className="row">
        <SingleProduct
          product={product}
          onStarClick={onStarClick}
          star={star}
        />
      </div>

      <div className="row">
        <RelatedProduct related={related} />
      </div>
    </div>
  );
};

export default Product;
