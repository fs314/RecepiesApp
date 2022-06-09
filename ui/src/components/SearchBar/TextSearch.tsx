import React from "react";
import { TextSearchProps } from "../../types";

const TextSearch = ({ text, icon, getInput }: TextSearchProps) => {
  return (
    <div className="flex justify-center p-5 max-w-screen-50">
      <p>{text}</p>
      <input
        className="border-b border-black"
        onChange={(event) => getInput(event.target.value)}
      />
      <>{icon}</>
    </div>
  );
};

export default TextSearch;
