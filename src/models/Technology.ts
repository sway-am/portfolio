import mongoose from "mongoose"

const techSchema = new mongoose.Schema({
    title:{type: String, required: true},
    skill_type: {type: String, required: true},
    proficiency: {type: Number, required: true}
});

export default mongoose.model("Technology", techSchema);
