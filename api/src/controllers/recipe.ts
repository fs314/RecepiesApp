//Keep logic for each route in this folder so to decouple them and keep files tidy

import Recipe from "../models/recipe";

export const getRecipes = async (req: any, res: any) => {
  try {
    const recipes = await Recipe.find();
    const limit = req.query.limit || 10;
    const offset = req.query.offset || 0;

    res.status(200).json(recipes.slice(offset, offset + limit));
  } catch (error: unknown) {
    if (error instanceof Error)
      res.status(404).json({ message: error.message });
  }
};

export const getRecipeById = async (req: any, res: any) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    res.status(200).json(recipe);
  } catch (error: unknown) {
    if (error instanceof Error)
      res.status(404).json({ message: error.message });
  }
};

//works only if name matches exactly. case sensitive.
export const getRecipesByName = async (req: any, res: any) => {
  try {
    const recipes = await Recipe.find({ name: req.params.name });
    res.status(200).json(recipes);
  } catch (error: unknown) {
    if (error instanceof Error)
      res.status(404).json({ message: error.message });
  }
};

export const createRecipes = (req: any, res: any) => {
  const newRecipe = new Recipe(req.body);

  try {
    newRecipe.save();

    res.status(201).json(newRecipe);
  } catch (error: unknown) {
    if (error instanceof Error)
      res.status(409).send({ message: error.message });
  }
};

export const deleteRecipe = async (req: any, res: any) => {
  try {
    const deleteRecipe = await Recipe.findOneAndDelete({
      id: req.params.id,
    });

    res.send(`Deleted an old recipe with id:`);
  } catch (error: unknown) {
    if (error instanceof Error)
      res.status(404).json({ message: error.message });
  }
};

// export const updateRecipe = (
//   _req: any,
//   res: { send: (arg0: string) => void }
// ) => {
//   res.send("Your old recipe update here");
// };
