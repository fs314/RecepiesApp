import express from "express";
import {
  getUserDetails,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/account";
import verifyJWT from "../middleware/verifyJWT";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/", verifyJWT, getUserDetails);

export default router;
