// lib/mongodb.ts
import mongoose from "mongoose";

declare global {
  // Extend global to store mongoose cache across hot reloads
  // @ts-ignore
  var mongooseCache: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  };
}

// Use cached connection if it exists
const cached = global.mongooseCache ?? { conn: null, promise: null };

async function connectDB(): Promise<typeof mongoose> {
  // Return cached connection if available
  if (cached.conn) return cached.conn;

  // Create a new connection if not cached
  if (!cached.promise) {
    if (!process.env.MONGO_URI) {
      throw new Error("Please define the MONGO_URI environment variable");
    }

    cached.promise = mongoose.connect(process.env.MONGO_URI).then((mongoose) => mongoose);
  }

  cached.conn = await cached.promise;
  global.mongooseCache = cached; // save for hot reloads in development
  return cached.conn;
}

export default connectDB;
