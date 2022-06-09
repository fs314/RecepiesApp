import React from "react";
import { Recipe } from "../types";

// interface DetailsPageProps {
//     details: Recipe | User
// }

const DetailsPage = ({ details }: { details: Recipe }) => {
  return (
    <div className="w-full h-full flex">
      <div className="grow-0 bg-red-200">
        <div id="image-container">
          <img
            className="max-w-xs"
            src={details.images[0]}
            alt={`${details.name}-img`}
          />
        </div>
        <p className="font-bold underline">{details.name}</p>
        <p>
          Cooking Time: {details.cookingTime.amount}
          {details.cookingTime.unit}
        </p>
        <p>Serves: {details.serves}</p>
        <div>
          Ingredients:{" "}
          {details.ingredients.map((ingredient) => {
            return <p>{ingredient.type}</p>;
          })}
        </div>
      </div>
      <div className="grow bg-red-100">{details.instructions}</div>
    </div>
  );
};

export default DetailsPage;
