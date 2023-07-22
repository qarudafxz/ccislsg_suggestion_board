import mongoose from "mongoose";

const collectionName = "suggestions";

const sugSchema = new mongoose.Schema(
	{
		creatorID: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "users",
			required: true,
		},
		creatorName: {
			type: "String",
			required: true,
		},
		subject: { type: String, required: true },
		suggestion: { type: String, required: true },
		upVotes: { type: Number, default: 0 },
		numberOfComments: { type: Number, default: 0 },
	},
	{ timestamps: true }
);

export const Sug = mongoose.model(collectionName, sugSchema);
