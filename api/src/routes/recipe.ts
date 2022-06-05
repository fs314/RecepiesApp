import express from "express";
import {
  getRecipe,
  //   createRecipe,
  //   updateRecipe,
  //   deleteRecipe,
} from "../controllers/recipe.js";

const router = express.Router();

router.get("/", getRecipe);
// router.post('/', createRecipe())
// router.put('/', updateRecipe())
// router.delete('/', deleteRecipe())

export default router;
