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

    const isMatch = await userExist.comparePassword(user.password);

    if (!isMatch) {
      res.status(200).json({ message: "Incorrect password" });

      return;
    }

    const sessionToken = userExist._id;

    res.cookie("session", sessionToken, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24,
    });

    res.status(200).json({
      message: `Welcome, ${userExist.firstName}.`,
      isSeller: userExist.isSeller,
    });
  } catch (err) {
    res.status(500).json({ message: "Something went wrong", err });
  }
};

exports.logUserOut = async (req, res) => {
  try {
    res.clearCookie("session", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
    });

    res.status(200).json({ message: "You have been logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error logging out" });
  }
};
