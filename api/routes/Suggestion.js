import express from "express";
import { addSuggestion } from "../controllers/addSuggestion.js";

const route = express.Router();

route.post("/suggest/:id", addSuggestion);

export { route as SuggestionRoute };
