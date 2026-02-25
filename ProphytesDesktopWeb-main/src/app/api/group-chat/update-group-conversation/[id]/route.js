import config from "@/config";
import { CookieManager } from "@/src/utils/cookieManager";

// GET request handler
export async function PUT(request, { params }) {
  try {
    // Extract query parameters from the incoming request

    const { id } = await params;
    const token = await CookieManager.getToken();
    const body = await request.json();

    const url = `${config.apiBaseUrl}/desktop/chat/group/conversation/${id}`;

    // Call the backend API with the query parameters
    const response = await fetch(`${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(body),
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
