import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Experience, { IExperience } from "@/models/Experience";

export async function GET() {
  try {
    await connectDB();
    const experiences: IExperience[] = await Experience.find({}).sort({ duration: -1 });
    return NextResponse.json(experiences, { status: 200 });
  } catch (err) {
    console.error("Error fetching experiences:", err);
    return NextResponse.json({ error: "Failed to fetch experiences" }, { status: 500 });
  }
}
