import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {
  createCategory,
  getCategories,
  removeCategory,
} from "../../../functions/category";
import {
  createSubCategory,
  getSubCategories,
  removeSubCategory,
} from "../../../functions/subcategory.js";
import { Card, Skeleton, Row, Col } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Meta } from "antd/lib/list/Item";
import CategoryForm from "../../../components/forms/CategoryForm";
import CategorySearch from "../../../components/forms/CategorySearch";

const SubCategoryCreate = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [subcategories, setSubCategories] = useState([]);
  const [query, setQuery] = useState("");
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
    loadSubCategories();
  }, []);

  // * get all categories
  const loadCategories = () => {
    getCategories().then((category) => setCategories(category.data));
  };

  const loadSubCategories = () => {
    getSubCategories().then((sub) => setSubCategories(sub.data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createSubCategory({ name, parent: category }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`${res.data.name} is created`);
        loadSubCategories();
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 400) toast.error(error.response.data);
      });
  };

  const handleDelete = async (slug) => {
    if (window.confirm("Delete ?")) {
      setLoading(true);
      // ! delete category function
      removeSubCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} is deleted`);
          loadSubCategories();
        })
        .catch((error) => {
          setLoading(false);
          if (error.response.status === 400) toast.error(error.response.data);
        });
    }
  };

  const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-8">
          {loading ? <h4>Loading...</h4> : <h4>Create sub category</h4>}

          <div className="form-group">
            <label htmlFor="">Parent Category</label>
            <select
              name="category"
              className="form-control"
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="please select">please select</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
            </select>
            {/* <Input.Group compact>
              <Select
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.length > 0 &&
                  categories.map((c) => (
                    <Option key={c._id} value={c._id}>
                      {c.name}
                    </Option>
                  ))}
              </Select>
            </Input.Group> */}
          </div>

          <CategoryForm
            place={"sub category"}
            name={name}
            setName={setName}
            handleSubmit={handleSubmit}
          />

          <h4>All sub category</h4>

          <CategorySearch query={query} setQuery={setQuery} />

          <Row gutter={16}>
            {subcategories.filter(searched(query)).map((s) => (
              <Col className="gutter-row mb-5" xs={12} sm={8} key={s._id}>
                <Card
                  actions={[
                    <Link to={`/admin/category/${s.slug}`}>
                      <EditOutlined /> Edit
                    </Link>,
                    <span
                      onClick={() => handleDelete(s.slug)}
                      className="text-danger"
                    >
                      <DeleteOutlined /> Delete
                    </span>,
                  ]}
                >
                  <Skeleton loading={loading} active>
                    <Meta title={s.name} />
                  </Skeleton>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      </div>
    </div>
  );
};

export default SubCategoryCreate;
