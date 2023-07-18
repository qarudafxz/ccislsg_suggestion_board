import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import mongoose from "mongoose";

//routes imports
import { SuggestionRoute } from "./routes/Suggestion.js";
import { AuthRouter } from "./routes/Auth.js";

dotenv.config();
const app = express();

const MONGODB_URI = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_USERNAME}.2rbik0u.mongodb.net/CCISLSG_Suggestions?retryWrites=true&w=majority`;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	cors({
		origin: "*",
		methods: ["GET", "POST", "PUT", "DELETE"],
		credentials: true,
	})
);
app.use(morgan("tiny"));
app.disable("x-powered-by");

//routes
app.use("/api/sug", SuggestionRoute);
app.use("/api/auth", AuthRouter);

try {
	mongoose
		.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
		.then(() => console.log("Connection established to CCISLSG MongoDB"));
} catch (err) {
	console.log(err);
}

export default app;
