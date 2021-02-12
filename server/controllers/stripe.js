const User = require("../models/user");
const Cart = require("../models/cart");
const stripe = require("stripe")(process.env.STRIPE_SECRET);

exports.createPayment = async (req, res) => {
  const { couponApplied } = req.body;

  const user = await await User.findOne({ email: req.user.email }).exec();
  const { cartTotal, totalAfterDiscount } = await Cart.findOne({
    orderedBy: user._id,
  }).exec();

  let finalAmount = 0;

  if (couponApplied && totalAfterDiscount) {
    finalAmount = Math.round(totalAfterDiscount * 100);
  } else {
    finalAmount = Math.round(cartTotal * 100);
  }

  const payment = await stripe.paymentIntents.create({
    amount: finalAmount,
    currency: "inr",
  });
  res.json({
    clientSecret: payment.client_secret,
    cartTotal,
    totalAfterDiscount,
    payable: finalAmount,
  });
};
