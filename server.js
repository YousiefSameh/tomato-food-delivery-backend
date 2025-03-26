import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/food.routes.js";

// App Configs
const app = express();
const port = 4000;

// Middlewares
app.use(express.json());
app.use(cors());

// Database Connection
connectDB();

// API Endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));

app.get("/", (req, res) => res.status(200).send("API Working !"));

// Listen
app.listen(port, () => {
	console.log(`Server running on port http://localhost:${port}`);
});
