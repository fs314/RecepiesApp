import React, { useRef, useState, useEffect } from "react";

const LoginAndRegistrationForm = ({
  handleSubmit,
  user,
  setUser,
  password,
  setPassword,
  userAction,
  setUserAction,
}: {
  handleSubmit: (e: any) => Promise<void>;
  user: string;
  setUser: (user: string) => void;
  password: string;
  setPassword: (password: string) => void;
  userAction: "LOGIN" | "REGISTER";
  setUserAction: (userAction: "LOGIN" | "REGISTER") => void;
}) => {
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const userFocus = useRef<HTMLInputElement>(null); //set focus on input when component first loads

  useEffect(() => {
    userFocus.current && userFocus.current.focus();
  }, []);

  return (
    <div>
      <div>
        <p
          className={
            userAction === "LOGIN" ? "text-black-600" : "text-grey-600"
          }
          onClick={() => setUserAction("LOGIN")}
        >
          Sign in
        </p>
        <p
          className={
            userAction === "REGISTER" ? "text-black-600" : "text-grey-600"
          }
          onClick={() => setUserAction("REGISTER")}
        >
          Create account
        </p>
      </div>
      <form onSubmit={handleSubmit}>
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
          {userAction === "REGISTER" && (
            <>
              <label htmlFor="password">Repeat password:</label>
              <input
                type="password" //hides typing
                id="repeatPassword"
                onChange={(e) => setRepeatPassword(e.target.value)}
                value={repeatPassword}
                required
              />
              <label htmlFor="email">Email:</label>
              <input
                type="email" //hides typing
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
              />
            </>
          )}
          {/* no need to add onClick as it is the only button in the form */}
          {/* PUT ROUTER LINK HERE  */}
          <button>{userAction === "LOGIN" ? "Login" : "Register"}</button>
        </>
      </form>
    </div>
  );
};

export default LoginAndRegistrationForm;
