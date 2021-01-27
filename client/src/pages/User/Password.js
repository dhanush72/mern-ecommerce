import React, { useState } from "react";
import UserNav from "../../components/nav/UserNav";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { Input, Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const Password = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        setLoading(false);
        setPassword("");
        toast.success("password changed");
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.message);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <UserNav />
        </div>
        <div className="col-md-3">
          {loading ? (
            <h4>
              <LoadingOutlined /> Loading...
            </h4>
          ) : (
            <h4>Password Update</h4>
          )}
          <form>
            <div className="form-group">
              <div className="form-group">
                <Input
                  name="password"
                  type="password"
                  size="large"
                  placeholder="Enter new password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>

              <div className="form-group">
                <Button
                  type="primary"
                  size="large"
                  onClick={handleSubmit}
                  disabled={!password || password.length < 6 || loading}
                >
                  Update
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Password;
