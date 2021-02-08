import React from "react";
import ProductCard from "./ProductCard";

const RelatedProduct = ({ related }) => {
  return (
    <>
      <div className="col-md-12 text-center pt-5 ">
        <hr />
        <h4>Related Products</h4>
        <hr />
      </div>

      {related.length ? (
        related.map((r) => (
          <div className="col-md-4 p-3" key={r._id}>
            <ProductCard product={r} />
          </div>
        ))
      ) : (
        <div className="text-center col">
          <h6 className="text-danger">No products found</h6>
        </div>
      )}
    </>
  );
};

export default RelatedProduct;
