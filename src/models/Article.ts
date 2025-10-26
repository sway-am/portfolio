// models/Article.ts
import mongoose, { Document, Schema, Model } from "mongoose";

// 1️⃣ TypeScript interface for an Article
export interface IArticle extends Document {
  title: string;
  intro: string;
  readtime: number;
  tag?: string;
  hashtags?: string[];
  publishdate?: Date;
  article_link?: string;
}

// 2️⃣ Mongoose schema
const articleSchema: Schema<IArticle> = new Schema({
  title: { type: String, required: true },
  intro: { type: String, required: true },
  readtime: { type: Number, required: true },
  tag: { type: String },
  hashtags: { type: [String], default: [] },
  publishdate: { type: Date },
  article_link: { type: String },
});

// 3️⃣ Create or reuse model
const Article: Model<IArticle> =
  mongoose.models.Article || mongoose.model<IArticle>("Article", articleSchema);

export default Article;
