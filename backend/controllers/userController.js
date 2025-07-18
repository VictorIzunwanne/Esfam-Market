const User = require("../models/userModel");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch users", details: error.message });
  }
};

exports.getAParticularUser = async (req, res) => {
  try {
    const user = req.params.userName;

    const details = await User.findOne({ userName: user });

    if (!details) {
      res.status(400).json({ message: "The username is wrong" });

      return;
    }

    res.status(200).json(details.isSeller);
  } catch (error) {
    res.status(500).json({ error: `Failed to fetch user's information` });
  }
};
