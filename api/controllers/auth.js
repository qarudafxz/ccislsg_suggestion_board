import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req, res) => {
	const { username, email, password } = req.body;
	try {
		const user = await User.findOne({ email });

		if (user) {
			return res.status(400).json({ message: "Email already exists" });
		}

		const genSalt = 10;
		const hashedPassword = await bcrypt.hash(password, genSalt);

		const newUser = new User({ username, email, password: hashedPassword });
		await newUser.save();

		const payload = {
			user: {
				id: newUser._id,
			},
		};

		const token = jwt.sign(
			payload,
			process.env.JWT_SECRET,
			{ expiresIn: 3600 },
			(err, token) => {
				if (err) throw err;
				return res.status(201).json({ token });
			}
		);

		return res
			.status(200)
			.json({ token, newUser, message: "User registered successfully" });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Server Error" });
	}
};

export const login = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(400).json({ message: "User does not exist" });
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return res.status(400).json({ message: "Invalid credentials" });
		}

		const payload = {
			userID: user._id,
		};

		console.log(process.env.JWT_SECRET);

		const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 });

		return res
			.status(200)
			.json({ token, message: "User logged in successfully" });
	} catch (err) {
		console.log(err);
		return res.status(500).json({ message: "Server Error" });
	}
};
