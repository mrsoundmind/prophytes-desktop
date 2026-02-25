import config from "@/config";
import { CookieManager } from "@/src/utils/cookieManager";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { subscriptionId} = await request.json();
    let token = await CookieManager.getToken();
    if (!token) {
      token = request.headers.get("authorization")?.split(" ")[1];
    }
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const response = await fetch(`${config.apiBaseUrl}/desktop/payments/cancel-subscription`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ subscriptionId }),
    });

    return CookieManager.handleApiResponse(response);
  } catch (error) {
    console.error("Internal Error:", error);
    return CookieManager.handleError(error);
  }
}