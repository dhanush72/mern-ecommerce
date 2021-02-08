import React, { useState, useEffect } from "react";
import { getCategory } from "../../functions/category";
import { Spin, Result, Button } from "antd";
import ProductCard from "../../components/card/ProductCard";
import { Link } from "react-router-dom";

const CategoryHome = ({ match }) => {
  const [category, setCategory] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { slug } = match.params;

  useEffect(() => {
    setLoading(true);
    getCategory(slug).then((res) => {
      setCategory(res.data.category);
      setProducts(res.data.products);
      setLoading(false);
    });
  }, [slug]);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12">
          {loading ? (
            <div className="col-md-12 text-center p-3 mt-5 mb-5">
              <Spin tip="Loading..." size="large"></Spin>
            </div>
          ) : (
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
              {products.length} "Products" in {category.name} category
            </h4>
          )}
        </div>
      </div>

      <div className="row">
        {products.length ? (
          products.map((product) => (
            <div className="col-md-4 mb-3" key={product._id}>
              <Spin tip="Loading..." size="large" spinning={loading}>
                <ProductCard product={product} />
              </Spin>
            </div>
          ))
        ) : (
          <div className="col-md-12">
            <Result
              status="404"
              title="No products found"
              subTitle="Sorry, the page you visited does not contain data."
              extra={
                <Link to="/">
                  <Button type="primary"> Back Home</Button>
                </Link>
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryHome;
