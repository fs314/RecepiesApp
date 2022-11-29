import React, { useRef, useState, useEffect, useContext } from "react";
import axios from "../api/axios";
import AuthContext from "../context/AuthContext";

//https://www.youtube.com/watch?v=X3qyxo_UTR4
//Make it also to register

const LoginAndRegistrationForm = () => {
  const { setAuth } = useContext(AuthContext);
  const LOGIN_URL = "/auth";

  const userFocus = useRef<HTMLInputElement>(null); //set focus on input when component first loads
  const errorFocus = useRef<HTMLInputElement>(null); //set focus on error for screen reader to read

  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  useEffect(() => {
    userFocus.current && userFocus.current.focus();
  }, []);

  useEffect(() => {
    setError("");
  }, [user, password]);

  const handleSubmit = async (e: any) => {
    e.preventDefault(); // prevent default reloading
    console.log(user, " user, ", password, " password");

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, password }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const accessToken = response?.data?.accessToken;
      //   const roles = response?.data?.roles;
      if (accessToken && setAuth) setAuth({ user, password, accessToken }); //add roles later

      setSuccess(true);
    } catch (e: any) {
      console.error(e);
      if (e.response.status === 400) {
        setError(
          "Something went wrong, check username and password are correct."
        );
      } else if (e.response.status === 401) {
        setError("Access denied.");
      } else {
        setError("Login failed. Please try again later. ");
      }
    }
  };

  return (
    <div>
      <p
        ref={errorFocus}
        className={!!error.length ? "text-red-600" : "invisible"}
      >
        {error}
      </p>

      <form onSubmit={handleSubmit}>
        {success ? (
          <div>Successful Login</div>
        ) : (
          <>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              ref={userFocus}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user} //makes it a controlled input. Important to clear up upon submission.
              required
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password" //hides typing
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            {/* no need to add onClick as it is the only button in the form */}
            {/* PUT ROUTER LINK HERE  */}
            <button>Sign In</button>
          </>
        )}
      </form>
    </div>
  );
};

export default LoginAndRegistrationForm;
