import config from "@/config";
import { CookieManager } from "@/src/utils/cookieManager";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const response = await fetch(
      `${config.apiBaseUrl}/desktop/auth/verify-email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        credentials: "include",
      }
    );

    return NextResponse.json(
      {
        success: true,
        status: response.status,
        data: await response.json(),
      },
      {
        status: response.status,
      }
    );
  } catch (error) {
    return CookieManager.handleError(error);
  }
}
