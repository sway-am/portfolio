import mongoose from "mongoose"

const articleSchema = new mongoose.Schema({
    title: {type: String, required: true},
    intro: {type: String, required: true},
    readtime: { type: Number, required: true},
    tag: {type: String},
    hashtags: { type: [String]},
    publishdate: {type: Date},
    article_link: {type: String}
});

export default mongoose.model("Article", articleSchema);
