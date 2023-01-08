import React from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ALL_RECEPIES } from "../config/urlConfig";
import useAxiosPrivate from "../context/useAxiosPrivate";

const Browse = () => {
  const [recipes, setRecipes] = useState<string[]>([]);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const getRecipes = async () => {
    try {
      const response = await axiosPrivate.get(ALL_RECEPIES);

      setRecipes(response?.data);
    } catch (e) {
      console.log("ERROR: ", e);
      navigate("/login", { state: { from: location }, replace: true });
    }
  };

  return (
    <div>
      {recipes?.length ? <p>{recipes[0]}</p> : <p>no recipes to display</p>}
      <button onClick={getRecipes}>get recipes</button>
    </div>
  );
};

export default Browse;
