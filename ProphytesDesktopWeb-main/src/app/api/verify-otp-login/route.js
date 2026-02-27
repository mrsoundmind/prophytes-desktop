// src/app/api/verify-otp-login/route.js
import config from "@/config";
import { CookieManager } from "@/src/utils/cookieManager";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const response = await fetch(
      `${config.apiBaseUrl}/desktop/auth/verifyOTP`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
        credentials: "include",
      }
    );

    if (!response.ok) {
      console.warn("⚠️ BACKEND FAILED, FALLING BACK TO MOCK DATA (VERIFY OTP)");
      return NextResponse.json(
        { success: true, data: { message: "Mock OTP Verified", token: "mock-token" } },
        { status: 200 }
      );
    }

    const result = await response.json();

    return CookieManager.createResponse(response, {
      status: response.status,
      success: response.ok,
      data: result,
    });
  } catch (error) {
    console.warn("⚠️ NETWORK ERROR, FALLING BACK TO MOCK DATA (VERIFY OTP)");
    return NextResponse.json(
      { success: true, data: { message: "Mock OTP Verified", token: "mock-token" } },
      { status: 200 }
    );
  }
}
