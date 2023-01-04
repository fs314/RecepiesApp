import React, { useRef, useState, useEffect } from "react";
import axios from "../api/axios";
import Notification, { notificationStatus } from "../components/Notification";
import LoginAndRegistrationForm from "../components/LoginAndRegistrationForm";
import { ALL_RECEPIES, LOGIN_URL } from "../config/urlConfig";
import useAuth from "../context/useAuth";

type notification = {
  status: notificationStatus;
  message: string;
};
const LoginAndRegistrationPage = () => {
  const { auth, setAuth } = useAuth();
  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  //GET FROM ROUTE
  const [userAction, setUserAction] = useState<"LOGIN" | "REGISTER">("LOGIN");

  const [notification, setNotification] = useState<notification>({
    status: "DEFAULT",
    message: "",
  });

  const userFocus = useRef<HTMLInputElement>(null); //set focus on input when component first loads

  useEffect(() => {
    userFocus.current && userFocus.current.focus();
  }, []);

  useEffect(() => {
    setNotification({
      status: "DEFAULT",
      message: "",
    });
  }, [user, password]);

  const [recipes, setRecipes] = useState<string[]>([]);
  const getRecipes = async () => {
    try {
      const response = await axios.get(ALL_RECEPIES, {
        headers: { Authorization: `Bearer ${auth?.accessToken}` },
      });

      setRecipes(response?.data);
    } catch (e) {}
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault(); // prevent default reloading

    try {
      const response = await axios.post(LOGIN_URL, {
        username: user,
        password: password,
      });

      if (response.status === 200) {
        const accessToken = response?.data?.accessToken;
        //   const roles = response?.data?.roles;
        if (accessToken) setAuth({ user: user, accessToken: accessToken }); //add roles later

        setNotification({
          status: "SUCCESS",
          message: `Welcome back ${auth?.user}!`,
        });
      } else if (response.status === 204) {
        console.log("USER NOT FOUND. Want to register? ");
        setNotification({
          status: "INFO",
          message: `User ${user} does not exists.. do you want to register?`,
        });
      }
    } catch (e: any) {
      if (e.response.status === 400) {
        setNotification({
          status: "ERROR",
          message:
            "Something went wrong, check username and password are correct.",
        });
      } else if (e.response.status === 401) {
        setNotification({
          status: "ERROR",
          message: "Access denied.",
        });
      } else {
        setNotification({
          status: "ERROR",
          message: `Login failed, please try again later. error: ${e}`,
        });
      }
    }
  };

  return (
    <div>
      <Notification
        status={notification.status}
        message={notification.message}
      />
      <LoginAndRegistrationForm
        handleSubmit={handleSubmit}
        user={user}
        password={password}
        userAction={userAction}
        setUser={setUser}
        setPassword={setPassword}
        setUserAction={setUserAction}
      />
      <div>
        {recipes?.length ? <p>{recipes[0]}</p> : <p>no recipes to display</p>}
        <button onClick={getRecipes}>get recipes</button>
      </div>
    </div>
  );
};

export default LoginAndRegistrationPage;
