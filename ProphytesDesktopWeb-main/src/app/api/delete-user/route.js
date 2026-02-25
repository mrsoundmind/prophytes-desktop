import config from "@/config";
import { CookieManager } from "@/src/utils/cookieManager";

export async function POST() {
  try {
    let token;
    token = await CookieManager.getToken();

    const response = await fetch(
      `${config.apiBaseUrl}/desktop/auth/deleteAccount`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200) {
      CookieManager.removeCookie(response);
    }
    return CookieManager.handleApiResponse(response);
  } catch (error) {
    return CookieManager.handleError(error);
  }
}
