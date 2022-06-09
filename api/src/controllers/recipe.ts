//Keep logic for each route in this folder so to decouple them and keep files tidy

import Recipe from "../models/recipe";

export const getRecipe = async (_req: any, res: any) => {
  try {
    const recipes = await Recipe.find();
    res.status(200).json(recipes);
  } catch (error: unknown) {
    if (error instanceof Error)
      res.status(404).json({ message: error.message });
  }
};

export const createRecipe = (req: any, res: any) => {
  const newRecipe = new Recipe(req.body);
  console.log(req.body);

  try {
    newRecipe.save();

    res.status(201).json(newRecipe);
  } catch (error: unknown) {
    if (error instanceof Error)
      res.status(409).send({ message: error.message });
  }
};

// export const deleteRecipe = (
//   _req: any,
//   res: { send: (arg0: string) => void }
// ) => {
//   res.send("Deleted an old recipe");
// };

// export const updateRecipe = (
//   _req: any,
//   res: { send: (arg0: string) => void }
// ) => {
//   res.send("Your old recipe update here");
// };
