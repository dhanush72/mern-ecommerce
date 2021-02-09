import React, { useState, useEffect } from "react";
import { Button } from "antd";
import { getUserCart, emptyUserCart, userAddress } from "../functions/user";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import ReactQuill from "react-quill";

const Checkout = ({ history }) => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  useEffect(() => {
    getUserCart(user.token)
      .then((res) => {
        setProducts(res.data.products);
        setTotal(res.data.cartTotal);
        console.log(res.data);
      })
      .catch((error) => console.log(error.message));
  }, []);

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
      toast.success("cart is empty, continue shopping");
      history.push("/shop");
    });
  };

  return (
    <div className="container-fluid">
      <div className="row py-4">
        <div className="col-md-6">
          <h4>Delivery Address</h4>
          <br />
          <ReactQuill theme="snow" value={address} onChange={setAddress} />
          <Button className="mt-2" type="primary" onClick={handleSaveAddress}>
            Save
          </Button>
          <hr />
          <h4>Got Coupon?</h4>
          coupon input
        </div>
        <div className="col-md-3 offset-md-3">
          <h4>Order Summary</h4>
          <hr />
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

          <div className="row">
            <div className="col-md-6">
              <Button
                type="primary"
                disabled={!addressSaved || !products.length}
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
        </div>
      </div>
    </div>
  );
};

export default Checkout;
