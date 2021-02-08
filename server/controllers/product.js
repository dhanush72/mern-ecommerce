const User = require("../models/user");
const Product = require("../models/product");
const slufigy = require("slugify");

exports.create = async (req, res) => {
  try {
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

exports.listAll = async (req, res) => {
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

exports.remove = async (req, res) => {
  try {
    const deleted = await Product.findOneAndRemove({
      slug: req.params.slug,
    }).exec();
    res.json(deleted);
  } catch (error) {
    res.status(400).send("Delete product failed");
  }
};

exports.read = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .populate("category")
      .populate("subcategory")
      .exec();
    res.json(product);
  } catch (error) {
    res.status(400).send(" product not found");
  }
};

exports.update = async (req, res) => {
  const { name } = req.body;
  try {
    // ? update slug
    if (req.body.title) {
      req.body.slug = slufigy(req.body.title);
    }
    const updated = await Product.findOneAndUpdate(
      { slug: req.params.slug },
      req.body,
      // ? to get newly updated data
      { new: true }
    ).exec();
    res.json(updated);
  } catch (error) {
    console.log("product update:", error);
    res.status(400).json({
      error: error.message,
    });
  }
};

// exports.list = async (req, res) => {
//   try {
//     // ? createdAt/updateAt, asc/desc, 3
//     const { sort, order, limit } = req.body;

//     const products = await Product.find({})
//       .populate("category")
//       .populate("subcategory")
//       .sort([[sort, order]])
//       .limit(limit)
//       .exec();
//     res.json(products);
//   } catch (error) {
//     console.log("list", error);
//     res.status(400).send("product not found");
//   }
// };

// * with pagination
exports.list = async (req, res) => {
  try {
    // ? createdAt/updateAt, asc/desc, 3
    const { sort, order, page } = req.body;
    const currentPage = page || 1;
    const perPage = 3;

    const products = await Product.find({})
      // ? skip products
      .skip((currentPage - 1) * perPage)
      .populate("category")
      .populate("subcategory")
      .sort([[sort, order]])
      .limit(perPage)
      .exec();
    res.json(products);
  } catch (error) {
    console.log("list", error);
    res.status(400).send("product not found");
  }
};

exports.productsCount = async (req, res) => {
  const total = await Product.find({}).estimatedDocumentCount().exec();
  res.json(total);
};

exports.productStar = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec();
  const user = await User.findOne({ email: req.user.email }).exec();
  const { star } = req.body;

  // ? check who is updating & ratings
  const existingRatingObject = product.ratings.find(
    (ele) => ele.postedBy.toString() === user._id.toString()
  );

  // ? if no ratings, push it
  if (existingRatingObject === undefined) {
    const ratingAdded = await Product.findByIdAndUpdate(
      product._id,
      {
        $push: {
          ratings: {
            star,
            postedBy: user._id,
          },
        },
      },
      { new: true }
    ).exec();
    res.json(ratingAdded);
  } else {
    // ? if user left ratings, update it
    const ratingUpdated = await Product.updateOne(
      {
        ratings: {
          $elemMatch: existingRatingObject,
        },
      },
      {
        $set: {
          "ratings.$.star": star,
        },
      },
      { new: true }
    ).exec();
    res.json(ratingUpdated);
  }
};

exports.related = async (req, res) => {
  const product = await Product.findById(req.params.productId).exec();

  const listRelated = await Product.find({
    _id: { $ne: product._id },
    category: product.category,
  })
    .limit(3)
    .populate("category")
    .populate("subcategory")
    .populate("postedBy")
    .exec();
  res.json(listRelated);
};

const handleQuery = async (req, res, query) => {
  const products = await Product.find({ $text: { $search: query } })
    .populate("category", "_id name")
    .populate("subcategory", "_id name")
    .populate("postedBy", "_id name")
    .exec();
  res.json(products);
};

const handlePrice = async (req, res, price) => {
  try {
    const products = await Product.find({
      price: {
        $gte: price[0],
        $lte: price[1],
      },
    })
      .populate("category", "_id name")
      .populate("subcategory", "_id name")
      .populate("postedBy", "_id name")
      .exec();
    res.json(products);
  } catch (error) {
    console.log("filter price error =>", error);
    res.status(400).send("filter price error");
  }
};

const handleCategory = async (req, res, category) => {
  try {
    const products = await Product.find({ category })
      .populate("category", "_id name")
      .populate("subcategory", "_id name")
      .populate("postedBy", "_id name")
      .exec();
    res.json(products);
  } catch (error) {
    console.log("filter price error =>", error);
    res.status(400).send("filter category error");
  }
};

const handleStar = (req, res, stars) => {
  Product.aggregate([
    {
      $project: {
        document: "$$ROOT",
        floorAverage: {
          $floor: {
            $avg: "$ratings.star",
          },
        },
      },
    },
    { $match: { floorAverage: stars } },
  ])
    .limit(12)
    .exec((err, result) => {
      if (err) console.log("star error =>", error);
      Product.find({ _id: result })
        .populate("category", "_id name")
        .populate("subcategory", "_id name")
        .populate("postedBy", "_id name")
        .exec((err, products) => {
          if (err) console.log("star product error =>", error);
          res.json(products);
        });
    });
};

const handleSubCategory = async (req, res, subcategory) => {
  const products = await Product.find({ subcategory })
    .populate("category", "_id name")
    .populate("subcategory", "_id name")
    .populate("postedBy", "_id name")
    .exec();
  res.json(products);
};

const handleBrand = async (req, res, brand) => {
  const products = await Product.find({ brand })
    .populate("category", "_id name")
    .populate("subcategory", "_id name")
    .populate("postedBy", "_id name")
    .exec();
  res.json(products);
};

const handleColor = async (req, res, color) => {
  const products = await Product.find({ color })
    .populate("category", "_id name")
    .populate("subcategory", "_id name")
    .populate("postedBy", "_id name")
    .exec();
  res.json(products);
};

const handleShipping = async (req, res, shipping) => {
  const products = await Product.find({ shipping })
    .populate("category", "_id name")
    .populate("subcategory", "_id name")
    .populate("postedBy", "_id name")
    .exec();
  res.json(products);
};

// ? search & filter
exports.searchFilters = async (req, res) => {
  const {
    query,
    price,
    category,
    stars,
    subcategory,
    brand,
    color,
    shipping,
  } = req.body;

  if (query) {
    await handleQuery(req, res, query);
  }

  if (price !== undefined) {
    await handlePrice(req, res, price);
  }

  if (category) {
    await handleCategory(req, res, category);
  }

  if (stars) {
    await handleStar(req, res, stars);
  }

  if (subcategory) {
    await handleSubCategory(req, res, subcategory);
  }

  if (brand) {
    await handleBrand(req, res, brand);
  }

  if (color) {
    await handleColor(req, res, color);
  }

  if (shipping) {
    await handleShipping(req, res, shipping);
  }
};
