import config from "@/config";
import { CookieManager } from "@/src/utils/cookieManager";

// GET request handler
export async function POST(request) {
  try {
    const data = await request.json();
    const token = await CookieManager.getToken();
   
    const response = await fetch(`${config.apiBaseUrl}/desktop/chat/group/conversation`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      credentials: "include",
      
    });

    // Check for errors in the response
    if (!response.ok) {
      throw new Error("Failed to create new conversation");
    }

    return CookieManager.handleApiResponse(response);
  } catch (error) {
    // Handle any errors
    return CookieManager.handleError(error);
  }
}
