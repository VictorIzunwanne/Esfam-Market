const User = require("../models/userModel");

exports.logUserIn = async (req, res) => {
  const user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };

  try {
    const userExist = await User.findOne({ email: user.email });

    if (!userExist) {
      res.status(200).json({
        message:
          "There is no account associated with this email. Please signup",
      });

      return;
    }

    if (userExist.userName !== user.name) {
      res
        .status(200)
        .json({ message: "The user name you provided is incorrect" });

      return;
    }

    if (userExist.password !== user.password) {
      res.status(200).json({ message: "Incorrect password" });

      return;
    }

    res.status(200).json({
      message: `Welcome, ${userExist.firstName}.`,
      isSeller: userExist.isSeller,
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", err });
  }
};
