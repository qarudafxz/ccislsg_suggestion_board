import express from "express";

//controllers
import {
	addSuggestion,
	addComment,
	editSuggestion,
	getAllSuggestions,
	getTopSuggestions,
	getLatestSug,
	getYourSuggestions,
	deleteSuggestion,
	getUserDetails,
	topUsers,
	getOneSugBasedOnId,
} from "../controllers/suggestionFuncs.js";

//middlewares
import { isAuthenticated } from "../middlewares/isAuth.js";

const router = express.Router();

//isAuth function must be added later if the frontend is already setted up
router.get("/user/:id", getUserDetails);
router.get("/top-suggestions", isAuthenticated, getTopSuggestions);
router.get("/get-latest-sug/", isAuthenticated, getLatestSug);
router.get("/get-suggest/:id", getOneSugBasedOnId);
router.get("/your-suggestions", getYourSuggestions);
router.get("/all", getAllSuggestions);
router.get("/top-5", topUsers);

router.post("/suggest/:id", isAuthenticated, addSuggestion);
router.post("/add-comment/:userID/:sugID", addComment);

router.put("/edit-suggest/:id", isAuthenticated, editSuggestion);

router.delete(
	"/delete-suggestion/:userID/:sugID",

	deleteSuggestion
);

export { router as SuggestionRoute };
