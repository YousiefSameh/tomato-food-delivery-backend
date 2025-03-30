import bcrypt from "bcrypt";
import validator from "validator";
import userModel from "../models/user.model.js";
import { createToken } from "../utils/createToken.js";

/**
 * @desc    Register User
 * @route   /api/user/register
 * @method  POST
 * @access  public
 */

const registerUser = async (req, res) => {
	const { name, email, password } = req.body;
	try {
		// Check if there is user already exists
		const exists = await userModel.findOne({ email });
		if (exists) {
			return res.status(400).json({ success: false, message: "User Already Exists" });
		}

		// Validate email format and strong password
		if (!validator.isEmail(email)) {
			return res.status(400).json({
				success: false,
				message: "Please enter a valid email",
			});
		}

		if (password.length < 8) {
			return res.status(400).json({
				success: false,
				message: "Please enter a password more than 8 characters",
			});
		}

		const lowerCaseLetters = /[a-z]/g;
		if (!password.match(lowerCaseLetters)) {
			return res.status(400).json({
				success: false,
				message: "Please enter a password contain lower case letter",
			});
		}

		const upperCaseLetters = /[A-Z]/g;
		if (!password.match(upperCaseLetters)) {
			return res.status(400).json({
				success: false,
				message: "Please enter a password contain upper case letter",
			});
		}
		
		const numbers = /[0-9]/g;
		if (!password.match(numbers)) {
			return res.status(400).json({
				success: false,
				message: "Please enter a password contain numbers",
			});
		}

		// Hashing user password
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(password, salt);

		const newUser = new userModel({
			name: name,
			email: email,
			password: hashedPassword
		});

		const user = await newUser.save();
		const token = createToken(user._id);
		res.json({ success: true, message: "User Created Successfully", token });

	} catch (error) {
		res.status(400).json({ success: false, message: "Error: " + error });
	}
};

/**
 * @desc    Login User
 * @route   /api/user/login
 * @method  POST
 * @access  public
 */

const loginUser = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await userModel.findOne({ email });
		if (!user) {
			return res.status(400).json({ success: false, message: "User Doesn't Exists" })
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(400).json({ success: false, message: "The Password Is Invalid Credentials" })
		}

		const token = createToken(user._id);
		res.json({ success: true, message: "User Logged Successfully", token })
	} catch (error) {
		res.json({ success: false, message: "Error: " + error });
	}
};

export { registerUser, loginUser };
