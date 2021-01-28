import React, { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategory, updateCategory } from "../../../functions/category";
import { Input, Button } from "antd";

const CategoryUpdate = ({ history, match }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadCategory();
  }, []);

  // * get category
  const loadCategory = () => {
    getCategory(match.params.slug).then((c) => setName(c.data.name));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    updateCategory(match.params.slug, { name }, user.token)
      .then((res) => {
        setLoading(false);
        setName("");
        toast.success(`${res.data.name} is updated`);
        history.push("/admin/category");
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
        <div className="col-md-4">
          {loading ? <h4>Loading...</h4> : <h4>Update Category</h4>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <Input
                type="text"
                size="large"
                placeholder="Enter category name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoFocus
                required
              />
            </div>
            <div className="form-group">
              <Button type="primary" size="large" onClick={handleSubmit}>
                Update
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;
