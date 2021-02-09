import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
// import DatePicker from "react-datepicker";
import {
  createCoupon,
  getCoupons,
  removeCoupon,
} from "../../../functions/coupon";
import { Input, Button, DatePicker, Spin, Result } from "antd";
import { DeleteOutlined, MehOutlined } from "@ant-design/icons";
import AdminNav from "../../../components/nav/AdminNav";
import moment from "moment";

const CreateCoupon = () => {
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [discount, setDiscount] = useState("");
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCoupons();
  }, []);

  const loadCoupons = () => {
    getCoupons().then((res) => setCoupons(res.data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !expiry || !discount) {
      return toast.error("fields cannot be empty");
    }

    createCoupon({ name, expiry, discount }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        setExpiry("");
        setDiscount("");
        loadCoupons();
        toast.success(`${res.data.name} is created`);
      })
      .catch((error) => {
        console.log(error.response.data.error);
        setLoading(false);
        toast.error(error.response.data.error);
      });
  };

  const handleRemove = (id) => {
    if (window.confirm("Delete")) {
      setLoading(true);
      removeCoupon(id, user.token)
        .then((res) => {
          loadCoupons();
          setLoading(false);
          toast.success(`${res.data.name} is deleted`);
        })
        .catch((error) => {
          console.log(error.response.data.error);
          setLoading(false);
          toast.error(error.response.data.error);
        });
    }
  };

  return (
    <div className="container-fluid">
      <div className="row ">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-8 py-3">
          <h4>Create Coupon</h4>
          <form>
            <div className="row">
              <div className="col-md-4">
                <div className="form-group">
                  <label>Name</label>
                  <Input
                    type="text"
                    size="large"
                    placeholder={`Enter coupon name`}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoFocus
                    required
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label>Expiry</label> <br />
                  <DatePicker
                    value={expiry}
                    onChange={(date) => setExpiry(date)}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="form-group">
                  <label>Discount</label>
                  <Input
                    type="number"
                    size="large"
                    placeholder={`Enter discount name`}
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <Button type="primary" size="large" onClick={handleSubmit}>
                Save
              </Button>
            </div>
          </form>

          <h4>All Coupons</h4>
          <div className="row">
            {loading ? (
              <div className="col text-center">
                <Spin tip="Loading..."></Spin>
              </div>
            ) : (
              <table className="table table-bordered">
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Expiry</th>
                    <th scope="col">Discount</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {coupons.map((coupon) => (
                    <tr key={coupon._id}>
                      <td> {coupon.name} </td>
                      <td> {moment(coupon.expiry).format("YYYY-MM-DD")} </td>
                      <td> {coupon.discount}% </td>
                      <td>
                        <DeleteOutlined
                          className="text-danger pointer"
                          onClick={() => handleRemove(coupon._id)}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCoupon;
