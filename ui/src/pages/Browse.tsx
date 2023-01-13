import React, { useEffect } from "react";
import { useState } from "react";
import { LISTINGS_BASE_URL } from "../config/urlConfig";
import axios from "../api/axios";
import { RecipeListingDetails } from "../components/RecipeListing";
import RecipesListings from "../components/RecipesListings";

const Browse = () => {
  const [recipes, setRecipes] = useState<RecipeListingDetails[]>([]);

  const getRecipesListings = async () => {
    try {
      const response = await axios.get(LISTINGS_BASE_URL);

      setRecipes(response?.data.recipes);
    } catch (e) {
      console.log("ERROR: ", e);
    }
  };

  useEffect(() => {
    getRecipesListings();
  }, []);

  return (
    <div className="p-2">
      {recipes?.length ? (
        <RecipesListings recipes={recipes} />
      ) : (
        <p>no recipes to display</p>
      )}
    </div>
  );
};

export default Browse;
