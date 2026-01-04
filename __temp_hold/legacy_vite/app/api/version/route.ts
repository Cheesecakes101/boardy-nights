import { NextResponse } from "next/server";
import { execSync } from "node:child_process";

export async function GET() {
  let sha = "unknown";
  try {
    sha = execSync("git rev-parse --short HEAD").toString().trim();
  } catch {}

  return NextResponse.json({
    sha,
    node: process.version,
    env: process.env.REPL_ID ? "replit" : "unknown",
    timestamp: new Date().toISOString(),
  });
}
