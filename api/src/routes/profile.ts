import express from "express";
import { getProfile, createProfile } from "../controllers/profile.js";

const router = express.Router();

router.get("/", getProfile);
router.post("/", createProfile);

export default router;
