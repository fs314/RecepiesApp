import React, { useRef, useState, useEffect } from "react";

const LoginAndRegistrationForm = ({
  handleSubmit,
  user,
  setUser,
  password,
  setPassword,
  email,
  setEmail,
  path,
}: {
  handleSubmit: (e: any) => Promise<void>;
  user: string;
  setUser: (user: string) => void;
  password: string;
  setPassword: (password: string) => void;
  email: string;
  setEmail: (password: string) => void;
  path: string;
}) => {
  const [repeatPassword, setRepeatPassword] = useState<string>("");
  const [passwordMatch, setPasswordMatch] = useState<boolean>(false);

  const userFocus = useRef<HTMLInputElement>(null); //set focus on input when component first loads

  useEffect(() => {
    userFocus.current && userFocus.current.focus();
  }, []);

  useEffect(() => {
    if (password === repeatPassword && password !== "") setPasswordMatch(true);
  }, [password, repeatPassword]);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className={`flex flex-col p-8`}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            ref={userFocus}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user} //makes it a controlled input. Important to clear up upon submission.
            required
            className="border border-slate-400"
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password" //hides typing
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
            className="border border-slate-400"
          />
          {path === "/register" && (
            <>
              <label htmlFor="password">Repeat password:</label>
              <input
                type="password" //hides typing
                id="repeatPassword"
                onChange={(e) => setRepeatPassword(e.target.value)}
                value={repeatPassword}
                required
                className="border border-slate-400"
              />
              <label htmlFor="email">Email:</label>
              <input
                type="email" //hides typing
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                className="border border-slate-400"
              />
            </>
          )}
          {/* no need to add onClick as it is the only button in the form */}
          <input
            className={`border border-slate-400 my-6 ${
              passwordMatch ? "text-green-600" : "text-red-600"
            }`}
            disabled={!passwordMatch && path === "/register"}
            type="submit"
            value="Submit"
          />
        </div>
      </form>
    </div>
  );
};

export default LoginAndRegistrationForm;
