import config from "@/config";
import { CookieManager } from "@/src/utils/cookieManager";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request) {
  try {

    const response =await fetch(`${config.apiBaseUrl}/desktop/payments/subscription-prices`);

    return CookieManager.handleApiResponse(response);
  } catch (error) {
    console.error("Internal Error:", error);
    // Handle other errors (e.g., network issues, parsing errors)
    return CookieManager.handleError(error);
  }
}