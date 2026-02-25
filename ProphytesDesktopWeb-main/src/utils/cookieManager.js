import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export class CookieManager {
  static TOKEN_NAME = "__token";

  static async getToken(request) {
    const cookieStore = await cookies();
    return cookieStore.get(this.TOKEN_NAME)?.value;
  }

  static setTokenCookie(response, token) {
    if (!token) return response;

    response.cookies.set(this.TOKEN_NAME, token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 1000 * 60 * 60 * 24 * 1000, // 1000 days
      path: "/",
    });
    return response;
  }

  static parseTokenFromHeader(response) {
    const rawSetCookie = response.headers.get("set-cookie");
    if (!rawSetCookie) return null;

    const match = rawSetCookie.match(/__token=([^;]+);?/);
    return match?.[1] || null;
  }

  static createResponse(response, data) {
    const responseObj = NextResponse.json(data, { status: response.status });
    const newToken = this.parseTokenFromHeader(response);

    if (newToken) {
      this.setTokenCookie(responseObj, newToken);
    }

    return responseObj;
  }

  static handleError(error) {
    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }

  static async handleApiResponse(response) {
    try {
      const result = await response.json();
      return this.createResponse(response, {
        status: response.status,
        success: response.ok,
        data: result,
      });
    } catch (error) {
      return this.handleError(error);
    }
  }

  static removeCookie(response) {
    response.cookies?.set(this.TOKEN_NAME, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      expires: new Date(0),
      path: "/",
    });
    return response;
  }
}
