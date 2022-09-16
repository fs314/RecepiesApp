import React from "react";
import { render, screen } from "@testing-library/react";
import DetailsPage from "../DetailsPage";

const details = {
  name: "stir-fry",
  instructions: "textextexttext",
  ingredients: [
    { ingredientType: "vegetables", qty: 5, measurement: "" },
    { ingredientType: "noodles", qty: 300, measurement: "gm" },
    { ingredientType: "soy sauce", qty: 1, measurement: "tbspoon" },
  ],
  serves: 4,
  cookingTime: { amount: 10, unit: "min" },
  images: [
    "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/pork-noodle-stir-fry-3cb19c3.jpg",
  ],
  tags: ["quick", "vegetarian", "vegan", "low calories"],
};

// it("Should render recipe details", () => {
//   render(<DetailsPage details={details} />);

//   expect(screen.getByText(`Serves: ${details.serves}`)).toBeInTheDocument();
//   expect(
//     screen.getByText(
//       `Cooking Time: ${details.cookingTime.amount}${details.cookingTime.unit}`
//     )
//   ).toBeInTheDocument();
//   expect(screen.getByTestId("vegetables")).toBeInTheDocument();
//   expect(screen.getByTestId("noodles")).toBeInTheDocument();
//   expect(screen.getByTestId("soy sauce")).toBeInTheDocument();
// });
