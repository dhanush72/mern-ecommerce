import React, { useState, useEffect } from "react";
import { Button, Input } from "antd";
import {
  getUserCart,
  emptyUserCart,
  userAddress,
  applyCoupon,
} from "../functions/user";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";

const Checkout = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [coupon, setCoupon] = useState("");
  const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
  const [discountError, setDiscountError] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  useEffect(() => {
    getUserCart(user.token)
      .then((res) => {
        setProducts(res.data.products);
        setTotal(res.data.cartTotal);
      })
      .catch((error) => console.log(error.message));
  }, [user.token]);

  const handleSaveAddress = () => {
    userAddress(address, user.token)
      .then((res) => {
        if (res.data.ok) {
          setAddressSaved(true);
          toast.success("Address has been saved");
          setAddress("");
        }
      })
      .catch((error) => console.log(error));
  };

  const handleEmptyCart = () => {
    //* empty local storage
    if (typeof window !== undefined) {
      localStorage.removeItem("cart");
    }
    //* empty redux
    dispatch({ type: "ADD_TO_CART", payload: [] });
    //* empty in backend
    emptyUserCart(user.token).then((res) => {
      setProducts([]);
      setTotal(0);
      setTotalAfterDiscount(0);
      setCoupon("");
      toast.success("cart is empty, continue shopping");
      history.push("/shop");
    });
  };

  const showOrderSummary = () => (
    <>
      <p>
        Products <strong>x {products.length}</strong>
      </p>
      <hr />
      {products.map((p, index) => (
        <div key={index}>
          <p>
            {p.product.title} ({p.color}) x {p.count} = $
            {p.product.price * p.count}
          </p>
        </div>
      ))}
      <hr />
      <p>
        Cart Total: <strong>${total}</strong>
      </p>

      {totalAfterDiscount > 0 && (
        <div className="bg-success text-center">
          <p className="text-white p-3">
            Discount Applied: <strong>${totalAfterDiscount}</strong>
          </p>
        </div>
      )}

      <div className="row">
        <div className="col-md-6">
          <Button
            type="primary"
            disabled={!addressSaved || !products.length}
            onClick={() => history.push("/payment")}
          >
            Place Order
          </Button>
        </div>
        <div className="col-md-6">
          <Button
            type="danger"
            disabled={!products.length}
            onClick={handleEmptyCart}
          >
            Empty Cart
          </Button>
        </div>
      </div>
    </>
  );

  const handleApplyDiscount = () => {
    applyCoupon(coupon, user.token)
      .then((res) => {
        if (res.data) {
          setTotalAfterDiscount(res.data);
          dispatch({ type: "COUPON_APPLIED", payload: true });
          //* push totalAfterDiscount to redux
        }

        if (res.data.error || !coupon) {
          setDiscountError(res.data.error);
          toast.error(res.data.error);
          dispatch({ type: "COUPON_APPLIED", payload: false });
        }
      })
      .catch((error) => {
        toast.error(error.response.error);
      });
  };

  const showApplyCoupon = () => (
    <>
      <div className="form-group">
        <label>Name</label>
        <Input
          type="text"
          size="large"
          placeholder={`Enter coupon name`}
          value={coupon}
          onChange={(e) => {
            setCoupon(e.target.value);
            setDiscountError("");
          }}
          autoFocus
        />
      </div>
      <div className="form-group">
        <Button type="primary" size="large" onClick={handleApplyDiscount}>
          Apply
        </Button>
      </div>
    </>
  );

  const showAddress = () => (
    <>
      <br />
      <ReactQuill theme="snow" value={address} onChange={setAddress} />
      <Button className="mt-2" type="primary" onClick={handleSaveAddress}>
        Save
      </Button>
      <hr />
      <h4>Got Coupon?</h4>
      <div className="row">
        <div className="col-md-6">{showApplyCoupon()}</div>
      </div>
    </>
  );

  return (
    <div className="container-fluid">
      <div className="row py-4">
        <div className="col-md-6">
          <h4>Delivery Address</h4>
          {showAddress()}
        </div>
        <div className="col-md-3 offset-md-3">
          <h4>Order Summary</h4>
          <hr />
          {showOrderSummary()}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
