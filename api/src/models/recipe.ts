import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
  name: String,
  instructions: String,
  ingredients: [
    {
      type: String,
      qty: Number,
      measurement: String,
    },
  ],
  serves: Number,
  cookingTime: {
    amount: Number,
    unit: String,
  },
  images: [String],
  tags: [String],
});

const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;
