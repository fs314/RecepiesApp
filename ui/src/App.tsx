import "./App.css";
import React from "react";
import Pages from "./pages/Pages";

function App() {
  return (
    <div className="App">
      <div className="text-3xl font-bold underline">HEADER</div>
      <div>SEARCH BAR</div>
      <Pages />
    </div>
  );
}

export default App;
