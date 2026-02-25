import config from "@/config";
import { CookieManager } from "@/src/utils/cookieManager";

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

    return CookieManager.handleApiResponse(response);
  } catch (error) {
    return CookieManager.handleError(error);
  }
}
