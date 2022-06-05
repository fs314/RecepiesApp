//Keep logic for each route in this folder so to decouple them and keep files tidy

export const getRecipe = (_req: any, res: { send: (arg0: string) => void }) => {
  res.send("get your Recipe here");
};

export const createRecipe = (
  _req: any,
  res: { send: (arg0: string) => void }
) => {
  res.send("Created a new Recipe here");
};

export const deleteRecipe = (
  _req: any,
  res: { send: (arg0: string) => void }
) => {
  res.send("Deleted an old recipe");
};

export const updateRecipe = (
  _req: any,
  res: { send: (arg0: string) => void }
) => {
  res.send("Your old recipe update here");
};
