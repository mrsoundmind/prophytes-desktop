import config from "@/config";
import { CookieManager } from "@/src/utils/cookieManager";

export async function GET(request, { params }) {
  const { id } = await params;
  let token;
  token = await CookieManager.getToken();

  try {
    const response = await fetch(
      `${config.apiBaseUrl}/desktop/connection-request/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return CookieManager.handleApiResponse(response);
  } catch (error) {
    return CookieManager.handleError(error);
  }
}
