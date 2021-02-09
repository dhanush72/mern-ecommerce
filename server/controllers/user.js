const User = require("../models/user");
const Product = require("../models/product");
const Cart = require("../models/cart");
const Coupon = require("../models/coupon");

exports.userCart = async (req, res) => {
  const { cart } = req.body;

  let products = [];
  const user = await User.findOne({ email: req.user.email }).exec();

  // * check if cart with logged in user id already exists
  let cartExistsByUser = await Cart.findOne({ orderedBy: user._id }).exec();

  if (cartExistsByUser) {
    cartExistsByUser.remove();
    console.log("removed old cart");
  }

  for (let i = 0; i < cart.length; i++) {
    let obj = {};

    obj.product = cart[i]._id;
    obj.count = cart[i].count;
    obj.color = cart[i].color;

    let productFromDB = await Product.findById(cart[i]._id)
      .select("price")
      .exec();
    obj.price = productFromDB.price;

    products.push(obj);
  }

  //   console.log("products", products);

  let cartTotal = 0;
  for (let i = 0; i < products.length; i++) {
    cartTotal = cartTotal + products[i].price * products[i].count;
  }

  //   console.log("cartTotal", cartTotal);

  //* new cart
  const newCart = await new Cart({
    products,
    cartTotal,
    orderedBy: user._id,
  }).save();
  console.log("added new cart");
  res.json({ ok: true });
};

exports.getUserCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();

  const cart = await Cart.findOne({ orderedBy: user._id })
    .populate("products.product", "_id, title price totalAfterDiscount")
    .exec();

  const { products, cartTotal, totalAfterDiscount } = cart;
  res.json({ products, cartTotal, totalAfterDiscount });
};

exports.emptyCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();

  const cart = await Cart.findOneAndRemove({ orderedBy: user._id }).exec();
  res.json(cart);
};

exports.userAddress = async (req, res) => {
  const saveAddress = await User.findOneAndUpdate(
    { email: req.user.email },
    {
      address: req.body.address,
    }
  ).exec();
  res.json({ ok: true });
};

exports.applyCoupon = async (req, res) => {
  const { coupon } = req.body;

  const validCoupon = await Coupon.findOne({ name: coupon }).exec();

  if (validCoupon === null) {
    return res.json({
      error: "Invalid coupon",
    });
  }

  const user = await User.findOne({ email: req.user.email }).exec();

  let { products, cartTotal } = await Cart.findOne({ orderedBy: user._id })
    .populate("products.product", "_id title price")
    .exec();

  //* calculate total after discount
  let totalAfterDiscount = (
    cartTotal -
    (cartTotal * validCoupon.discount) / 100
  ).toFixed(2);

  await Cart.findOneAndUpdate({ orderedBy: user._id }, totalAfterDiscount, {
    new: true,
  });

  res.json(totalAfterDiscount);
};
