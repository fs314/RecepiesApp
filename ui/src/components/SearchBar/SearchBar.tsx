import React from "react";
import TextSearch from "./TextSearch";
import { GoBook } from "react-icons/go";

const SearchBar = () => {
  // const [recipeSearch, setRecipeSearch] = useState<string>("");
  // const [filterSearch, setFilterSearch] = useState<string>("");
  // const [search, setSearch] = useState<{ text: string; type: string }[]>([]);

  const mockState = (text: string) => {
    console.log(text);
  };
  return (
    <div className="flex justify-between px-5 block flex-wrap">
      <TextSearch
        icon={<GoBook />}
        text={"Browse Recipes Book:"}
        getInput={mockState}
      />
      <TextSearch
        icon={<GoBook />}
        text={"Filter by Tag/Ingredients:"}
        getInput={mockState}
      />
    </div>
  );
};

export default SearchBar;
