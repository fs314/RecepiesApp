import React from "react";
import { searchBarProps } from "../types";

const SearchBar = ({ icon }: searchBarProps) => {
  return (
    <div className="flex justify-center p-5">
      <p>Browse Recipes Book: </p>
      <input className="border-b border-black" />
      <>{icon}</>
    </div>
  );
};

export default SearchBar;
