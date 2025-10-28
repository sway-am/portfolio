import mongoose, { Document, Model, Schema } from "mongoose";

export interface ITechnology {
  _id?: string;           // Added just for compatibility with MongoDB documents
  title: string;          // e.g., "React"
  skill_type: string;     // e.g., "Frontend", "Backend", "Database", etc.
  proficiency: number;    // 0–100
  icon?: string;          // optional icon name (for frontend rendering)
}

const techSchema = new Schema<ITechnology>({
  title: { type: String, required: true },
  skill_type: { type: String, required: true },
  proficiency: { type: Number, required: true },
  icon: { type: String },
});

const Technology: Model<ITechnology> =
  mongoose.models.Technology || mongoose.model<ITechnology>("Technology", techSchema);

export default Technology;
