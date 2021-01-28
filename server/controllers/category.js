const Category = require("../models/category");
const slufigy = require("slugify");

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
exports.read = async (req, res) => {};
exports.list = async (req, res) => {};
exports.update = async (req, res) => {};
exports.remove = async (req, res) => {};
