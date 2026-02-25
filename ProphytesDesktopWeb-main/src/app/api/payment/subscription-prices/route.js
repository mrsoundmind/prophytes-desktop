import { NextRequest, NextResponse } from "next/server";
import config from "@/config";

export async function GET(request) {
  try {
    const response = await fetch(
      `${config.apiBaseUrl}/payments/subscription-prices`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch subscription prices");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
