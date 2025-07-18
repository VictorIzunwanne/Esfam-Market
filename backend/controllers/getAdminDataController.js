const Admin = require("../models/adminModel");

exports.getAdminData = async (req, res) => {
  try {
    const availAdmin = await Admin.find();

    const admin = {
      name: availAdmin[0].name,
      email: availAdmin[0].email,
      password: "Hidden123",
    };

    res.status(200).json(admin);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occured while trying to fetch admin data" });
  }
};
