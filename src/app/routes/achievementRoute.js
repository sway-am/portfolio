import express from "express";
import { getAllAchievements } from "../controllers/achievementController.js";

const router = express.Router();

router.get("/", getAllAchievements);

export default router;
