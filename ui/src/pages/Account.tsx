import { AxiosInstance } from "axios";
import React, { useEffect, useState } from "react";
import { ACCOUNT_BASE_URL, LISTINGS_BY_USERS } from "../config/urlConfig";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";
import useAxiosPrivate from "../context/useAxiosPrivate";
import RecipesListings from "../components/RecipesListings";
import { RecipeListingDetails } from "../components/RecipeListing";
import axios from "../api/axios";

type UserDetails = {
  username: string;
  email: string;
};

const getUserDetails = async (
  username: string,
  setUserDetails: (userDetails: UserDetails | null) => void,
  axios: AxiosInstance
) => {
  try {
    const response = await axios.get(
      `${ACCOUNT_BASE_URL}?username=${username}`
    );

    setUserDetails(response?.data);
  } catch (e) {
    console.log("ERROR: ", e);
  }
};

const getRecipesListingsByUser = async (
  username: string,
  setRecipesListings: (recipesListings: RecipeListingDetails[]) => void
) => {
  try {
    const response = await axios.get(`${LISTINGS_BY_USERS}/${username}`);

    setRecipesListings(response?.data.recipesListings);
  } catch (e) {
    console.log("ERROR: ", e);
  }
};

const Account = () => {
  const { auth } = useAuth();
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [recipesListings, setRecipesListings] = useState<
    RecipeListingDetails[]
  >([]);

  const axiosPrivate = useAxiosPrivate();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      if (auth.user) getUserDetails(auth.user, setUserDetails, axiosPrivate);
    } catch (e) {
      console.log(e);
      navigate("/login", { state: { from: location }, replace: true });
    }
  }, [auth.user, axiosPrivate, location, navigate]);

  useEffect(() => {
    try {
      if (auth.user) {
        getRecipesListingsByUser(auth.user, setRecipesListings);
      }
    } catch (e) {
      console.log(e);
      navigate("/login", { state: { from: location }, replace: true });
    }
  }, [auth.user, location, navigate]);

  return (
    <>
      <div className="text-3xl font-bold underline">ACCOUNT</div>
      <div>
        {userDetails?.username ? (
          <>
            <div>
              <p>{userDetails?.username}</p>
              <p>{userDetails?.email}</p>
            </div>
            <RecipesListings recipes={recipesListings}>
              <Link to="recipe-builder">
                <div className="bg-slate-300 p-2 m-4" key={`add-recipe`}>
                  +
                </div>
              </Link>
            </RecipesListings>
          </>
        ) : (
          <div>
            <p>FORBIDDEN</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Account;
