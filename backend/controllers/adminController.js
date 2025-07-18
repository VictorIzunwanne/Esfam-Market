const Admin = require("../models/adminModel");

exports.logAdmin = async (req, res) => {
  try {
    const adminDetail = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    };

    const accepted = await Admin.findOne(adminDetail);

    accepted
      ? res.status(200).json({ message: `Welcome, ${accepted.name}` })
      : res.status(200).json({ message: "Invalid credentials" });
  } catch (error) {
    res.status(500).json({
      Error: error,
      message: `Something went wrong somewhere, ${error.message}`,
    });
  }
};
