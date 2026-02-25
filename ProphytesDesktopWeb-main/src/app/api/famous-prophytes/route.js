import config from "@/config";
import { CookieManager } from "@/src/utils/cookieManager";

// GET request handler
export async function GET(request) {
  try {
    // Extract query parameters from the incoming request

    const { searchParams } = new URL(request.url);
    const skip = searchParams.get("skip") || 0;
    const limit = searchParams.get("limit") || 20;
    const organization = searchParams.get("organization") || "";
    const search = searchParams.get("search") || "";

    // Construct the query string to pass to the backend
    const queryParams = new URLSearchParams({
      organization,
      search,
      limit,
      skip,
    });

    const api = `${
      config.apiBaseUrl
    }/desktop/famous-prophytes?${queryParams.toString()}`;

    const response = await fetch(api);
    if (!response.ok) {
      throw new Error("Failed to fetch prophytes");
    }
    const prophytes = await response.json();
    return CookieManager.createResponse(response, prophytes);
  } catch (error) {
    return CookieManager.handleError(error);
  }
}
