import React from "react";
import { Input, Select, Row, Col } from "antd";
import { Link } from "react-router-dom";

const { Option } = Select;

const ProductUpdateForm = ({
  values,
  setValues,
  handleChange,
  handleSubmit,
  handleCategoryChange,
  categories,
  subOptions,
  arrayOfSubs,
  setArrayOfSubs,
  selectedCategory,
}) => {
  const {
    title,
    description,
    price,
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

  return (
    <form onSubmit={handleSubmit}>
      <Row gutter={16}>
        <Col className="gutter-row mb-5" xs={24} sm={12} md={8}>
          <div className="form-group">
            <label htmlFor="">Title</label>
            <Input
              type="text"
              name="title"
              size="large"
              placeholder="Enter product title"
              value={title}
              onChange={handleChange}
            />
          </div>
        </Col>

        <Col className="gutter-row mb-5" xs={24} sm={12} md={8}>
          <div className="form-group">
            <label htmlFor="">Description</label>
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
        </Col>

        <Col className="gutter-row mb-5" xs={24} sm={12} md={8}>
          <div className="form-group">
            <label htmlFor="">Price</label>
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
        </Col>

        <Col className="gutter-row mb-5" xs={24} sm={12} md={8}>
          <div className="form-group">
            <label htmlFor="">Quantity</label>
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
        </Col>

        <Col className="gutter-row mb-5" xs={24} sm={12} md={8}>
          <div className="form-group">
            <label htmlFor="">Shipping</label>
            <select
              name="shipping"
              className="form-control"
              onChange={handleChange}
              value={shipping === "Yes" ? "Yes" : "No"}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>
        </Col>

        <Col className="gutter-row mb-5" xs={24} sm={12} md={8}>
          <div className="form-group">
            <label htmlFor="color">Colors</label>
            <select
              name="color"
              className="form-control"
              value={color}
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
        </Col>

        <Col className="gutter-row mb-5" xs={24} sm={12} md={8}>
          <div className="form-group">
            <label htmlFor="brand">Brands</label>
            <select
              name="brand"
              className="form-control"
              value={brand}
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
        </Col>

        <Col className="gutter-row mb-5" xs={24} sm={12} md={8}>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              name="category"
              className="form-control"
              value={selectedCategory ? selectedCategory : category._id}
              onChange={handleCategoryChange}
            >
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>
        </Col>

        <Col className="gutter-row mb-5" xs={24} sm={12} md={8}>
          <div className="form-group">
            <div className="form-group">
              <label htmlFor="">Sub Category</label>
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="Please select"
                value={arrayOfSubs}
                onChange={(value) => setArrayOfSubs(value)}
              >
                {subOptions.length &&
                  subOptions.map((s) => (
                    <Option key={s._id} value={s._id}>
                      {s.name}
                    </Option>
                  ))}
              </Select>
            </div>
          </div>
        </Col>

        <div className="form-group mr-3">
          <button className="btn ant-btn-primary" type="submit">
            Update
          </button>
        </div>

        <div className="form-group">
          <Link to="/admin/products">
            <button className="btn ant-btn-danger" type="submit">
              Cancel
            </button>
          </Link>
        </div>
      </Row>
    </form>
  );
};

export default ProductUpdateForm;
