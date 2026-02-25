import config from "@/config";
import { CookieManager } from "@/src/utils/cookieManager";

export async function POST(request) {
  try {
    // const url = request.url;
    const referer = request.headers.get("referer");
    const { searchParams } = new URL(request.url);
    const queryParams = new URLSearchParams({});
    const type = searchParams.get("type");
    if (type) {
      queryParams.append("type", type);
    }

    const body = await request.json();
    const { phoneNumber } = body;
    const url = `${
      config.apiBaseUrl
    }/desktop/auth/sendOTP?${queryParams.toString()}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Frontend-Url": referer,
      },
      body: JSON.stringify({ phoneNumber }),
    });
    let result = response;
    if (!response.ok) {
      result = await response.json();
    }
    return CookieManager.createResponse(response, {
      status: response.status,
      success: response.ok,
      data: result,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
