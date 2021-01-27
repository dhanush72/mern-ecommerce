import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Input } from "antd";
import { useSelector } from "react-redux";
import { auth } from "../../firebase";

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    // ? sometimes null = true
    if (user && user.token) history.push("/");
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
      handleCodeInApp: true,
    };
    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail("");
        setLoading(false);
        toast.success(`Check your email for reset password link`);
      })
      .catch((error) => {
        setLoading(false);
        console.log("forgot password error: ", error);
        toast.error(error.message);
      });
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-4 offset-md-3">
          {loading ? <h4>Loading...</h4> : <h4>Forgot Password</h4>}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <Input
                name="email"
                type="email"
                size="large"
                placeholder="Enter your email"
                required
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <button
                type="submit"
                className="btn ant-btn-danger"
                disabled={!email}
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
