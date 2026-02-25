import config from "@/config";
import { CookieManager } from "@/src/utils/cookieManager";

// GET request handler
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = await CookieManager.getToken();

    const conversationId = searchParams.get("conversationId") || "";

    const url = `${config.apiBaseUrl}/desktop/chat/group/conversation/leave/${conversationId}`;

    // Call the backend API with the query parameters
    const response = await fetch(`${url}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Check for errors in the response
    if (!response.ok) {
      throw new Error("Failed to delete conversation");
    }

    return CookieManager.handleApiResponse(response);
  } catch (error) {
    // Handle any errors
    return CookieManager.handleError(error);
  }
}
