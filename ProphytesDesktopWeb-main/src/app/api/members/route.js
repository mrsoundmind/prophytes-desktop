
import config from "@/config";
import { CookieManager } from "@/src/utils/cookieManager";

// GET request handler
export async function GET(request) {
  try {
    // Extract query parameters from the incoming request
    const { searchParams } = new URL(request.url);
    const skip = searchParams.get("skip") || 0;
    const limit = searchParams.get("limit") || 20;
    const organizationId = searchParams.get("organizationId") || "";
    const school = searchParams.get("school") || "";
    const search = searchParams.get("search") || "";
    const chapter = searchParams.get("chapter") || "";
    const location = searchParams.get("location") || "";
    const initial = searchParams.get("initial") || "";
    // Construct the query string to pass to the backend
    const queryParams = new URLSearchParams({
      skip,
      limit,
      organizationId,
      search,
      school,
      chapter,
      location,
      initial,
    });
    const api = `${
      config.apiBaseUrl
    }/desktop/members?${queryParams.toString()}`;

    // Call the backend API with the query parameters
    const response = await fetch(api);
    // Check for errors in the response
    if (!response.ok) {
      throw new Error("Failed to fetch members");
    }

    // Parse and return the response from the backend
    const members = await response.json();
    return CookieManager.createResponse(response, members);
  } catch (error) {
    // Handle any errors
    return CookieManager.handleError(error);
  }
}
