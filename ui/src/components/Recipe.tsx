import React from "react";
import { recipe } from "../types";

const Recipe = ({ name, serves, images }: recipe) => {
  return (
    <div className="border border-black p-2 mt-5">
      <div className="max-w-md" id="image-container">
        <img className="max-w-xs" src={images[0]} alt={`${name}-img`} />
      </div>
      <p className="font-bold underline">{name}</p>
      <p>Serves: {serves}</p>
    </div>
  );
};

export default Recipe;
