// models/Achievement.ts
import mongoose, { Document, Schema, Model } from "mongoose";

// 1️⃣ Define TypeScript interface
export interface IAchievement extends Document {
  title: string;
  organisation: string;
  intro?: string;
  tags?: string[];
  image?: string;
  achievementdate?: string; // or Date if preferred
  other_links?: string[];
  details?: string; // new field
}

// 2️⃣ Define Mongoose schema
const achievementSchema: Schema<IAchievement> = new Schema({
  title: { type: String, required: true },
  organisation: { type: String, required: true },
  intro: { type: String },
  tags: { type: [String], default: [] },
  image: { type: String },
  achievementdate: { type: String },
  other_links: { type: [String], default: [] },
  details: { type: String }, // added field
});

// 3️⃣ Create or reuse model
const Achievement: Model<IAchievement> =
  mongoose.models.Achievement || mongoose.model<IAchievement>("Achievement", achievementSchema);

export default Achievement;
