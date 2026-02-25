import { NextResponse } from "next/server";
import config from "@/config";
import { CookieManager } from "@/src/utils/cookieManager";

export async function GET(request, { params }) {
  const { id } = await params;

  try {
    const response = await fetch(`${config.apiBaseUrl}/desktop/member/${id}`);

    if (!response.ok) {
      return NextResponse.json(
        { error: "Member not found" },
        { status: response.status }
      );
    }

    const member = await response.json();
    return CookieManager.createResponse(response, member);
  } catch (error) {
    return CookieManager.handleError(error);
  }
}
