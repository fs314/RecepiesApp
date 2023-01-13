import React from "react";
import { Link } from "react-router-dom";

export type RecipeListingDetails = {
  title: string;
  difficulty: string;
  cookingTime: string;
  tags: string[];
  username: string;
};

const RecipeListing = (
  recipeListingDetails: RecipeListingDetails
  //link: string
) => {
  const { title, difficulty, cookingTime, tags } = recipeListingDetails;
  const link = `/recipe/recipeid`; // TO CHANGE

  return (
    <Link to={link}>
      <div className="bg-slate-300 p-2 m-4" key={`recipeId`}>
        <div>
          <p>{title}</p>
        </div>
        <div>
          <p className="inline-block">{cookingTime}</p>{" "}
          <p className="inline-block">{difficulty}</p>
        </div>
        <div>
          {tags.map((tag) => (
            <p className="inline-block">{`#${tag}`}</p>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default RecipeListing;
