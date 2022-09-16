import express from "express";
import {
  getRecipes,
  getRecipeById,
  getRecipesByName,
  createRecipes,
  deleteRecipe,
  //   updateRecipe,
} from "../controllers/recipe.js";

const router = express.Router();

router.get("/", getRecipes);

router.get("/:id", getRecipeById);

//works only if name matches exactly. case sensitive.
router.get("/byText/:name", getRecipesByName);

router.post("/", createRecipes);

router.delete("/:id", deleteRecipe);

export default router;
