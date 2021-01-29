import React from "react";
import { Input, Select } from "antd";
import { toast } from "react-toastify";

const { Option } = Select;

const ProductCreateForm = ({
  values,
  setValues,
  handleChange,
  handleSubmit,
  subOptions,
  showSubCategory,
  handleCategoryChange,
}) => {
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

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <Input
          type="text"
          name="title"
          size="large"
          placeholder="Enter product title"
          value={title}
          onChange={handleChange}
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
        <label htmlFor="color">Colors</label>
        <select name="color" className="form-control" onChange={handleChange}>
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
        <select name="brand" className="form-control" onChange={handleChange}>
          <option value="">please select</option>
          {brands.map((b, index) => (
            <option key={index} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select
          name="category"
          className="form-control"
          onChange={handleCategoryChange}
        >
          <option value="">please select</option>
          {categories.length > 0 &&
            categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      {showSubCategory && (
        <div className="form-group">
          <label htmlFor="">Sub Categories</label>
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Please select"
            value={subcategory}
            onChange={(value) => setValues({ ...values, subcategory: value })}
          >
            {subOptions.length &&
              subOptions.map((s) => (
                <Option key={s._id} value={s._id}>
                  {s.name}
                </Option>
              ))}
          </Select>
        </div>
      )}

      <div className="form-group">
        <button className="btn ant-btn-primary" type="submit">
          Create
        </button>
      </div>
    </form>
  );
};

export default ProductCreateForm;
