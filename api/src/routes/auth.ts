import express from "express";
import { authenticateUser, registerUser } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", authenticateUser);
router.post("/register", registerUser);

export default router;
