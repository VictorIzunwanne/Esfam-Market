const User = require("../models/userModel");

exports.signUserUp = async (req, res) => {
  const user = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    userName: req.body.userName,
    gender: req.body.gender,
    email: req.body.email,
    password: req.body.password,
    isSeller: req.body.isSeller,
  };

  try {
    const userNameExist = await User.findOne({ userName: user.userName });
    const userEmailExist = await User.findOne({ email: user.email });

    if (userNameExist) {
      res
        .status(200)
        .json({ message: "User name has been taken. Please use another" });

      return;
    }

    if (userEmailExist) {
      res.status(200).json({ message: "Email exist already. Please login" });

      return;
    }

    const newUser = new User(user);

    const saved = await newUser.save();

    res.status(200).json({
      message: `You have successfully created your account. Use ${saved.userName} and ${saved.email} to login`,
    });
  } catch (error) {
    res.status(500).json({ errorCode: error, message: "A problem occurred" });
  }
};
