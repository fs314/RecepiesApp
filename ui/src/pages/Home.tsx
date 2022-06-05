import React, { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import RecipesListing from "../components/RecipesListing";
import { GoBook } from "react-icons/go";
import axios from "axios";

const Home = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("http://localhost:4000/");
      setRecipes(res.data);
    };
    fetchData();
  }, []);

  return (
    <>
      <SearchBar icon={<GoBook />} />
      <RecipesListing recipes={recipes} />
    </>
  );
};

export default Home;
