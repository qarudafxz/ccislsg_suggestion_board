import mongoose from "mongoose";

const collectionName = "comments";

const collectionSchema = new mongoose.Schema({
	creatorID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "users",
		required: true,
	},
	suggestionID: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "suggestions",
		required: true,
	},
	comment: { type: String, required: true },
});

export const Comments = mongoose.model(collectionName, collectionSchema);
