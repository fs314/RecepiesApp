import React from "react";
import { Link } from "react-router-dom";
// import { Recipe as RecipeProps } from "../types";

const Recipe = (recipeDetails: any) => {
  return (
    <Link to={`details?id=${recipeDetails.recipeDetails._id}`}>
      <div className="border border-black p-2 mt-5">
        <div className="max-w-md" id="image-container">
          <img
            className="max-w-xs"
            src={recipeDetails.recipeDetails.images[0]}
            alt={`${recipeDetails.recipeDetails.name}-img`}
          />
        </div>
        <p className="font-bold underline">
          {recipeDetails.recipeDetails.name}
        </p>
        <p>Serves: {recipeDetails.recipeDetails.serves}</p>
      </div>
    </Link>
  );
};

export default Recipe;
