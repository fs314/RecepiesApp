import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import RecipesListing from "../components/RecipesListing";
import axios from "axios";
import { urlBuilder } from "../utils";

const Browse = () => {
  const [recipes, setRecipes] = useState([]);
  const [offset, setOffset] = useState(0); //add pagination later on
  const limit = 9;

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        urlBuilder("http://localhost:4000/recipes", {
          limit: limit,
          offset: offset,
        })
      );
      setRecipes(res.data);
    };
    fetchData();
  }, [offset]);

  return (
    <>
      <SearchBar />
      <RecipesListing recipes={recipes} />
    </>
  );
};

export default Browse;
