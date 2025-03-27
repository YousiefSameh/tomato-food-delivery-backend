import multer from 'multer';
import express from 'express';
import { addFoodItem, getAllFood, removeFoodItem } from '../controllers/food.controller.js';

const foodRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

foodRouter.get("/", getAllFood);
foodRouter.post('/add', upload.single('image'), addFoodItem);
foodRouter.post("/remove", removeFoodItem);

export default foodRouter;