import { AxiosInstance } from "axios";
import React, { useEffect, useState } from "react";
import { ACCOUNT_BASE_URL } from "../config/urlConfig";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../context/useAuth";
import useAxiosPrivate from "../context/useAxiosPrivate";

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
    console.log(response.data, " HERREE");
    setUserDetails(response?.data);
  } catch (e) {
    console.log("ERROR: ", e);
  }
};

const Account = () => {
  const { auth } = useAuth();
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
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

  return (
    <>
      <div className="text-3xl font-bold underline">ACCOUNT</div>
      <div>
        {userDetails?.username ? (
          <div>
            <p>{userDetails?.username}</p>
            <p>{userDetails?.email}</p>
          </div>
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
