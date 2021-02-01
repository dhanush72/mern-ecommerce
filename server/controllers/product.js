const Product = require("../models/product");
const slufigy = require("slugify");

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    // ? sending slug to backend
    req.body.slug = slufigy(req.body.title);
    const newProduct = await new Product(req.body).save();
    res.json(newProduct);
  } catch (error) {
    console.log("create product:", error);
    // res.status(400).send("Create product failed");
    res.status(400).json({
      error: error.message,
    });
  }
};

exports.relistAll = async (req, res) => {
  try {
    const products = await Product.find({})
      .limit(parseInt(req.params.count))
      .populate("category")
      .populate("subcategory")
      .sort([["createdAt", "desc"]])
      .exec();
    res.json(products);
  } catch (error) {
    res.status(400).send(" product not found");
  }
};
