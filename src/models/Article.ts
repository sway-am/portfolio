// models/Article.ts
import mongoose, { Document, Schema, Model } from "mongoose";


export interface IArticle extends Document {
  id: string;
  title: string;
  intro: string;
  readtime: number;
  tag?: string;
  hashtags?: string[];
  publishdate?: Date;
  article_link: string;
}


const articleSchema: Schema<IArticle> = new Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  intro: { type: String, required: true },
  readtime: { type: Number, required: true },
  tag: { type: String },
  hashtags: { type: [String], default: [] },
  publishdate: { type: Date },
  article_link: { type: String, default: "https://medium.com/@mohanty.swayam060404" },
});


const Article: Model<IArticle> =
  mongoose.models.Article || mongoose.model<IArticle>("Article", articleSchema);

export default Article;
