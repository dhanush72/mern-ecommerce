import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import AdminProductCard from "../../../components/card/AdminProductCard";
import { getProducts } from "../../../functions/product";
import AdminNav from "../../../components/nav/AdminNav";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProducts(10)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col-md-8">
          {loading ? (
            <h4 className="text-danger">Loading...</h4>
          ) : (
            <h4>All Products</h4>
          )}
          <Row gutter={16}>
            {products.map((product) => (
              <Col className="gutter-row mb-5" xs={12} sm={8} key={product._id}>
                <AdminProductCard product={product} loading={loading} />
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default Products;
