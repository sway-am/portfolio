import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Achievement, { IAchievement } from "@/models/Achievement";

export async function GET() {
  try {
    await connectDB();
    const achievements: IAchievement[] = await Achievement.find({}).sort({ achievementdate: -1 });
    return NextResponse.json(achievements, { status: 200 });
  } catch (err) {
    console.error("Error fetching achievements:", err);
    return NextResponse.json({ error: "Failed to fetch achievements" }, { status: 500 });
  }
}
