import RecipesListing from "../models/RecipesListing";
import UserAccount from "../models/UserAccount";

type recipeListing = {
  username: string;
  title: string;
  difficulty: string;
  cookingTime: string;
  tags: string[];
};

export const getRecipesListings = async (req: any, res: any) => {
  try {
    const { page = 1, limit = 10 } = req.body; //query params

    const recipes = await RecipesListing.find()
      .limit(limit * 1)
      .skip((page - 1) * limit);

    if (!recipes) {
      res.status(404).send({ message: "no recipes found" });
    } else {
      res.status(200).send({ total: recipes.length, recipes });
    }
  } catch (e) {
    console.log("error: ", e);
    res.send(500).send({ message: " Something went wrong retry later" });
  }
};

export const addRecipeListing = async (req: any, res: any) => {
  try {
    const recipe: recipeListing = req.body.recipeListing;

    const recipes = await RecipesListing.create(recipe);

    res
      .status(200)
      .send({ message: "Recipe was successfully added: ", recipes });
  } catch (e) {
    console.log("error: ", e);
    res.send(500).send({ message: " Something went wrong retry later" });
  }
};

export const getUserRecipesListings = async (req: any, res: any) => {
  try {
    const username = req.params["userName"];

    const user = await UserAccount.findOne({
      username,
    });

    if (!user) {
      res.status(404).send({ message: "Recipes not found" });
      return;
    }

    const recipesListings = await RecipesListing.find({ username: username });

    res.status(200).send({ total: recipesListings.length, recipesListings });
  } catch (e) {
    console.log(e);
    res
      .status(500)
      .send({ message: "Something went wrong. plese retry later" });
  }
};
