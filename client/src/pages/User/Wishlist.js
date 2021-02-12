import React, { useState, useEffect } from "react";
import UserNav from "../../components/nav/UserNav";
import { getWishlist, removeWishlist } from "../../functions/user";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card, Result, Button } from "antd";
import Meta from "antd/lib/card/Meta";
import { EyeOutlined, DeleteOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import Placeholder from "../../assets/images/placeholder.png";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = () => {
    getWishlist(user.token).then((res) => {
      setWishlist(res.data.wishlist);
      console.log("wishlist =>", res);
    });
  };

  const handleRemoveWishlist = (productId) => {
    removeWishlist(productId, user.token).then((res) => {
      toast.success("wishlist removed");
      loadWishlist();
    });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col-md-10 py-2">
          <h4>Wishlist</h4>
          <div className="row">
            {wishlist.length ? (
              wishlist.map((p) => (
                <div className="col-md-3 " key={p._id}>
                  <Card
                    style={{ width: 240 }}
                    cover={
                      <Link to={`/product/${p.slug}`}>
                        <img
                          className="wishlist-img"
                          alt={p.title}
                          src={
                            p.images && p.images.length
                              ? p.images[0].url
                              : Placeholder
                          }
                        />
                      </Link>
                    }
                    actions={[
                      <Link to={`/product/${p.slug}`}>
                        <EyeOutlined className="text-primary" /> <br /> View
                      </Link>,
                      <a onClick={() => handleRemoveWishlist(p._id)}>
                        <DeleteOutlined className="text-danger" /> <br />
                        Remove
                      </a>,
                    ]}
                  >
                    <Meta title={p.title} />
                  </Card>
                </div>
              ))
            ) : (
              <div className="col-md-8">
                <Result
                  status="404"
                  title="No wishlist found"
                  subTitle="Please, add products to wishlist"
                  extra={
                    <Link to="/shop">
                      <Button type="primary">Continue shopping</Button>
                    </Link>
                  }
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
