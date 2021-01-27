import React, { useState, useEffect } from "react";
import { Input } from "antd";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import { useDispatch } from "react-redux";

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailRegistration"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // * validation
    if (!email || !password) {
      toast.error("password is required");
      return;
    }

    if (password.length < 6) {
      toast.error("password must be atleast 6 characters long");
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      if (result.user.emailVerified) {
        // ! Remove email from localstorage
        window.localStorage.removeItem("emailRegistration");
        // * get user id and token
        let user = auth.currentUser;
        await user.updatePassword(password);
        const token = await user.getIdTokenResult();
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            email: user.email,
            token: token,
          },
        });
        // TODO redirect
        history.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-4 offset-md-3">
          <h4>Register Complete</h4>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <Input
                type="email"
                name="email"
                size="large"
                disabled
                value={email}
              />
            </div>
            <div className="form-group">
              <Input
                type="password"
                name="password"
                size="large"
                placeholder="Enter your password"
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <button type="submit" className="btn ant-btn-primary">
                Complete Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
