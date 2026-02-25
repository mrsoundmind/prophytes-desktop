import { CookieManager } from "@/src/utils/cookieManager";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { token } = await request.json();

    const response = NextResponse.json({
      success: true,
      status: 200,
      message: "Token set successfully",
    });

    response.cookies.set("__token", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 1000 * 60 * 60 * 24 * 1000, // 1000 days
      path: "/",
    });
    return response;
  } catch (error) {
    return CookieManager.handleError(error);
  }
}
