// src/app/api/verify-otp-login/route.js
import config from "@/config";
import { CookieManager } from "@/src/utils/cookieManager";

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

    const result = await response.json();

    return CookieManager.createResponse(response, {
      status: response.status,
      success: response.ok,
      data: result,
    });
  } catch (error) {
    console.error("verify-otp-login: Error", error);
    return CookieManager.handleError(error);
  }
}
