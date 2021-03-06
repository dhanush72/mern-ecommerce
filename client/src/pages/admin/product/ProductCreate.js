import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";

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

const ProductCreate = ({ history }) => {
  const [values, setValues] = useState(initState);
  const [subOptions, setSubOptions] = useState([]);
  const [showSubCategory, setShowSubCategory] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  const { title, description } = values;

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

    if (!title || !description) {
      return toast.error("field cannot be empty");
    }
    createProduct(values, user.token)
      .then((res) => {
        console.log(res);
        toast.success(`${res.data.title} is created`);
        // setValues(initState);
        history.push("/admin/products");
      })
      .catch((error) => {
        console.log("create product:", error.message);
        // if (error.response.status === 400) toast.error(error.response.data);
        toast.error(error.response.data.error);
      });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    setValues({ ...values, subcategory: [], category: e.target.value });
    getCategorySubs(e.target.value)
      .then((res) => {
        setSubOptions(res.data);
        console.log("sub options", res);
      })
      .catch((error) => {
        console.log("sub options", error);
      });
    setShowSubCategory(true);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-8">
          {loading ? (
            <LoadingOutlined className="text-danger h1" />
          ) : (
            <h4>Create Product</h4>
          )}
          <hr />

          <div className="form-group">
            <FileUpload
              values={values}
              setValues={setValues}
              loading={loading}
              setLoading={setLoading}
            />
          </div>

          <ProductCreateForm
            values={values}
            setValues={setValues}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleCategoryChange={handleCategoryChange}
            subOptions={subOptions}
            showSubCategory={showSubCategory}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductCreate;
