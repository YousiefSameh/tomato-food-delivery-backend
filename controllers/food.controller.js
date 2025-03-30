import foodModel from "../models/food.model.js";
import fs from "fs";

/**
 * @desc    Get all food
 * @route   /api/food
 * @method  GET
 * @access  public
*/

const getAllFood = async (_, res) => {
	try {
		const foods = await foodModel.find({});
		res.json({ success: true, data: foods });
	} catch (error) {
		res.json({ success: false, message: "Error: " + error });
	}
};

/**
 * @desc    Get multiple food items by IDs from query params
 * @route   /api/food/multiple
 * @method  GET
 * @access  public
 */

const getMultipleFoodByIds = async (req, res) => {
  try {
    const idsParam = req.params.ids;

    if (!idsParam) {
      return res.status(400).json({
        success: false,
        message: "No IDs provided in query params",
      });
    }

    const ids = idsParam.split("&");

    if (ids.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid or empty IDs array",
      });
    }

    const foods = await foodModel.find({ _id: { $in: ids } });

    res.json({ success: true, data: foods });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error: " + error.message,
    });
  }
};

/**
 * @desc    Add food
 * @route   /api/food/add
 * @method  POST
 * @access  public
*/

const addFoodItem = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ 
      success: false, 
      message: "No image uploaded" 
    });
  }
  
  if (!req.body.name || !req.body.description || !req.body.price || !req.body.category) {
    return res.status(400).json({ 
      success: false, 
      message: "All Fields Are Required (name, description, price, category)" 
    });
  }

  const image_filename = req.file.filename;

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });

  try {
    await food.save();
    res.status(201).json({ 
      success: true, 
      message: "Food Added Successfully" 
    });
  } catch (error) {
    fs.unlinkSync(`uploads/${image_filename}`);
    res.status(400).json({ 
      success: false, 
      message: "Error: " + error.message
    });
  }
};


/**
 * @desc    Remove food
 * @route   /api/food/remove
 * @method  POST
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

export { getAllFood, getMultipleFoodByIds, addFoodItem, removeFoodItem };
