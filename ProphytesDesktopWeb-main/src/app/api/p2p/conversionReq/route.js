import config from "@/config";
import { CookieManager } from "@/src/utils/cookieManager";

// GET request handler
export async function GET(request) {
  try {
    const token = await CookieManager.getToken();
    const { searchParams } = new URL(request.url);
    const name = searchParams.get("name");
    const type = searchParams.get("type");
    const queryParams = new URLSearchParams();
    if (name) {
      queryParams.append("name", name);
    }
    if (type) {
      queryParams.append("type", type);
    }
    const url = `${
      config.apiBaseUrl
    }/desktop/chat/conversations/pending?${queryParams.toString()}`;

    // Call the backend API with the query parameters
    const response = await fetch(`${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Check for errors in the response
    if (!response.ok) {
      throw new Error("Failed to get conversation requests");
    }

    return CookieManager.handleApiResponse(response);
  } catch (error) {
    // Handle any errors
    return CookieManager.handleError(error);
  }
}
