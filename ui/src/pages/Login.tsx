import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { urlBuilder } from "../utils";

const fetchUser = async (username: string, password: string) => {
  let userCredentials = JSON.stringify({
    username: username,
    password: password,
  });

  const config = {
    method: "post",
    url: urlBuilder("http://localhost:4000/user/login"),
    headers: {
      "Content-Type": "application/json",
    },
    data: userCredentials,
  };
  try {
    const res = await axios(config);
    console.log(JSON.stringify(res.data), " userdata");
  } catch (e) {
    console.error(e);
  }
};

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault(); //prevent reload the page
    fetchUser(username, password);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <p>Username: </p>
          <input
            type="text"
            id="username"
            // ref={useRef}
            autoComplete="off"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            required
          />
        </label>
        <label>
          <p>Password: </p>
          <input
            type="password" //hide what we are typing
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>
        <div>
          <button>Submit</button>
        </div>
      </form>
      <p>Need an account? </p>
      {/* Put router link here */}
      <Link to={"/register"}>
        <span>
          <p>Sign up</p>
        </span>
      </Link>
    </div>
  );
};

export default Login;
