import config from "@/config";
import { CookieManager } from "@/src/utils/cookieManager";

export async function POST(request) {
  try {
    const { verificationId } = await request.json();
    const token = await CookieManager.getToken();
    const url = `${config.apiBaseUrl}/desktop/chapter-member/verification/${verificationId}/enter
`;

    // Call the backend API with the query parameters
    const response = await fetch(`${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    return CookieManager.handleApiResponse(response);
  } catch (error) {
    return CookieManager.handleError(error);
  }
}
