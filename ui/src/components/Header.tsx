import React from "react";
import { GiCook } from "react-icons/gi";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <Link to={`/`}>
      <div className="bg-red-400 flex w-full">
        <div
          className="text-3xl font-bold justify-center"
          onClick={() => {
            console.log("HOME PAGE");
          }}
        >
          RecipesApp
        </div>
        <div
          className="justify-center"
          onClick={() => {
            console.log("USER PROFILE");
          }}
        >
          <GiCook size={30} />
        </div>
      </div>
    </Link>
  );
};

export default Header;
