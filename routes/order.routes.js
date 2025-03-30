import express from "express";
import authMiddleware from "../middleware/auth.js";
import { placeOrder, verifyOrder, getUserOrders } from "../controllers/order.controller.js";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", authMiddleware, verifyOrder);
orderRouter.post("/user-orders", authMiddleware, getUserOrders);

export default orderRouter;