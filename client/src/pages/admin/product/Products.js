import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import AdminProductCard from "../../../components/card/AdminProductCard";
import { getProductsByCount, removeProduct } from "../../../functions/product";
import AdminNav from "../../../components/nav/AdminNav";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import LoadingCard from "../../../components/card/LoadingCard";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(10)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  const handleRemove = async (slug) => {
    if (window.confirm("Delete ?")) {
      setLoading(true);
      // ! delete product function
      removeProduct(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.title} is removed`);
          loadAllProducts();
        })
        .catch((error) => {
          setLoading(false);
          if (error.response.status === 400) toast.error(error.response.data);
        });
    }
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
          {loading ? (
            <LoadingCard count={3} />
          ) : (
            <Row gutter={16}>
              {products.map((product) => (
                <Col
                  className="gutter-row mb-5"
                  xs={24}
                  sm={12}
                  md={8}
                  key={product._id}
                >
                  <AdminProductCard
                    product={product}
                    loading={loading}
                    handleRemove={handleRemove}
                  />
                </Col>
              ))}
            </Row>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
