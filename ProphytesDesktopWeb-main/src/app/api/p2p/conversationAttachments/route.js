import config from "@/config";
import { CookieManager } from "@/src/utils/cookieManager";

// GET request handler
export async function GET(request) {
  try {
    const token = await CookieManager.getToken();

    const { searchParams } = new URL(request.url);

    const queryParams = new URLSearchParams({
      skip: searchParams.get("skip") || 0,
      limit: searchParams.get("limit") || 10,
    });

    const type = searchParams.get("type");
    if (type) {
      queryParams.append("type", type);
    }
    const conversationId = searchParams.get("conversationId") || "";

    const url = `${
      config.apiBaseUrl
    }/desktop/chat/conversation/${conversationId}/attachments?${queryParams.toString()}`;

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
