import React, { useState, useEffect } from "react";
import { getProductsByCount, getProductsByFilter } from "../functions/product";
import { getCategories } from "../functions/category";
import { getSubCategories } from "../functions/subcategory";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/card/ProductCard";
import { Spin, Menu, Slider, Radio } from "antd";
import {
  DollarOutlined,
  DownSquareOutlined,
  StarOutlined,
  TagsOutlined,
  FireOutlined,
  BgColorsOutlined,
  TransactionOutlined,
} from "@ant-design/icons";
import Checkbox from "antd/lib/checkbox/Checkbox";
import Star from "../components/forms/Star";

const { SubMenu } = Menu;

const Shop = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryIds, setCategoryIds] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [brands, setBrands] = useState([
    "Apple",
    "Dell",
    "Microsoft",
    "Lenovo",
    "Asus",
  ]);
  const [brand, setBrand] = useState("");
  const [colors, setColors] = useState([
    "Black",
    "Brown",
    "Silver",
    "White",
    "Blue",
  ]);
  const [color, setColor] = useState("");
  const [shippings] = useState(["Yes", "No"]);
  const [shipping, setShipping] = useState("");
  const [setSub] = useState("");
  const [setStar] = useState("");
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);

  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;
  const dispatch = useDispatch();

  useEffect(() => {
    loadAllProducts();

    // * loading categories on page load
    getCategories().then((res) => setCategories(res.data));

    // * loading product by sub category
    getSubCategories().then((res) => setSubCategories(res.data));
  }, []);

  // * loading product on page load
  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(12).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    const delayed = setTimeout(() => {
      fetchFilteredProducts({ query: text });
      if (!text) {
        loadAllProducts();
      }
    }, 300);

    return () => clearTimeout(delayed);
  }, [text]);

  // * loading product by search
  const fetchFilteredProducts = (arg) => {
    getProductsByFilter(arg).then((res) => {
      setProducts(res.data);
    });
  };

  useEffect(() => {
    fetchFilteredProducts({ price });
  }, [ok]);

  // * loading product by price
  const handleSlider = (value) => {
    dispatch({ type: "SEARCH_QUERY", payload: { text: "" } });
    setPrice(value);
    setCategoryIds([]);
    setStar("");
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");

    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };

  // * loading product by category
  const showCategories = () =>
    categories.map((c) => (
      <div key={c._id}>
        <Checkbox
          name="category"
          className="pb-2 pl-4 pr-4"
          value={c._id}
          checked={categoryIds.includes(c._id)}
          onChange={handleCheck}
        >
          {c.name}
        </Checkbox>
      </div>
    ));

  const handleCheck = (e) => {
    dispatch({ type: "SEARCH_QUERY", payload: { text: "" } });
    setPrice([0, 0]);
    setStar("");
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");

    const inState = [...categoryIds];
    const checked = e.target.value;
    const foundInState = inState.indexOf(checked); // ? true or -1

    // ? indexOf => if not found returns -1 else true
    // ? if user not checked
    if (foundInState === -1) {
      inState.push(checked);
    } else {
      // ? if found get one item from index
      inState.splice(foundInState, 1);
    }
    setCategoryIds(inState);
    fetchFilteredProducts({ category: inState });
  };

  // * loading product by star
  const showStars = () => (
    <div className="pl-4 pr-4 pb-2">
      <Star number={5} starClick={handleStar} />
      <Star number={4} starClick={handleStar} />
      <Star number={3} starClick={handleStar} />
      <Star number={2} starClick={handleStar} />
      <Star number={1} starClick={handleStar} />
    </div>
  );

  const handleStar = (num) => {
    dispatch({ type: "SEARCH_QUERY", payload: { text: "" } });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar(num);
    setSub("");
    setBrand("");
    setColor("");
    setShipping("");

    fetchFilteredProducts({ stars: num });
  };

  // * loading product by sub category
  const showSubCategories = () =>
    subCategories.map((s) => (
      <div
        className="p-1 m-1 badge badge-secondary"
        style={{ cursor: "pointer" }}
        onClick={() => handleSubmit(s)}
        key={s._id}
      >
        {s.name}
      </div>
    ));

  const handleSubmit = (sub) => {
    setSub(sub);
    dispatch({ type: "SEARCH_QUERY", payload: { text: "" } });
    setPrice([0, 0]);
    setCategoryIds([]);
    setStar("");
    setBrand("");
    setColor("");
    setShipping("");

    fetchFilteredProducts({ subcategory: sub });
  };

  // * loading product by brand
  const showBrands = () =>
    brands.map((b) => (
      <Radio
        key={b._id}
        name={b}
        className="pb-2 pl-4 pr-4"
        value={b}
        checked={b === brand}
        onChange={handleBrand}
      >
        {b}
      </Radio>
    ));

  const handleBrand = (e) => {
    dispatch({ type: "SEARCH_QUERY", payload: { text: "" } });
    setCategoryIds([]);
    setPrice([0, 0]);
    setStar("");
    setSub("");
    setColor("");
    setShipping("");

    setBrand(e.target.value);
    fetchFilteredProducts({ brand: e.target.value });
  };

  const showColors = () =>
    colors.map((c) => (
      <Radio
        key={c._id}
        name={c}
        className="pb-2 pl-4 pr-4"
        value={c}
        checked={c === color}
        onChange={handleColor}
      >
        {c}
      </Radio>
    ));

  const handleColor = (e) => {
    dispatch({ type: "SEARCH_QUERY", payload: { text: "" } });
    setCategoryIds([]);
    setPrice([0, 0]);
    setStar("");
    setSub("");
    setBrand("");
    setShipping("");

    setColor(e.target.value);
    fetchFilteredProducts({ color: e.target.value });
  };

  const showShipping = (e) =>
    shippings.map((s) => (
      <div key={s._id}>
        <Radio
          name={s}
          className="pb-2 pl-4 pr-4"
          value={s}
          checked={s === shipping}
          onChange={handleShipping}
        >
          {s}
        </Radio>
      </div>
    ));

  const handleShipping = (e) => {
    dispatch({ type: "SEARCH_QUERY", payload: { text: "" } });
    setCategoryIds([]);
    setPrice([0, 0]);
    setStar("");
    setSub("");
    setBrand("");
    setColor("");

    setShipping(e.target.value);
    fetchFilteredProducts({ shipping: e.target.value });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 mt-2">
          <h4>Filter</h4>
          <hr />
          <Menu
            mode="inline"
            defaultOpenKeys={["1", "2", "3", "4", "5", "6", "7"]}
          >
            <SubMenu
              key="1"
              title={
                <span>
                  <DollarOutlined />
                  Price
                </span>
              }
            >
              <Slider
                className="ml-4 mr-4"
                tipFormatter={(value) => `$ ${value}`}
                range
                max="4999"
                value={price}
                onChange={handleSlider}
              />
            </SubMenu>

            <SubMenu
              key="2"
              title={
                <span>
                  <DownSquareOutlined />
                  Category
                </span>
              }
            >
              {showCategories()}
            </SubMenu>

            <SubMenu
              key="3"
              title={
                <span>
                  <StarOutlined />
                  Rating
                </span>
              }
            >
              {showStars()}
            </SubMenu>

            <SubMenu
              key="4"
              title={
                <span>
                  <TagsOutlined />
                  Sub Category
                </span>
              }
            >
              <div className="pl-4 pr-4">{showSubCategories()}</div>
            </SubMenu>

            <SubMenu
              key="5"
              title={
                <span>
                  <FireOutlined />
                  Brand
                </span>
              }
            >
              {showBrands()}
            </SubMenu>

            <SubMenu
              key="6"
              title={
                <span>
                  <BgColorsOutlined />
                  Color
                </span>
              }
            >
              {showColors()}
            </SubMenu>

            <SubMenu
              key="7"
              title={
                <span>
                  <TransactionOutlined />
                  Shipping
                </span>
              }
            >
              {showShipping()}
            </SubMenu>
          </Menu>
        </div>
        <div className="col-md-9 mt-2">
          <h4 className="text-black">Products</h4>
          <hr />

          {products.length < 1 && <p>No products found</p>}

          <div className="row">
            {loading ? (
              <div className="mt-3 col-md-12 text-center">
                <Spin tip="Loading...." size="large"></Spin>
              </div>
            ) : (
              products.map((product) => (
                <div className="col-md-4 mb-3" key={product._id}>
                  <ProductCard key={product._id} product={product} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
