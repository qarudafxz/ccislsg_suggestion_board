import express from "express";

//controllers
import {
	addSuggestion,
	editSuggestion,
} from "../controllers/suggestionFuncs.js";

//middlewares
import { isAuthenticated } from "../middlewares/isAuth.js";

const router = express.Router();

router.post("/suggest/:id", isAuthenticated, addSuggestion);
router.put("/edit-suggest/:id", isAuthenticated, editSuggestion);

export { router as SuggestionRoute };
