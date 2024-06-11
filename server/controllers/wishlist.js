const User = require("../models/User");


// Add product to user's wishlist
exports.addToWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Check if the product is already in the wishlist
    if (user.wishlist.includes(productId)) {
      return res.status(400).json({ success: false, message: "Product already in wishlist" });
    }

    // Add the product to the user's wishlist
    user.wishlist.push(productId);
    await user.save();

    // Populate the wishlist with product details
    // await user.populate("wishlist").execPopulate();

    res.status(200).json({ success: true, message: "Product added to wishlist successfully"  });
  } catch (error) {
    console.error("Error adding product to wishlist:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Remove product from user's wishlist
exports.removeFromWishlist = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Check if the product is in the wishlist
    const index = user.wishlist.indexOf(productId);
    if (index === -1) {
      return res.status(400).json({ success: false, message: "Product not found in wishlist" });
    }

    // Remove the product from the user's wishlist
    user.wishlist.splice(index, 1);
    await user.save();

    // Populate the wishlist with product details
    // await user.populate("wishlist").execPopulate();

    res.status(200).json({ success: true, message: "Product removed from wishlist successfully" });
  } catch (error) {
    console.error("Error removing product from wishlist:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


// Get user's wishlist
exports.getUserWishlist = async (req, res) => {
  try {
    const userId = req.user.id;

    // Find the user by ID and populate the wishlist field with product details
    const user = await User.findById(userId).populate("wishlist");

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.status(200).json({ success: true, wishlist: user.wishlist });
  } catch (error) {
    console.error("Error fetching user's wishlist:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
