import mongoose from "mongoose";

const collectionName = "users";

const UserSchema = new mongoose.Schema({
	username: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	course: { type: String, required: true },
	numberOfSuggestions: { type: Number, default: 0 },
	canSuggest: { type: Boolean, default: true },
});

export const User = mongoose.model(collectionName, UserSchema);
