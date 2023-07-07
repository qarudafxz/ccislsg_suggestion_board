import mongoose from "mongoose";

const collectionName = "suggestions";

const sugSchema = new mongoose.Schema(
	{
		creatorID: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "users",
			required: true,
		},
		subject: { type: String, required: true },
		suggestion: { type: String, required: true },
	},
	{ timestamps: true }
);

export const Sug = mongoose.model(collectionName, sugSchema);
