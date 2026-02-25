import config from "@/config";
import { CookieManager } from "@/src/utils/cookieManager";

export async function POST(request) {
  try {
    const data = await request.json();
    const { verificationId, ...rest } = data;
    const token = await CookieManager.getToken();
    let url = `${config.apiBaseUrl}/desktop/chapter-member/verification/${verificationId}/vote`;

    const response = await fetch(`${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(rest),
      credentials: "include",
    });

    return CookieManager.handleApiResponse(response);
  } catch (error) {
    // Handle any errors
    return CookieManager.handleError(error);
  }
}
