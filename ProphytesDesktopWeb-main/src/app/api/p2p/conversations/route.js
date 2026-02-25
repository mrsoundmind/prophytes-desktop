import config from "@/config";
import { CookieManager } from "@/src/utils/cookieManager";

// GET request handler
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = await CookieManager.getToken();

    const queryParams = new URLSearchParams({
      skip: searchParams.get("skip") || 0,
      limit: searchParams.get("limit") || 10,
    });

    const type = searchParams.get("type");
    const name = searchParams.get("name");

    if (name) {
      queryParams.append("name", name);
    }
    if (type) {
      queryParams.append("type", type);
    }

    const url = `${
      config.apiBaseUrl
    }/desktop/chat/conversations?${queryParams.toString()}`;

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
