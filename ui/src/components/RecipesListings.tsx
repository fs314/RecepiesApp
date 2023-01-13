import React, { ReactNode } from "react";
import RecipeListing, { RecipeListingDetails } from "./RecipeListing";

const RecipesListings = ({
  recipes,
  children,
}: {
  recipes: RecipeListingDetails[];
  children?: ReactNode;
}) => {
  return (
    <div className="flex flex-wrap">
      {recipes.map((recipe) => (
        <RecipeListing {...recipe} />
      ))}
      {children}
    </div>
  );
};

export default RecipesListings;
