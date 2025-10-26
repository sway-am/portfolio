import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Article, { IArticle } from "@/models/Article";

export async function GET() {
  try {
    // Connect to MongoDB
    await connectDB();

    // Fetch all articles, sorted by publish date descending
    const articles: IArticle[] = await Article.find({}).sort({ publishdate: -1 });

    return NextResponse.json(articles, { status: 200 });
  } catch (err) {
    console.error("Error fetching articles:", err);
    return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 });
  }
}
