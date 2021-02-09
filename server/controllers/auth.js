const User = require("../models/user");

exports.createUpdateUser = async (req, res) => {
  const { name, picture, email } = req.user;
  // TODO find by email to update name & picture
  const user = await User.findOneAndUpdate(
    { email },
    { name: email.split("@")[0], picture },
    { new: true }
  );

  if (user) {
    res.json(user);
  } else {
    const newUser = await new User({
      email,
      name: email.split("@")[0],
      picture,
    }).save();
    res.json(newUser);
  }
};

exports.currentUser = async (req, res) => {
  const { email } = req.user;

  User.findOne({ email }).exec((err, user) => {
    if (err) throw new Error(err);
    res.json(user);
  });
};
