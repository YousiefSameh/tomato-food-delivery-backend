import Stripe from "stripe";
import userModel from "../models/user.model.js";
import orderModel from "../models/order.model.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * @desc    Place Order
 * @route   /api/order/place
 * @method  POST
 * @access  private (logged in user)
*/

const placeOrder = async (req, res) => {

  const frontend_url = "http://localhost:5173";

  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name
        },
        unit_amount: item.price * 100 * 80
      },
      quantity: item.quantity
    }));

    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Delivery Charges"
        },
        unit_amount: 2*100*80
      },
      quantity: 1
    });

    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: 'payment',
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
    });

    res.json({ success: true, session_url: session.url })
  } catch (error) {
    res.json({ success: false, message: "Error: " + error });
  }
}

/**
 * @desc    Verify Order
 * @route   /api/order/verify
 * @method  GET
 * @access  private (logged in user)
*/

const verifyOrder = async (req, res) => {
  try {
    const { orderId, success } = req.body;

    if (!orderId) {
      return res.status(400).json({ success: false, message: "Order ID is required" });
    }

    const order = await orderModel.findById(orderId);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found" });
    }

    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true })
      return res.json({ success: true, message: "Order payment verified successfully" });
    } else {
      await orderModel.findByIdAndDelete(orderId)
      return res.json({ success: false, message: "Order payment failed or cancelled" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Error: " + error });
  }
};

export { placeOrder, verifyOrder };