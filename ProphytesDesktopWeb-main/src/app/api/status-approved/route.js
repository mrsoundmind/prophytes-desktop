import config from "@/config";
import { CookieManager } from "@/src/utils/cookieManager";

export async function POST(request) {
  try {
    let token;
     token = await CookieManager.getToken();

    if (!token) {
      token = request.headers.get("authorization").split(" ")[1];
    }

    const formData = await request.json();

    const response = await fetch(`${config.apiBaseUrl}/desktop/auth/upload-state-approved-ids`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
      credentials: "include",
    });

    // Use CookieManager to handle the response
    return CookieManager.createResponse(response, {
      status: response.status,
      success: true,
      message: await response.json(),
    });
  } catch (error) {
    return CookieManager.handleError(error);
  }
}
