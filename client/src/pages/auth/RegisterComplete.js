import React, { useState, useEffect } from "react";
import { Input } from "antd";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { createUpdateUser } from "../../functions/auth";

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailRegistration"));
    if (user && user.token) history.push("/");
  }, [user, history]);

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
        const idTokenResult = await user.getIdTokenResult();
        // * sending token to backend
        createUpdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((error) => console.log("create update user error:", error));
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
