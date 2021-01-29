import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import { getCategories } from "../../../functions/category";

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
  const { user } = useSelector((state) => ({ ...state }));

  console.log(values.categories);

  useEffect(() => {
    loadCategories();
  }, []);

  // * get all categories
  const loadCategories = () => {
    getCategories().then((category) =>
      setValues({ ...values, categories: category.data })
    );
  };

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
          <ProductCreateForm
            values={values}
            setValues={setValues}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
