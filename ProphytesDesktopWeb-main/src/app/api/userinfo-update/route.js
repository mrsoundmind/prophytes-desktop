import config from "@/config";
import { CookieManager } from "@/src/utils/cookieManager";
export async function POST(request) {
  try {
    let token;
    token = await CookieManager.getToken();

    if (!token) {
      token = request.headers.get("authorization").split(" ")[1];
    }

    const body = await request.json();

    const response = await fetch(`${config.apiBaseUrl}/desktop/edit-profile`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    return CookieManager.handleApiResponse(response);
  } catch (error) {
    return CookieManager.handleError(error);
  }
}
