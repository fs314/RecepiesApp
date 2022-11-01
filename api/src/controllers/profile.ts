import Profile from "../models/profile";

export const getProfile = async (req: any, res: any) => {
  try {
    const profile = await Profile.findOne({ username: req.params.username });

    res.status(200).json(profile);
  } catch (error: unknown) {
    if (error instanceof Error)
      res.status(404).json({ message: error.message });
  }
};

export const createProfile = async (req: any, res: any) => {
  try {
    const newProfile = new Profile({ ...req.body });

    newProfile.save();

    res.status(201).send("user created successfully");
  } catch (error: unknown) {
    if (error instanceof Error)
      res.status(409).send({ message: error.message });
  }
};

// export const deleteRecipe = async (req: any, res: any) => {
//   try {
//     const deleteRecipe = await Recipe.findOneAndDelete({
//       id: req.params.id,
//     });

//     res.send(`Deleted an old recipe with id:`);
//   } catch (error: unknown) {
//     if (error instanceof Error)
//       res.status(404).json({ message: error.message });
//   }
// };
