import React from "react";
import { Route, Routes } from "react-router-dom";
import Browse from "./Browse";
import DetailsPage from "./DetailsPage";

const Pages = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Browse />}></Route>
        <Route path="/details" element={<DetailsPage />}></Route>
      </Routes>
    </>
  );
};

export default Pages;
