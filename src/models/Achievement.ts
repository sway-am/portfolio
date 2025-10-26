// models/Achievement.ts
import mongoose, { Document, Schema, Model } from "mongoose";

export interface IAchievement extends Document {
  title: string;
  organisation: string;
  intro?: string;
  tags?: string[];
  image?: string;
  link?: string;
  details?: string; 
  year?: number; 
}


const achievementSchema: Schema<IAchievement> = new Schema({
  title: { type: String, required: true },
  organisation: { type: String, required: true },
  intro: { type: String },
  tags: { type: [String], default: [] },
  image: { type: String },
  link: { type: String },
  details: { type: String }, 
  year: { type: Number, required: true},
});


const Achievement: Model<IAchievement> =
  mongoose.models.Achievement || mongoose.model<IAchievement>("Achievement", achievementSchema);

export default Achievement;
