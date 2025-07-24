const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const cartSchema = new mongoose.Schema({
  userName: String,
  productId: String,
  productName: String,
  productPrice: String,
  productImage: String,
  numOfItem: Number,
});

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  userName: String,
  gender: String,
  cart: [cartSchema],
  email: String,
  isSeller: Boolean,
  password: String,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
