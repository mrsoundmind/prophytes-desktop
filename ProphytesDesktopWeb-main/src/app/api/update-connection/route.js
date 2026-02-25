import config from "@/config";
import { CookieManager } from "@/src/utils/cookieManager";

export async function POST(request) {
  let token;
  const body = await request.json();
  token = await CookieManager.getToken();
  if (!token) {
    token = request.headers.get("authorization").split(" ")[1];
  }

  try {
    const response = await fetch(
      `${config.apiBaseUrl}/desktop/update-connection-request`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      }
    );

    return CookieManager.handleApiResponse(response);
  } catch (error) {
    return CookieManager.handleError(error);
  }
}
