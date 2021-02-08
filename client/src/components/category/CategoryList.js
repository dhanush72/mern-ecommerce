import React, { useEffect, useState } from "react";
import { getCategories } from "../../functions/category";
import { Spin, Card } from "antd";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getCategories().then((res) => {
      setCategories(res.data);
      setLoading(false);
    });
  }, []);

  const gridStyle = {
    width: "100%",
    textAlign: "center",
  };

  return (
    <div className="container-fluid">
      <h4 className="text-black text-center font-weight-bold display-6 mt-3 mb-4">
        Categories
      </h4>

      <div className="row">
        {loading ? (
          <div className="col-md-12 text-center">
            <Spin tip="Loading..." size="large"></Spin>
          </div>
        ) : (
          categories.map((c) => (
            <div className="col-md-3 text-center mb-3" key={c._id}>
              <Spin tip="Loading..." size="large" spinning={loading}>
                <Link to={`/category/${c.slug}`}>
                  <Card.Grid style={gridStyle}>{c.name}</Card.Grid>
                </Link>
              </Spin>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default CategoryList;
