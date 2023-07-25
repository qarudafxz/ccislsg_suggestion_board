import mongoose from "mongoose";

const collectionName = "comments";

const collectionSchema = new mongoose.Schema(
	{
		creatorID: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "users",
		},
		suggestionID: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "suggestions",
		},
		creatorName: { type: String },
		comment: { type: String, required: true },
	},
	{ timestamps: true }
);

export const Comments = mongoose.model(collectionName, collectionSchema);
