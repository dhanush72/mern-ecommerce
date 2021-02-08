import React, { useState, useEffect } from "react";
import { getProducts } from "../../functions/product";
import LoadingCard from "../card/LoadingCard";
import ProductCard from "../card/ProductCard";
import { Pagination } from "antd";
import { getProductsTotal } from "../../functions/product";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadProducts();
    getProductsTotal()
      .then((res) => setProductsCount(res.data))
      .catch((error) => console.log(error));
  }, [page]);

  const loadProducts = () => {
    setLoading(true);
    getProducts("createdAt", "desc", page)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("new arrivals:", error);
        setLoading(false);
      });
  };

  return (
    <>
      <div className="container">
        <h4 className="text-black font-weight-bold display-6 mt-5 mb-4">
          New Arrivals
        </h4>
        {loading ? (
          <LoadingCard count={3} />
        ) : (
          <div className="row">
            {products.map((product) => (
              <div className="col-md-4" key={product._id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="pt-5 text-center">
        <Pagination
          current={page}
          total={(productsCount / 3) * 10}
          onChange={(value) => setPage(value)}
        />
      </div>
    </>
  );
};

export default NewArrivals;
