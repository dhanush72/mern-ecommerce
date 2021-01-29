import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategories } from "../../../functions/category";
import {
  getSubCategory,
  updateSubCategory,
} from "../../../functions/subcategory.js";
import CategoryForm from "../../../components/forms/CategoryForm";
import { Select } from "antd";

const SubCategoryUpdate = ({ history, match }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [parent, setParent] = useState([]);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
    loadSubCategory();
  }, []);

  // * get all categories
  const loadCategories = () => {
    getCategories().then((category) => setCategories(category.data));
  };

  // * get all sub categories
  const loadSubCategory = () => {
    getSubCategory(match.params.slug).then((sub) => {
      setName(sub.data.name);
      setParent(sub.data.parent);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateSubCategory(match.params.slug, { name, parent }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`${res.data.name} is updated`);
        history.push("/admin/subcategory");
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 400) toast.error(error.response.data);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-8">
          {loading ? <h4>Loading...</h4> : <h4>Update sub category</h4>}

          <div className="form-group">
            {/* <select
              name="category"
              className="form-control"
              onChange={(e) => setParent(e.target.value)}
            >
              <option value="">please select</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id} selected={c._id === parent}>
                    {c.name}
                  </option>
                ))}
            </select> */}
            <Select
              defaultValue="please enter"
              onChange={(value) => setParent(value)}
            >
              {categories.length > 0 &&
                categories.map((c) => (
                  <Select.Option key={c._id} value={c._id === parent}>
                    {c.name}
                  </Select.Option>
                ))}
            </Select>
          </div>

          <CategoryForm
            place={"sub category"}
            name={name}
            setName={setName}
            handleSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default SubCategoryUpdate;
