// models/Experience.ts
import mongoose, { Document, Model, Schema } from "mongoose";

export interface IExperience extends Document {
  title: string;             // role
  company: string;
  duration: string;          // start - end
  location: string;
  shortDescription: string;  // description
  fullDescription: string;   // description + bullets
  type?: string;             // new field
  logo?: string;             // new field
}

const experienceSchema: Schema<IExperience> = new Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  duration: { type: String, required: true },
  location: { type: String, required: true },
  shortDescription: { type: String, required: true },
  fullDescription: { type: String, required: true },
  type: { type: String },      // optional
  logo: { type: String }       // optional
});

const Experience: Model<IExperience> =
  mongoose.models.Experience || mongoose.model<IExperience>("Experience", experienceSchema);

export default Experience;
