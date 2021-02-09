const Coupon = require("../models/coupon");

exports.create = async (req, res) => {
  try {
    const { name, expiry, discount } = req.body;
    const coupon = await new Coupon({
      name,
      expiry,
      discount,
    }).save();
    res.json(coupon);
  } catch (error) {
    res.status(401).json(error);
  }
};

exports.list = async (req, res) => {
  try {
    const coupon = await Coupon.find({}).sort({ createdAt: -1 }).exec();
    res.json(coupon);
  } catch (error) {
    res.status(401).json(error);
  }
};

exports.remove = async (req, res) => {
  try {
    const coupon = await Coupon.findByIdAndDelete(req.params.id).exec();
    res.json(coupon);
  } catch (error) {
    res.status(401).json(error);
  }
};
