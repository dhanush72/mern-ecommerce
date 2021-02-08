import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getProduct, updateProduct } from "../../../functions/product";
import { getCategories, getCategorySubs } from "../../../functions/category";
import { LoadingOutlined } from "@ant-design/icons";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";
import FileUpload from "../../../components/forms/FileUpload";

const initState = {
  title: "",
  description: "",
  price: "",
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

const ProductUpdate = ({ history, match }) => {
  const [values, setValues] = useState(initState);
  const [showSubCategory, setShowSubCategory] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subOptions, setSubOptions] = useState([]);
  const [arrayOfSubs, setArrayOfSubs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const { user } = useSelector((state) => ({ ...state }));
  const { slug } = match.params;

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);

  const loadProduct = () => {
    getProduct(slug)
      .then((res) => {
        // * load single product
        setValues({ ...values, ...res.data });
        // * load single product sub category
        getCategorySubs(res.data.category._id).then((res) => {
          setSubOptions(res.data);
        });
        // * array of sub category id as default values
        const arr = [];
        res.data.subcategory.map((s) => arr.push(s._id));
        setArrayOfSubs((pre) => arr);
      })
      .catch((error) => console.log("single product:", error));
  };

  const loadCategories = () => {
    getCategories().then((category) => setCategories(category.data));
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
    setLoading(true);
    values.subcategory = arrayOfSubs;
    values.category = selectedCategory ? selectedCategory : values.category;
    updateProduct(slug, values, user.token)
      .then((res) => {
        console.log(res);
        setLoading(false);
        toast.success(`${res.data.title} is updated`);
        history.push("/admin/products");
      })
      .catch((error) => {
        console.log("update product:", error.message);
        setLoading(false);
        toast.error(error.response.data.error);
      });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    setValues({ ...values, subcategory: [] });

    // ? restore selected
    setSelectedCategory(e.target.value);

    getCategorySubs(e.target.value)
      .then((res) => {
        setSubOptions(res.data);
      })
      .catch((error) => {
        console.log("sub options", error);
      });
    setShowSubCategory(true);

    // ? go back to original category
    if (values.category._id === e.target.value) {
      loadProduct();
    }
    // ? clear category
    setArrayOfSubs([]);
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
            <h4>Update Product</h4>
          )}
          <hr />

          <div className="form-group">
            <label htmlFor=""> Image</label>
            <FileUpload
              values={values}
              setValues={setValues}
              loading={loading}
              setLoading={setLoading}
            />
          </div>

          <ProductUpdateForm
            values={values}
            setValues={setValues}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            handleCategoryChange={handleCategoryChange}
            categories={categories}
            subOptions={subOptions}
            arrayOfSubs={arrayOfSubs}
            setArrayOfSubs={setArrayOfSubs}
            selectedCategory={selectedCategory}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductUpdate;
