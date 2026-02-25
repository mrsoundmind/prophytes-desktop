import config from "@/config";
import { CookieManager } from "@/src/utils/cookieManager";

// GET request handler
export async function DELETE(request) {
  try {
    // Extract query parameters from the incoming request

    const { searchParams } = new URL(request.url);
    const token = await CookieManager.getToken();

    const msgId = searchParams.get("msgId") || "";

    const url = `${
      config.apiBaseUrl
    }/desktop/chat/p2p/message/${msgId}`;

    // Call the backend API with the query parameters
    const response = await fetch(`${url}`,{
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });

    // Check for errors in the response
    if (!response.ok) {
      throw new Error("Failed to delete message");
    }

    return CookieManager.handleApiResponse(response);
  } catch (error) {
    // Handle any errors
    return CookieManager.handleError(error);
  }
}
