import React from "react";
import { Outlet } from "react-router-dom";

//outlet represents all the children of the layout components
const Layout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default Layout;
