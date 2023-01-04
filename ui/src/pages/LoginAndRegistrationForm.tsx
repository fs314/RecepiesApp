import React, { useRef, useState, useEffect } from "react";
import axios from "../api/axios";
import { ALL_RECEPIES, LOGIN_URL } from "../config/urlConfig";
import useAuth from "../context/useAuth";

const LoginAndRegistrationForm = () => {
  const { auth, setAuth } = useAuth();
  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const userFocus = useRef<HTMLInputElement>(null); //set focus on input when component first loads
  const errorFocus = useRef<HTMLInputElement>(null); //set focus on error for screen reader to read

  useEffect(() => {
    userFocus.current && userFocus.current.focus();
  }, []);

  useEffect(() => {
    setError("");
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

        setSuccess(true);
      } else if (response.status === 204) {
        console.log("USER NOT FOUND. Want to register? ");
        setSuccess(true);
      }
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
      <div>
        {recipes?.length ? <p>{recipes[0]}</p> : <p>no recipes to display</p>}
        <button onClick={getRecipes}>get recipes</button>
      </div>
    </div>
  );
};

export default LoginAndRegistrationForm;
