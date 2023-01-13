import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ALL_RECEPIES } from "../config/urlConfig";
import axios from "../api/axios";

type RecipeListing = {
  title: string;
  difficulty: string;
  cookingTime: string;
  tags: string[];
  username: string;
};

const Browse = () => {
  const [recipes, setRecipes] = useState<RecipeListing[]>([]);

  const getRecipesListings = async () => {
    try {
      const response = await axios.get(ALL_RECEPIES);

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
        <div className="flex flex-wrap">
          {recipes.map((recipe) => (
            // to define _id
            <Link to={`/recipe/recipeid`}>
              <div className="bg-slate-300 p-2 m-4">
                <div>
                  <p>{recipe.title}</p>
                </div>
                <div>
                  <p className="inline-block">{recipe.cookingTime}</p>{" "}
                  <p className="inline-block">{recipe.difficulty}</p>
                </div>
                <div>
                  {recipe.tags.map((tag) => (
                    <p className="inline-block">{`#${tag}`}</p>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p>no recipes to display</p>
      )}
    </div>
  );
};

export default Browse;
