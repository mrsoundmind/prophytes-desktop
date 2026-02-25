import config from "@/config";
import { CookieManager } from "@/src/utils/cookieManager";

// GET request handler
export async function PUT(request) {
  try {
    // Extract query parameters from the incoming request

    const { searchParams } = new URL(request.url);
    const token = await CookieManager.getToken();

    const conversationId = searchParams.get("conversationId") || "";
    const type = searchParams.get("type") || "";
    let url;

    if(type === "DIRECT") {
      url = `${config.apiBaseUrl}/desktop/chat/p2p/conversation/${conversationId}/accept`
    }else if(type === "GROUP") {
      url = `${config.apiBaseUrl}/desktop/chat/group/conversation/${conversationId}/accept`
    }

    // Call the backend API with the query parameters
    const response = await fetch(`${url}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    // Check for errors in the response
    if (!response.ok) {
      throw new Error("Failed to accept conversation request");
    }

    return CookieManager.handleApiResponse(response);
  } catch (error) {
    // Handle any errors
    return CookieManager.handleError(error);
  }
}
