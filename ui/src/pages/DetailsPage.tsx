import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
// import { Recipe } from "../types";
import { urlBuilder } from "../utils";

// interface DetailsPageProps {
//     details: Recipe | User
// }

const DetailsPage = () => {
  const [details, setDetails] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        urlBuilder(
          `http://localhost:4000/recipes/${searchParams.get("id")}`,
          {}
        )
      );
      setDetails(res.data);
    };

    fetchData();
  }, [searchParams]);

  return (
    <div className="w-full h-full flex">
      {!!details ? (
        <>
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
                return (
                  <p
                    key={`${ingredient.ingredientType}`}
                    data-testid={`${ingredient.ingredientType}`}
                  >
                    {ingredient.ingredientType}
                  </p>
                );
              })}
            </div>
          </div>
          <div className="grow bg-red-100">{details.instructions}</div>{" "}
        </>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default DetailsPage;
