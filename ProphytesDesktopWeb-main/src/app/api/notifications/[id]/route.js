import { NextResponse } from "next/server";
import { CookieManager } from "@/src/utils/cookieManager";
import config from "@/config";

export async function POST(request, { params }) {
  try {
    const { id } = await params;

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
      `${config.apiBaseUrl}/desktop/notifications/${id}/read`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return CookieManager.handleApiResponse(response);
  } catch (error) {
    return CookieManager.handleError(error);
  }
}
