import config from "@/config";
import { CookieManager } from "@/src/utils/cookieManager";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request) {
  try {
    let token = await CookieManager.getToken();

    if (!token) {
      token = request.headers.get("authorization").split(" ")[1];
    }

    const response =await fetch(`${config.apiBaseUrl}/desktop/payments/create-setup-intent`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return CookieManager.handleApiResponse(response);
  } catch (error) {
    console.error("Internal Error:", error);
    // Handle other errors (e.g., network issues, parsing errors)
    return CookieManager.handleError(error);
  }
}