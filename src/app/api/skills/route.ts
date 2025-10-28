// app/api/skills/route.ts
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Technology, { ITechnology } from "@/models/Technology";

export async function GET() {
  try {
    await connectDB();
    const technologies: ITechnology[] = await Technology.find({})
      .sort({ skill_type: 1, proficiency: -1, title: 1 })
      .lean();

    return NextResponse.json(technologies, { status: 200 });
  } catch (error) {
    console.error("Error fetching technologies:", error);
    return NextResponse.json(
      { error: "Failed to fetch technologies" },
      { status: 500 }
    );
  }
}

