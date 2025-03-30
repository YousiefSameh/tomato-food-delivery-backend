import userModel from "../models/user.model.js";

/**
 *  @desc    Get logged user cart
 *  @route   /api/cart
 *  @method  GET
 *  @access  private (logged in user)
*/

const getLoggedUserCart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.body.userId);
    const cartData = await userData.cartData;
    res.json({ success: true, cartData });
  } catch (error) {
    res.json({ success: false, message: "Error: " + error });
  }
}

/**
 *  @desc    Add product to cart
 *  @route   /api/cart
 *  @method  POST
 *  @access  private (logged in user)
*/

const addProductToCart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.body.userId);
    const cartData = await userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "The Product Added To Cart Successfully" });
  } catch (error) {
    res.json({ success: false, message: "Error: " + error });
  }
}

/**
 *  @desc     Remove specific cart item
 *  @route   /api/cart/id
 *  @method  DELETE  
 *  @access  private (logged in user)
*/

const removeFromCart = async (req, res) => {
  try {
    const userData = await userModel.findById(req.body.userId);
    const cartData = await userData.cartData;
    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1
    } else if (cartData[req.body.itemId]) {
      delete cartData[req.body.itemId];
    } else {
      return res.status(404).json({ success: false, message: "The Product Doesn't Exists In Cart" });
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "The Product Removed Successfully" });
  } catch (error) {
    res.json({ success: false, message: "Error: " + error });
  }
}

export { getLoggedUserCart, addProductToCart, removeFromCart };