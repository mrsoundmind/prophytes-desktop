import config from "@/config";
import { CookieManager } from "@/src/utils/cookieManager";

// GET request handler
export async function GET(request) {
  try {
    const token = await CookieManager.getToken();
    const url = `${config.apiBaseUrl}/desktop/chat/unreadCount`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return CookieManager.handleApiResponse(response);
  } catch (error) {
    return CookieManager.handleError(error);
  }
}
