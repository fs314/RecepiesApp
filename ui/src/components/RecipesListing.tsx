import React from "react";
import { recipesListingProps } from "../types";
import Recipe from "./Recipe";

const RecipesListing = ({ recipes }: recipesListingProps) => {
  return (
    <div className="flex justify-evenly flex-wrap">
      {recipes.map((recipe) => {
        return <Recipe {...recipe} />;
      })}
    </div>
  );
};

export default RecipesListing;
