import { NextResponse } from "next/server";
import { CookieManager } from "@/src/utils/cookieManager";

export async function POST() {
  try {
    const response = NextResponse.json({
      success: true,
      message: "Logged out successfully",
    });
    // Clear __token cookie
    CookieManager.removeCookie(response);
    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Logout failed" },
      { status: 500 }
    );
  }
}
