import allowedOrigins from "../config/allowedOrigins";
import RecipesListing from "../models/RecipesListing";

type recipeListing = {
  username: string;
  title: string;
  difficulty: string;
  cookingTime: string;
  tags: string[];
};

export const getRecipesListings = async (req: any, res: any) => {
  //only to test private routes, delete later
  // if (allowedOrigins.includes(req.headers.origin)) {
  //   res.header("Access-Control-Allow-Origin", req.headers.origin);
  // }

  try {
    const { page = 1, limit = 10 } = req.body;

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
