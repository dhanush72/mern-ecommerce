import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Menu } from "antd";
import {
  HomeOutlined,
  LockOutlined,
  LoginOutlined,
  UserOutlined,
  LogoutOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";
import firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import SearchForm from "../forms/SearchForm";

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

      <Item key="shop" icon={<ShoppingOutlined />}>
        <Link to="/shop">Shop</Link>
      </Item>

      {user ? (
        <SubMenu
          key="SubMenu"
          icon={<UserOutlined />}
          // ? name@gmail.com => split("@")  => ['name', 'gmail.com']
          title={user.email && user.email.split("@")[0]}
          className="float-right"
        >
          {user && user.role === "subscriber" && (
            <Item>
              <Link to="/user/history">Dashboard</Link>
            </Item>
          )}
          {user && user.role === "admin" && (
            <Item>
              <Link to="/admin/dashboard">Dashboard</Link>
            </Item>
          )}
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

      <span className="float-right">
        <SearchForm />
      </span>
    </Menu>
  );
};

export default Navbar;
