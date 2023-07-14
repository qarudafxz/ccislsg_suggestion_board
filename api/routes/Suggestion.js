import express from "express";

//controllers
import {
	addSuggestion,
	editSuggestion,
	getTopSuggestions,
} from "../controllers/suggestionFuncs.js";

//middlewares
import { isAuthenticated } from "../middlewares/isAuth.js";

const router = express.Router();

//isAuth function must be added later if the frontend is already setted up
router.post("/suggest/:id", addSuggestion);
router.put("/edit-suggest/:id", editSuggestion);
router.get("/top-suggestions", getTopSuggestions);

export { router as SuggestionRoute };
