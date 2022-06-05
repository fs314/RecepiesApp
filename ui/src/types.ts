import { ReactElement } from "react";

export interface cookingTimeType {
  amount: number;
  unit: string;
}

export interface ingredients {
  type: string;
  qty: number;
  measurement: string;
}

export interface recipe {
  name: string;
  instructions: string;
  ingredients: ingredients[];
  serves: number;
  cookingTime: cookingTimeType;
  images: string[];
  tags: string[];
}

export interface recipesListingProps {
  recipes: recipe[];
}

export interface textSearchProps {
  text: string;
  icon: ReactElement;
  getInput: (text: string) => void;
}
