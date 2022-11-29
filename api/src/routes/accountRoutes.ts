import express from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/account";

const router = express.Router();

router.post("/register", registerUser);
router.get("/login", loginUser);
router.get("/logout", logoutUser);

export default router;
