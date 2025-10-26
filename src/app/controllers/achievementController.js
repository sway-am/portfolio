import { connectDB } from "../lib/mongodb";
import Achievement from "../../models/Achievement";

// Fetch all achievements
export const getAllAchievements = async (req, res) => {
  try {
    await connectDB();
    const achievements = await Achievement.find({}).sort({ achievementdate: -1 });
    res.status(200).json(achievements);
  } catch (err) {
    console.error("Error fetching achievements:", err);
    res.status(500).json({ error: "Failed to fetch achievements" });
  }
};
