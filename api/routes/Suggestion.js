import express from "express";

//controllers
import {
	addSuggestion,
	editSuggestion,
	getTopSuggestions,
	getLatestSug,
	getYourSuggestions,
} from "../controllers/suggestionFuncs.js";

//middlewares
import { isAuthenticated } from "../middlewares/isAuth.js";

const router = express.Router();

//isAuth function must be added later if the frontend is already setted up
router.post("/suggest/:id", isAuthenticated, addSuggestion);
router.put("/edit-suggest/:id", isAuthenticated, editSuggestion);
router.get("/top-suggestions", isAuthenticated, getTopSuggestions);
router.get("/get-latest-sug/", isAuthenticated, getLatestSug);
router.get("/your-suggestions", getYourSuggestions);

export { router as SuggestionRoute };
