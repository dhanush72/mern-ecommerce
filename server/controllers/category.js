const Category = require("../models/category");
const SubCategory = require("../models/subcategory");
const slufigy = require("slugify");

// * create category
exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await new Category({ name, slug: slufigy(name) }).save();
    res.json(category);
  } catch (error) {
    console.log(error);
    res.status(400).send("Create category failed");
  }
};

// * get single category
exports.read = async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug }).exec();
    res.json(category);
  } catch (error) {
    res.status(400).send(" category not found");
  }
};

// * get all categories
exports.list = async (req, res) => {
  const categoriesList = await Category.find({}).sort({ createdAt: -1 }).exec();
  res.json(categoriesList);
};

// * update category
exports.update = async (req, res) => {
  const { name } = req.body;
  try {
    const updated = await Category.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slufigy(name) },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(400).send("Update category failed");
  }
};

// * remove category
exports.remove = async (req, res) => {
  try {
    const deleted = await Category.findOneAndDelete({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (error) {
    res.status(400).send("Delete category failed");
  }
};

exports.getSubCategories = async (req, res) => {
  try {
    SubCategory.find({ parent: req.params._id }).exec((err, data) => {
      if (err) console.log(err);
      res.json(data);
    });
  } catch (error) {
    res.status(400).send("failed");
  }
};
