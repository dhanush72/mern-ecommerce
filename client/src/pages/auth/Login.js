import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Input, Button } from "antd";
import { toast } from "react-toastify";
import { MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { auth, googleAuth } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { createUpdateUser } from "../../functions/auth";

const Login = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    // ? sometimes null = true
    if (user && user.token) history.push("/");
  }, [user, history]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = auth.signInWithEmailAndPassword(email, password);
      const { user } = await result;
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
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleGoogleLogin = () => {
    auth
      .signInWithPopup(googleAuth)
      .then(async (result) => {
        const { user } = await result;
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
      })
      .catch((error) => {
        console.log(error);
        toast.error(error.message);
      });
  };

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-4 offset-md-3">
          {loading ? <h4>Loading...</h4> : <h4>Login</h4>}
          <form>
            <div className="form-group">
              <Input
                name="email"
                type="email"
                size="large"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <Input
                name="password"
                type="password"
                size="large"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-group ">
              <Link
                to="/forgot-password"
                className="float-right text-danger mb-2"
              >
                Forgot Password ?
              </Link>
            </div>
            <div className="form-group">
              <Button
                type="primary"
                block
                icon={<MailOutlined />}
                size="large"
                onClick={handleSubmit}
                disabled={!email || password.length < 6}
              >
                Login with Email
              </Button>
            </div>

            <div className="form-group">
              <Button
                type="danger"
                block
                icon={<GoogleOutlined />}
                size="large"
                onClick={handleGoogleLogin}
              >
                Login with Google
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
