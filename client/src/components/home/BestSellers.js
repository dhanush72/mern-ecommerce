import React, { useState, useEffect } from "react";
import { getProducts, getProductsTotal } from "../../functions/product";
import LoadingCard from "../card/LoadingCard";
import ProductCard from "../card/ProductCard";
import { Pagination } from "antd";

const BestSellers = () => {
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
    getProducts("sold", "desc", page)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("best sellers:", error);
        setLoading(false);
      });
  };
  return (
    <>
      <div className="container ">
        <h4 className="text-black font-weight-bold display-6 mt-5 mb-4">
          Best Sellers
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

      <div className="pt-5 text-center pb-5">
        <Pagination
          current={page}
          total={(productsCount / 3) * 10}
          onChange={(value) => setPage(value)}
        />
      </div>
    </>
  );
};

export default BestSellers;
