import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Project, { IProject } from "@/models/Project";

export async function GET() {
  try {
    await connectDB();
    const projects: IProject[] = await Project.find({}).sort({ title: 1 }); // sort by title
    return NextResponse.json(projects, { status: 200 });
  } catch (err) {
    console.error("Error fetching projects:", err);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}
