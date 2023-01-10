import mongoose from "mongoose";

const recipesListingSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
  },
  cookingTime: {
    type: String,
  },
  tags: [
    {
      type: String,
    },
  ],
});

const RecipesListing = mongoose.model("RecipesListing", recipesListingSchema);

export default RecipesListing;
