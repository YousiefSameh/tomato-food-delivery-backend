import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/food.routes.js";
import userRouter from "./routes/user.routes.js";
import 'dotenv/config.js';
import cartRouter from "./routes/cart.routes.js";

// App Configs
const app = express();
const port = process.env.PORT || 4000;

// Middlewares
app.use(express.json());
app.use(cors());

// Database Connection
connectDB();

// API Endpoints
app.use("/api/food", foodRouter);
app.use("/api/cart", cartRouter);
app.use("/api/user", userRouter);
app.use("/image", express.static("uploads"));

app.get("/", (req, res) => res.status(200).send("API Working !"));

// Listen
app.listen(port, () => {
	console.log(`Server running on port http://localhost:${port}`);
});
