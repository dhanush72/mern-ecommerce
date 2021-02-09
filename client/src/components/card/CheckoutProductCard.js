import React from "react";
import ModalImage from "react-modal-image";
import Placeholder from "../../assets/images/placeholder.png";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  CloseOutlined,
} from "@ant-design/icons";

const CheckoutProductCard = ({ product }) => {
  const {
    _id,
    images,
    title,
    price,
    brand,
    color,
    count,
    quantity,
    shipping,
  } = product;

  const colors = ["Black", "Brown", "Silver", "White", "Blue"];

  const dispatch = useDispatch();

  const handleColor = (e) => {
    let cart = [];
    if (typeof window !== undefined) {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((newProduct, index) => {
        if (_id === newProduct._id) {
          cart[index].color = e.target.value;
        }
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({ type: "ADD_TO_CART", payload: cart });
    }
  };

  const handleQuantity = (e) => {
    let cart = [];
    let count = e.target.value < 1 ? 1 : e.target.value;

    if (count > quantity) {
      return toast.error(`Max available quantitiy : ${quantity}`);
    }

    if (typeof window !== undefined) {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((newProduct, index) => {
        if (_id === newProduct._id) {
          cart[index].count = count;
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({ type: "ADD_TO_CART", payload: cart });
    }
  };

  const handleRemove = () => {
    let cart = [];
    if (typeof window !== undefined) {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      cart.map((newProduct, index) => {
        if (_id === newProduct._id) {
          cart.splice(index, 1);
        }
      });
      localStorage.setItem("cart", JSON.stringify(cart));
      dispatch({ type: "ADD_TO_CART", payload: cart });
    }
  };

  return (
    <tbody>
      <tr>
        <td>
          <div className="img-sm border">
            {images.length ? (
              <ModalImage small={images[0].url} large={images[0].url} />
            ) : (
              <ModalImage small={Placeholder} large={Placeholder} />
            )}
          </div>
        </td>
        <td> {title} </td>
        <td> {price} </td>
        <td> {brand} </td>
        <td>
          {
            <select
              name="color"
              onChange={handleColor}
              className="form-control"
            >
              {product.color ? (
                <option> {product.color} </option>
              ) : (
                <option> select color </option>
              )}
              {colors
                .filter((c) => c !== color)
                .map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
            </select>
          }
        </td>
        <td className="text-center">
          <input
            type="number"
            className="form-control"
            value={count}
            onChange={handleQuantity}
          />
        </td>
        <td className="text-center">
          {shipping === "Yes" ? (
            <CheckCircleOutlined
              className="text-success"
              style={{ fontSize: "20px" }}
            />
          ) : (
            <CloseCircleOutlined
              className="text-danger"
              style={{ fontSize: "20px" }}
            />
          )}
        </td>
        <td className="text-center">
          <CloseOutlined
            className="text-danger pointer"
            style={{ fontSize: "20px" }}
            onClick={handleRemove}
          />
        </td>
      </tr>
    </tbody>
  );
};

export default CheckoutProductCard;
