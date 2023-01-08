import React from "react";
import { Link } from "react-router-dom";

const headerLinks: string[] = ["/browse"];

const Header = () => {
  return (
    <div className="bg-slate-300">
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
