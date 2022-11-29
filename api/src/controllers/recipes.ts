export const getAllRecipes = (req: any, res: any) => {
  res.status(200).send(["tomato pasta", "pizza", "ice cream"]);
};
