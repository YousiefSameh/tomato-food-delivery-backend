import foodModel from "../models/food.model.js";
import fs from "fs";

/**
 * @desc    Get all food
 * @route   /api/food
 * @method  GET
 * @access  public
*/

const getAllFood = async (req, res) => {
	try {
		const foods = await foodModel.find({});
		res.json({ success: true, data: foods });
	} catch (error) {
		res.json({ success: false, message: "Error: " + error });
	}
};

/**
 * @desc    Add food
 * @route   /api/food/add
 * @method  POST
 * @access  public
*/

const addFoodItem = async (req, res) => {
	const image_filename = `${req.file.filename}`;
	const food = new foodModel({
		name: req.body.name,
		description: req.body.description,
		price: req.body.price,
		category: req.body.category,
		image: image_filename,
	});

	try {
		const newFood = await food.save();
		res.status(201).json({ success: true, message: "Food Added Successfully" });
	} catch (error) {
		res
			.status(400)
			.json({ success: false, message: "Error: " + error.message });
		fs.unlinkSync(`uploads/${image_filename}`);
	}
};

/**
 * @desc    Remove food
 * @route   /api/food/remove
 * @method  DELETE
 * @access  public
*/
const removeFoodItem = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    fs.unlink(`uploads/${food.image}`, () => {});

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food Removed Successfully" })
  } catch (error) {
    res.json({ success: false, message: "Error: " + error })
  }
}

export { getAllFood, addFoodItem, removeFoodItem };
