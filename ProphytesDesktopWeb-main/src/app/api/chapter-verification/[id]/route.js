import config from "@/config";
import { CookieManager } from "@/src/utils/cookieManager";

// GET request handler
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const token = await CookieManager.getToken();
    const url = `${config.apiBaseUrl}/desktop/chapter-member/verification/${id}/vote
`;

    // Call the backend API with the query parameters
    const response = await fetch(`${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "DELETE",
    });

    return CookieManager.handleApiResponse(response);
  } catch (error) {
    return CookieManager.handleError(error);
  }
}

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const token = await CookieManager.getToken();
    const url = `${config.apiBaseUrl}/desktop/chapter-member/verification/${id}`;
    // Call the backend API with the query parameters
    const response = await fetch(`${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: "GET",
    });

    return CookieManager.handleApiResponse(response);
  } catch (error) {
    return CookieManager.handleError(error);
  }
}
