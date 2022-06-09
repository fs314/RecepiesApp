import React from "react";
import { RecipesListingProps } from "../types";
import Recipe from "./Recipe";

const RecipesListing = ({ recipes }: RecipesListingProps) => {
  return (
    <div className="flex justify-evenly flex-wrap">
      {recipes.map((recipe) => {
        return <Recipe {...recipe} />;
      })}
    </div>
  );
};

export default RecipesListing;
