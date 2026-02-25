import config from "@/config";
import { CookieManager } from "@/src/utils/cookieManager";

// GET request handler
export async function PUT(request) {
  try {
    // Extract query parameters from the incoming request

    const { searchParams } = new URL(request.url);

    const msgId = searchParams.get("msgId") || "";
    const body = await request.json();
    const token = await CookieManager.getToken();

    const url = `${
      config.apiBaseUrl
    }/desktop/chat/p2p/message/${msgId}`;

    // Call the backend API with the query parameters
    const response = await fetch(`${url}`,{
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    });

    // Check for errors in the response
    if (!response.ok) {
      throw new Error("Failed to update message");
    }

    return CookieManager.handleApiResponse(response);
  } catch (error) {
    // Handle any errors
    return CookieManager.handleError(error);
  }
}
