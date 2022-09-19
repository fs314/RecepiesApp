import React from "react";
import { GiCook } from "react-icons/gi";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-red-400 flex w-full">
      <Link to={`/`}>
        <div
          className="text-3xl font-bold justify-center"
          onClick={() => {
            console.log("HOME PAGE");
          }}
        >
          RecipesApp
        </div>
      </Link>
      {/* /change to user */}
      <Link to={"/login"}>
        <div
          className="justify-center"
          onClick={() => {
            console.log("USER PROFILE");
          }}
        >
          <GiCook size={30} />
        </div>
      </Link>
    </div>
  );
};

export default Header;
