import React, { useState } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
import { Card, Skeleton, Row, Col, Input, Button, Select } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Meta } from "antd/lib/list/Item";
import { Option } from "antd/lib/mentions";
import Title from "antd/lib/typography/Title";

const initState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subcategory: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Dell", "Microsoft", "Lenovo", "Asus"],
  color: "",
  brand: "",
};

const ProductCreate = () => {
  const [values, setValues] = useState(initState);
  const {
    title,
    description,
    price,
    categories,
    category,
    subcategory,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
  } = values;
  const { user } = useSelector((state) => ({ ...state }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values, user.token)
      .then((res) => {
        console.log(res);
        toast.success(`${res.data.title} is created`);
        // setValues(initState);
      })
      .catch((error) => {
        console.log("create product:", error.message);
        // if (error.response.status === 400) toast.error(error.response.data);
        toast.error(error.response.data.error);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-3">
          <h4>Create Product</h4>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <Input
                type="text"
                name="title"
                size="large"
                placeholder="Enter product title"
                value={title}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <Input
                type="text"
                name="description"
                size="large"
                placeholder="Enter product description"
                value={description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <Input
                type="number"
                name="price"
                size="large"
                placeholder="Enter product price"
                value={price}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group inline-block">
              <label htmlFor="">Shipping</label>
              <select
                name="shipping"
                className="form-control"
                onChange={handleChange}
              >
                <option value="">please select</option>

                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div className="form-group">
              <Input
                type="number"
                name="quantity"
                size="large"
                placeholder="Enter product quantity"
                value={quantity}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="color">Colors</label>
              <select
                name="color"
                className="form-control"
                onChange={handleChange}
              >
                <option value="">please select</option>
                {colors.map((c, index) => (
                  <option key={index} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="brand">Brands</label>
              <select
                name="brand"
                className="form-control"
                onChange={handleChange}
              >
                <option value="">please select</option>
                {brands.map((b, index) => (
                  <option key={index} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <button className="btn ant-btn-primary" type="submit">
                Create
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
