import { ReactElement } from "react";

export interface CookingTimeType {
  amount: number;
  unit: string;
}

export interface Ingredients {
  ingredientType: string;
  qty: number;
  measurement: string;
}

export interface Recipe {
  id: string;
  name: string;
  instructions: string;
  ingredients: Ingredients[];
  serves: number;
  cookingTime: CookingTimeType;
  images: string[];
  tags: string[];
}

// export interface RecipesListingProps {
//   recipes: Recipe[];
// }

export interface TextSearchProps {
  text: string;
  icon: ReactElement;
  getInput: (text: string) => void;
}
