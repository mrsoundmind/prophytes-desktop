import config from "@/config";
import { CookieManager } from "@/src/utils/cookieManager";

// GET request handler
export async function POST(request) {
  try {
    const data = await request.json();
    const { conversationType, ...rest } = data;
    const token = await CookieManager.getToken();

    let url;
    if (conversationType === "GROUP") {
      url = `${config.apiBaseUrl}/desktop/chat/group/message`;
    } else if (conversationType === "DIRECT") {
      url = `${config.apiBaseUrl}/desktop/chat/p2p/message`;
    } else if (conversationType === "CHAPTER") {
      url = `${config.apiBaseUrl}/desktop/chat/chapter/message`;
    } else if (conversationType === "ORGANIZATION") {
      url = `${config.apiBaseUrl}/desktop/chat/organization/message`;
    }

    const response = await fetch(`${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(rest),
      credentials: "include",
    });

    // Check for errors in the response
    // if (!response.ok) {
    //   throw new Error("Failed to create new message");
    // }

    return CookieManager.handleApiResponse(response);
  } catch (error) {
    // Handle any errors
    return CookieManager.handleError(error);
  }
}
