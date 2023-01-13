import express from "express";
import {
  addRecipeListing,
  getRecipesListings,
  getUserRecipesListings,
} from "../controllers/recipesListings";

const router = express.Router();

router.get("/", getRecipesListings);
router.post("/", addRecipeListing);
router.get(`/user/:userName`, getUserRecipesListings);

export default router;
