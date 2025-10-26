import mongoose, { Document, Model, Schema } from "mongoose";

export interface IProject extends Document {
  title: string;
  intro?: string;
  fullDescription?: string;
  techStack: string[];
  github?: string;
  liveDemo?: string;
  image?: string;
}

const projectSchema: Schema<IProject> = new Schema({
  title: { type: String, required: true },
  intro: { type: String },
  fullDescription: { type: String },
  techStack: { type: [String], default: [] },
  github: { type: String },
  liveDemo: { type: String },
  image: { type: String }
});

const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", projectSchema);

export default Project;
