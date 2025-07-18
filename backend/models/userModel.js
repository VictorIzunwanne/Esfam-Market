const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  userName: String,
  gender: String,
  email: String,
  isSeller: Boolean,
  password: String,
});

module.exports = mongoose.model("User", userSchema);
