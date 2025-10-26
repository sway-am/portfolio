import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  intro: { type: String },
  fullDescription: { type: String },
  techStack: [String],                             // e.g. ["React", "Node.js", "MongoDB"]
  github: { type: String },
  liveDemo: { type: String },
  image: { type: String },
});

export default mongoose.model("Project", projectSchema);
