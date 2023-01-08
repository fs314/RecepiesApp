import React, { useRef, useState, useEffect } from "react";
import axios from "../api/axios";
import Notification, { notificationStatus } from "../components/Notification";
import LoginAndRegistrationForm from "../components/LoginAndRegistrationForm";
import { LOGIN_URL, REGISTER_URL } from "../config/urlConfig";
import useAuth from "../context/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import Tabs from "../components/Tabs";

type notification = {
  status: notificationStatus;
  message: string;
};

const tabsConfig = [
  { name: "Sign In", path: "/login", selected: false },
  { name: "Register", path: "/register", selected: false },
];
const LoginAndRegistrationPage = () => {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/browse";
  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [notification, setNotification] = useState<notification>({
    status: "DEFAULT",
    message: "",
  });

  const userFocus = useRef<HTMLInputElement>(null); //set focus on input when component first loads

  useEffect(() => {
    userFocus.current && userFocus.current.focus();
  }, []);

  const handleLoginRequest = async (e: any) => {
    e.preventDefault(); // prevent default reloading

    try {
      const response = await axios.post(LOGIN_URL, {
        username: user,
        password: password,
      });

      if (response.status === 200) {
        const accessToken = response?.data?.accessToken;

        if (accessToken) setAuth({ user: user, accessToken: accessToken }); //add roles later

        setNotification({
          status: "SUCCESS",
          message: `Welcome back ${auth?.user}!`,
        });
        setUser("");
        setPassword("");
        navigate(from, { replace: true });
      } else if (response.status === 204) {
        setNotification({
          status: "INFO",
          message: `User ${user} does not exists. Use the registration form to sign up.`,
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

  const handleRegisterRequest = async (e: any) => {
    e.preventDefault(); // prevent default reloading

    try {
      const response = await axios.post(REGISTER_URL, {
        username: user,
        password: password,
        email: email,
      });

      if (response.status === 200) {
        const accessToken = response?.data?.accessToken;

        if (accessToken) setAuth({ user: user, accessToken: accessToken }); //add roles later

        setNotification({
          status: "SUCCESS",
          message: `Welcome ${auth?.user}!`,
        });
        setUser("");
        setPassword("");
        setEmail("");
        navigate(from, { replace: true });
      }
    } catch (e: any) {
      setNotification({
        status: "ERROR",
        message: `Registration failed, please try again later. error: ${e}`,
      });
    }
  };

  return (
    <div>
      <Notification
        status={notification.status}
        message={notification.message}
      />
      <div className="flex justify-center">
        <Tabs tabs={tabsConfig} />
      </div>
      <div className="flex justify-center">
        <LoginAndRegistrationForm
          handleSubmit={
            location.pathname === "/login"
              ? handleLoginRequest
              : handleRegisterRequest
          }
          user={user}
          password={password}
          email={email}
          setEmail={setEmail}
          setUser={setUser}
          setPassword={setPassword}
          path={location.pathname}
        />
      </div>
    </div>
  );
};

export default LoginAndRegistrationPage;
