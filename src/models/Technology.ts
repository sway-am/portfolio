import mongoose, { Document, Model, Schema } from "mongoose";

export interface ITechnology extends Document {
  title: string;
  skill_type: string;
  proficiency: number;
}

const techSchema: Schema<ITechnology> = new Schema({
  title: { type: String, required: true },
  skill_type: { type: String, required: true },
  proficiency: { type: Number, required: true }
});

const Technology: Model<ITechnology> =
  mongoose.models.Technology || mongoose.model<ITechnology>("Technology", techSchema);

export default Technology;
