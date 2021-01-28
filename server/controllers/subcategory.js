const SubCategory = require("../models/subcategory");
const slufigy = require("slugify");

// * create subcategory
exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    const category = await new SubCategory({
      name,
      slug: slufigy(name),
    }).save();
    res.json(category);
  } catch (error) {
    console.log(error);
    res.status(400).send("subcategory create failed");
  }
};

// * get single subcategory
exports.read = async (req, res) => {
  try {
    const category = await SubCategory.findOne({
      slug: req.params.slug,
    }).exec();
    res.json(category);
  } catch (error) {
    res.status(400).send("subcategory not found");
  }
};

// * get all subcategories
exports.list = async (req, res) => {
  const categoriesList = await SubCategory.find({})
    .sort({ createdAt: -1 })
    .exec();
  res.json(categoriesList);
};

// * update subcategory
exports.update = async (req, res) => {
  const { name } = req.body;
  try {
    const updated = await SubCategory.findOneAndUpdate(
      { slug: req.params.slug },
      { name, slug: slufigy(name) },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    res.status(400).send("subcategory update failed");
  }
};

// * remove category
exports.remove = async (req, res) => {
  try {
    const deleted = await SubCategory.findOneAndDelete({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (error) {
    res.status(400).send("subcategory delete failed");
  }
};
