import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
  title: { type: String, required: true },        // e.g. "Software Intern"
  company: { type: String, required: true },
  duration: { type: String , required: true},
  location: { type: String , required: true},            // for main tile
  shortDesciption: { type:String , required: true},
  fullDescription: { type: String , required: true},              // for detailed page
});

export default mongoose.model("Experience", experienceSchema);
