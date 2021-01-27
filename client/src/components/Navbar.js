import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Menu } from "antd";
import {
  HomeOutlined,
  LockOutlined,
  LoginOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";

const { SubMenu, Item } = Menu;

const Navbar = () => {
  const [current, setCurrent] = useState("home");
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state) => ({ ...state }));

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const handleLogout = () => {
    firebase.auth().signOut();
    // TODO remove from redux store
    dispatch({ type: "LOGOUT", payload: null });
    // * redirect user
    history.push("/login");
  };

  return (
    <Menu onClick={handleClick} mode="horizontal" selectedKeys={[current]}>
      <Item key="home" icon={<HomeOutlined />}>
        <Link to="/">Home</Link>
      </Item>

      {user ? (
        <SubMenu
          key="SubMenu"
          icon={<UserOutlined />}
          // ? name@gmail.com => split("@")  => ['name', 'gmail.com']
          title={user.email && user.email.split("@")[0]}
          className="float-right"
        >
          <Item key="setting:1">Option 1</Item>
          <Item key="setting:2">Option 2</Item>
          <Item icon={<LogoutOutlined />} onClick={handleLogout}>
            Logout
          </Item>
        </SubMenu>
      ) : (
        <>
          <Item key="register" icon={<LockOutlined />} className="float-right">
            <Link to="/register">Register</Link>
          </Item>
          <Item key="login" icon={<LoginOutlined />} className="float-right">
            <Link to="/login">Login</Link>
          </Item>
        </>
      )}
    </Menu>
  );
};

export default Navbar;
