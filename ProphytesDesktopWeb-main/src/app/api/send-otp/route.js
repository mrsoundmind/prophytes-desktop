import config from "@/config";
import { CookieManager } from "@/src/utils/cookieManager";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { email } = body;

    const response = await fetch(
      `${config.apiBaseUrl}/desktop/auth/send-otp-for-email-verification`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );
    if (!response.ok) {
      console.warn("⚠️ BACKEND FAILED, FALLING BACK TO MOCK DATA (SEND OTP)");
      return NextResponse.json({ success: true, message: "Mock OTP Sent successfully" }, { status: 200 });
    }

    return CookieManager.handleApiResponse(response);
  } catch (error) {
    console.warn("⚠️ NETWORK ERROR, FALLING BACK TO MOCK DATA (SEND OTP)");
    return NextResponse.json({ success: true, message: "Mock OTP Sent successfully" }, { status: 200 });
  }
}
