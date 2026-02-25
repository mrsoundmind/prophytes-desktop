import config from "@/config";
import { CookieManager } from "@/src/utils/cookieManager";

// GET request handler
export async function GET(request) {
  try {
    let token;
    token = await CookieManager.getToken();

    if (!token) {
      token = request.headers.get("authorization").split(" ")[1];
    }

    // Extract query parameters from the incoming request
    const { searchParams } = new URL(request.url);

    const limit = searchParams.get("limit") || "10";
    const skip = searchParams.get("skip") || "0";
    const type = searchParams.get("type") || "";
    const sort = searchParams.get("sort") || "desc";

    // Construct the query string to pass to the backend
    const queryParams = new URLSearchParams({
      limit,
      skip,
      ...(type && { type }), // Only include type if provided
      sort,
    });

    const response = await fetch(
      `${config.apiBaseUrl}/desktop/notifications?${queryParams.toString()}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return CookieManager.handleApiResponse(response);
  } catch (error) {
    return CookieManager.handleError(error);
  }
}
