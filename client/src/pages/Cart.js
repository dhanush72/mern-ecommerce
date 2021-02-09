import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Result, Button } from "antd";
import CheckoutProductCard from "../components/card/CheckoutProductCard";
import { userCart } from "../functions/user";

const Cart = ({ history }) => {
  const { user, cart } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();

  const getTotal = () => {
    return cart.reduce((current, next) => {
      return current + next.count * next.price;
    }, 0);
  };

  const handleCheckout = () => {
    userCart(cart, user.token)
      .then((res) => {
        console.log("checkout resp", res);
        if (res.data.ok) {
          history.push("/checkout");
        }
      })
      .catch((error) => console.log("checkout error =>", error.message));
  };

  const showCartItems = () => (
    <table className="table table-bordered">
      <thead className="thead-light">
        <tr>
          <th>Image</th>
          <th>Title</th>
          <th>Price</th>
          <th>Brand</th>
          <th>Color</th>
          <th>Count</th>
          <th>Shipping</th>
          <th>Remove</th>
        </tr>
      </thead>
      {cart.map((product) => (
        <CheckoutProductCard key={product._id} product={product} />
      ))}
    </table>
  );

  return (
    <div className="container-fluid my-2">
      <div className="px-1">
        <h4>Cart</h4>
      </div>

      <div className="row">
        <div className="col-md-9">
          {!cart.length ? (
            <Result
              status="404"
              title="No products in cart"
              subTitle="please add products to item "
              extra={
                <Link to="/shop">
                  <Button type="primary">Continue shopping</Button>
                </Link>
              }
            />
          ) : (
            showCartItems()
          )}
        </div>
        <div className="col-md-3">
          <h4>Order Summary</h4>
          <hr />
          {cart.map((product, index) => (
            <div key={index}>
              <dl className="dlist-align">
                <dt>
                  {product.title} x {product.quantity} :
                </dt>
                <dd className="text-right">${product.price * product.count}</dd>
              </dl>
            </div>
          ))}
          <hr />
          <dl className="dlist-align">
            <dt>Total :</dt>
            <dd className="text-right font-weight-bold">${getTotal()}</dd>
          </dl>
          {user ? (
            <Button
              onClick={handleCheckout}
              type="primary"
              block
              size="large"
              disabled={!cart.length}
            >
              Proceed to checkout
            </Button>
          ) : (
            <Link to={{ pathname: "/login", state: { from: "cart" } }}>
              <Button type="danger" block size="large">
                Login to checkout
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
