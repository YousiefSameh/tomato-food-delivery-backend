import express from "express";
import multer from "multer";
import { addFoodItem, getAllFood, removeFoodItem } from "../controllers/food.controllers.js";

const foodRouter = express.Router();

// Image Storage Engine
const storage = multer.diskStorage({
	destination: "uploads",
	filename: (req, file, cb) => {
		return cb(null, `${Date.now()}${file.originalname}`);
	},
});

const upload = multer({ storage: storage }); 

foodRouter.get("/", getAllFood);
foodRouter.post("/add", upload.single("image"), addFoodItem);
foodRouter.post("/remove", removeFoodItem);

export default foodRouter;
