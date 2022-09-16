import React from "react";
// import { RecipesListingProps } from "../types";
import Recipe from "./Recipe";

const RecipesListing = ({ recipes }: any) => {
  return (
    <div className="flex justify-evenly flex-wrap">
      {recipes.map((recipe: any) => {
        return <Recipe recipeDetails={recipe} />;
      })}
    </div>
  );
};

export default RecipesListing;
