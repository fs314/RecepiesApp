import express from "express";
import { addRecipeListing, getRecipesListings } from "../controllers/recipes";

const router = express.Router();

router.get("/", getRecipesListings);
router.post("/", addRecipeListing);

export default router;
