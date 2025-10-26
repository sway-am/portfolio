// app/api/achievements/route.ts
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Achievement, { IAchievement } from "@/models/Achievement";

export async function GET(): Promise<NextResponse> {
  try {
    await connectDB();
    const achievements: IAchievement[] = await Achievement.find({}).sort({ achievementdate: -1 });

    // s-maxage: seconds to cache at CDN/edge
    // stale-while-revalidate: allow serving stale while origin revalidates in background
    const cacheHeader = "s-maxage=60, stale-while-revalidate=30"; // tweak TTL to your needs

    return NextResponse.json(achievements, {
      status: 200,
      headers: { "Cache-Control": cacheHeader },
    });
  } catch (err) {
    console.error("Error fetching achievements:", (err as Error).message || err);
    return NextResponse.json({ error: "Failed to fetch achievements" }, { status: 500 });
  }
}
