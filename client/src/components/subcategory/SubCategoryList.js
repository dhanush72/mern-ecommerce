import React, { useEffect, useState } from "react";
import { getSubCategories } from "../../functions/subcategory";
import { Spin, Card } from "antd";
import { Link } from "react-router-dom";

const SubCategoryList = () => {
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getSubCategories().then((res) => {
      setSubCategories(res.data);
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
        Sub Categories
      </h4>

      <div className="row">
        {loading ? (
          <div className="col-md-12 text-center">
            <Spin tip="Loading..." size="large"></Spin>
          </div>
        ) : (
          subCategories.map((s) => (
            <div className="col-md-2 text-center mb-3" key={s._id}>
              <Spin tip="Loading..." size="large" spinning={loading}>
                <Link to={`/subcategory/${s.slug}`}>
                  <Card.Grid style={gridStyle}>{s.name}</Card.Grid>
                </Link>
              </Spin>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SubCategoryList;
