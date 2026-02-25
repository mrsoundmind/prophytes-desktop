import config from "@/config";
import { CookieManager } from "@/src/utils/cookieManager";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  try {
    const body = await request.json();

    let token;
    token = await CookieManager.getToken();

    if (!token) {
      token = request.headers.get("authorization").split(" ")[1];
    }

    if (!token) {
      return NextResponse.json(
        { message: "Authentication required" },
        { status: 401 }
      );
    }

    const response = await fetch(
      `${config.apiBaseUrl}/desktop/notifications/mark-all-read`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      }
    );

    return CookieManager.handleApiResponse(response);
  } catch (error) {
    return CookieManager.handleError(error);
  }
}
