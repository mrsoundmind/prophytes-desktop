import { NextRequest, NextResponse } from "next/server";
import config from "@/config";
import { CookieManager } from "@/src/utils/cookieManager";

export async function POST(request) {
  try {
    const { priceId } = await request.json();
    const token = await CookieManager.getToken();

    const response = await fetch(
      `${config.apiBaseUrl}/payments/create-subscription`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ priceId }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create subscription");
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
