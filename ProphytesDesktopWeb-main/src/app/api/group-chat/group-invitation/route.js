import config from "@/config";
import { CookieManager } from "@/src/utils/cookieManager";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = await CookieManager.getToken();

    const skip = searchParams.get("skip") || 0;
    const limit = searchParams.get("limit") || 20;
    const conversationId = searchParams.get("conversationId");
    const name = searchParams.get("name");

    const queryParams = new URLSearchParams();
    queryParams.append("skip", skip);
    queryParams.append("limit", limit);
    queryParams.append("conversationId", conversationId);
    if (name) queryParams.append("name", name);

    const url = `${
      config.apiBaseUrl
    }/desktop/chat/group/conversation/invite-lists?${queryParams.toString()}`;

    const response = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return CookieManager.handleApiResponse(response);
  } catch (error) {
    return CookieManager.handleError(error);
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { conversationId, ...rest } = data;
    const token = await CookieManager.getToken();

    let url = `${config.apiBaseUrl}/desktop/chat/group/conversation/add-member/${conversationId}`;

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
