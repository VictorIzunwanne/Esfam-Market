const User = require("../models/userModel");
const Product = require("../models/productModel");

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

exports.getParticularUser = async (req, res) => {
  try {
    const myUser = {
      name: req.params.userName,
    };

    const user = await User.findOne({ userName: myUser.name });

    if (!user) {
      res
        .status(404)
        .json({ message: "Your information does not exist in the database" });

      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong in the server",
      details: error.message,
    });
  }
};

exports.addProductToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cartItem = {
      productId: req.body.productId,
      productName: req.body.productName,
      productPrice: req.body.productPrice,
      productImage: req.body.productImage,
      numOfItem: req.body.numOfItem,
    };

    const productExist = await Product.findById(cartItem.productId);

    if (!productExist) {
      res
        .status(401)
        .json({ messsage: "This product no longer exist in the database" });

      return;
    }

    const userExist = await User.findOne({ _id: userId });

    if (!userExist) {
      res
        .status(401)
        .json({ message: "User information not found in database." });

      return;
    }

    const checkIfProductExistInCart = userExist.cart.find(
      (item) => item.productId.toString() === cartItem.productId
    );

    if (!checkIfProductExistInCart) {
      userExist.cart.push(cartItem);
      await userExist.save();

      res
        .status(200)
        .json({ message: "Product has been successfully added to cart" });

      return;
    }

    checkIfProductExistInCart.numOfItem += cartItem.numOfItem;
    const saved = await userExist.save();

    res.status(200).json({ message: "Cart has been updated" });
  } catch (error) {
    res.status(500).json({
      message: "Could not add product to cart. Server error",
      details: error.message,
    });
  }
};

exports.getUserCart = async (req, res) => {
  try {
    const userId = req.user._id;

    const userExist = await User.findById(userId);

    if (!userExist) {
      res
        .status(401)
        .json({ message: "User information is not in the database" });

      return;
    }

    res.status(200).json(userExist.cart);
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong in the server",
      details: error.message,
    });
  }
};

exports.deleteProductFromCart = async (req, res) => {
  try {
    const userName = req.params.loggedUser;
    const itemId = req.body.itemId;

    const userExist = await User.findOne({ userName });

    if (!userExist) {
      return res.status(404).json({
        message: "User information could not be found in the database",
      });
    }

    const productIndex = userExist.cart.findIndex(
      (item) => item.productId === itemId
    );

    if (productIndex === -1) {
      return res
        .status(404)
        .json({ message: "Product does not exist in cart" });
    }

    userExist.cart.splice(productIndex, 1);
    await userExist.save();

    res.status(200).json({ message: "Product has been deleted from cart" });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong in the server",
      details: error.message,
    });
  }
};
