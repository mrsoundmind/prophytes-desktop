// src/app/api/me/route.js
import { NextResponse } from "next/server";
import { CookieManager } from "@/src/utils/cookieManager";
import config from "@/config";

export async function GET(request) {
  const token = await CookieManager.getToken(request);
  if (!token) {
    return NextResponse.json(
      { message: "Authentication required" },
      { status: 401 }
    );
  }

  try {
    const response = await fetch(`${config.apiBaseUrl}/desktop/auth/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const me = await response.json();
    if (!response.ok) {
      throw new Error("Invalid token");
    }
    return CookieManager.createResponse(response, me);
  } catch (error) {
    return CookieManager.handleError(error);
  }
}
