import mongoose, { Document, Model, Schema } from "mongoose";

export interface IProject extends Document {
  title: string;
  description?: string;
  points?: string[];
  tech: string[];
  github?: string;
  demo?: string;
  image?: string;
}

const projectSchema = new Schema<IProject>({
  title: { type: String, required: true },
  description: { type: String },
  points: { type: [String], default: [] },
  tech: { type: [String], required: true },
  github: { type: String },
  demo: { type: String },
  image: { type: String },
});

const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", projectSchema);

export default Project;
