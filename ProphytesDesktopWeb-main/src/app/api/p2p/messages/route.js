import config from "@/config";
import { CookieManager } from "@/src/utils/cookieManager";

// GET request handler
export async function GET(request) {
  try {
    // Extract query parameters from the incoming request
    const { searchParams } = new URL(request.url);

    const skip = searchParams.get("skip") || 0;
    const limit = searchParams.get("limit") || 10;
    const type = searchParams.get("type") || "";

    const token = await CookieManager.getToken();

    const conversationId = searchParams.get("conversationId") || "";
    // Construct the query string to pass to the backend
    const queryParams = new URLSearchParams({
      skip,
      limit,
    });

    const url = `${
      config.apiBaseUrl
    }/desktop/chat/conversation/${conversationId}/messages?${queryParams.toString()}`;

    // Call the backend API with the query parameters
    const response = await fetch(`${url}`,{
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    // Check for errors in the response
    if (!response.ok) {
      throw new Error("Failed to get messages");
    }

    return CookieManager.handleApiResponse(response);
  } catch (error) {
    // Handle any errors
    return CookieManager.handleError(error);
  }
}
