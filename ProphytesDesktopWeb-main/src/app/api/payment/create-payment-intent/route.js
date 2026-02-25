import { NextRequest, NextResponse } from "next/server";
import config from "@/config";

export async function POST(request) {
  try {
    const { amount, currency = "usd" } = await request.json();

    const response = await fetch(
      `${config.apiBaseUrl}/payments/create-payment-intent`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, currency }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create payment intent");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
