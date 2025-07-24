// middleware/authMiddleware.js
const User = require("../models/userModel");

exports.loginMiddleware = async (req, res, next) => {
  const sessionToken = req.cookies.session;

  if (!sessionToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const user = await User.findById(sessionToken).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    res.status(500).json({ message: "Something went wrong" });
  }
};
