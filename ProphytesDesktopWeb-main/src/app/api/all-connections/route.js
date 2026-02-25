import config from "@/config";
import { CookieManager } from "@/src/utils/cookieManager";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = await CookieManager.getToken();

    const skip = searchParams.get("skip") || 0;
    const limit = searchParams.get("limit") || 10;
    const name = searchParams.get("name");

    const queryParams = new URLSearchParams();
    queryParams.append("skip", skip);
    queryParams.append("limit", limit);
    if (name) queryParams.append("name", name);

    const url = `${
      config.apiBaseUrl
    }/desktop/all-connections?${queryParams.toString()}`;

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return CookieManager.handleApiResponse(response);
  } catch (error) {
    return CookieManager.handleError(error);
  }
}
