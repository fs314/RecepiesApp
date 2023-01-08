import React from "react";
import { GiCook } from "react-icons/gi";
import { Link } from "react-router-dom";
import useAuth from "../context/useAuth";

const headerLinks: string[] = ["/browse"];

const Header = () => {
  const { auth } = useAuth();

  return (
    <div className="bg-slate-300">
      <div className="flex flex-row align-center">
        <div className="p-1">
          <GiCook />
        </div>
        {auth?.user ? (
          <div className="flex flex-row align-center">
            <Link to="/account">
              <p>{`${auth.user} | `}</p>
            </Link>
            <p
              onClick={() => {
                console.log("log out here");
              }}
              className="underline"
            >
              logout
            </p>
          </div>
        ) : (
          <Link to="/login">login</Link>
        )}
      </div>
      <div>
        <p className="flex justify-center text-2xl font-semibold">RECEPIES</p>
      </div>
      <div>
        {headerLinks.map((link) => {
          return (
            <div key={link}>
              <Link to={link}>
                <p className="flex justify-center"> {link.split("/")[1]}</p>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Header;
