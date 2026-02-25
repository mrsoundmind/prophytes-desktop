import config from "@/config";
import { CookieManager } from "@/src/utils/cookieManager";

export async function POST(request) {
  try {
    const body = await request.json();
    const backend2Response = await fetch(
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

    return CookieManager.createResponse(backend2Response, {
      success: true,
      status: backend2Response.status,
      message: await backend2Response.json(),
    });
  } catch (error) {
    return CookieManager.handleError(error);
  }
}
