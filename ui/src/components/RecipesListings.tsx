import React from "react";
import RecipeListing, { RecipeListingDetails } from "./RecipeListing";

const RecipesListings = ({ recipes }: { recipes: RecipeListingDetails[] }) => {
  return (
    <div className="flex flex-wrap">
      {recipes.map((recipe) => (
        <RecipeListing {...recipe} />
      ))}
    </div>
  );
};

export default RecipesListings;
