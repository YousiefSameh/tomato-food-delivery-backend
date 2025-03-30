import express from "express";
import { getLoggedUserCart, addProductToCart, changeProductQuantity, removeFromCart } from "../controllers/cart.controller.js";
import authMiddleware from "../middleware/auth.js";

const cartRouter = express.Router();

cartRouter.get("/", authMiddleware, getLoggedUserCart);
cartRouter.post("/add", authMiddleware, addProductToCart);
cartRouter.put("/quantity", authMiddleware, changeProductQuantity);
cartRouter.post("/remove", authMiddleware, removeFromCart);

export default cartRouter;