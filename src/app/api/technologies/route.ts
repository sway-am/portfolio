import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Technology, { ITechnology } from "@/models/Technology";

export async function GET() {
  try {
    await connectDB();
    const technologies: ITechnology[] = await Technology.find({}).sort({ skill_type: 1, title: 1 });
    return NextResponse.json(technologies, { status: 200 });
  } catch (err) {
    console.error("Error fetching technologies:", err);
    return NextResponse.json({ error: "Failed to fetch technologies" }, { status: 500 });
  }
}
