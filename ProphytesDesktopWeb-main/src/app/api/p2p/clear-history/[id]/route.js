import config from "@/config";
import { CookieManager } from "@/src/utils/cookieManager";

// GET request handler
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const token = await CookieManager.getToken();
    const url = `${config.apiBaseUrl}/desktop/chat/p2p/conversation/${id}/clear`;

    // Call the backend API with the query parameters
    const response = await fetch(`${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "PUT",
    });

    // Check for errors in the response
    if (!response.ok) {
      throw new Error("Failed to update the group name");
    }

    return CookieManager.handleApiResponse(response);
  } catch (error) {
    // Handle any errors
    return CookieManager.handleError(error);
  }
}
