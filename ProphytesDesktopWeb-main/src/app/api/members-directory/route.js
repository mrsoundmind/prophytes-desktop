
import config from "@/config";
import { CookieManager } from "@/src/utils/cookieManager";

// GET request handler
export async function GET() {
  try {
    const response = await fetch(
      `${config.apiBaseUrl}/desktop/members-directory`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch members");
    }
    const members = await response.json();
    return CookieManager.createResponse(response, members);
  } catch (error) {
    return CookieManager.handleError(error);
  }
}
