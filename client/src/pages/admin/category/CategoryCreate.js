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
import { Card, Skeleton, Row, Col } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Meta } from "antd/lib/list/Item";
import CategoryForm from "../../../components/forms/CategoryForm";
import CategorySearch from "../../../components/forms/CategorySearch";

const CategoryCreate = () => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState("");
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategories();
  }, []);

  // * get all categories
  const loadCategories = () => {
    getCategories().then((category) => setCategories(category.data));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    createCategory({ name }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`${res.data.name} is created`);
        loadCategories();
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
      removeCategory(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.error(`${res.data.name} is deleted`);
          loadCategories();
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
          {loading ? <h4>Loading...</h4> : <h4>Create Category</h4>}

          <CategoryForm
            name={name}
            setName={setName}
            handleSubmit={handleSubmit}
          />

          <h4>All Category</h4>

          <CategorySearch query={query} setQuery={setQuery} />

          <Row gutter={16}>
            {categories.filter(searched(query)).map((c) => (
              <Col className="gutter-row mb-5" xs={12} sm={8} key={c._id}>
                <Card
                  actions={[
                    <Link to={`/admin/category/${c.slug}`}>
                      <EditOutlined /> Edit
                    </Link>,
                    <span
                      onClick={() => handleDelete(c.slug)}
                      className="text-danger"
                    >
                      <DeleteOutlined /> Delete
                    </span>,
                  ]}
                >
                  <Skeleton loading={loading} active>
                    <Meta title={c.name} />
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

export default CategoryCreate;
