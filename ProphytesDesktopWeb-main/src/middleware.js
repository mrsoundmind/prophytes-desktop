import { NextResponse } from "next/server";
import { CookieManager } from "./utils/cookieManager";
import secret from "@/config";
import { ROUTES } from "./configs/constants";

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  const url = request.nextUrl.clone();

  // Allow public routes without token validation
  if (ROUTES.PUBLIC.includes(pathname)) {
    return NextResponse.next();
  }

  // Check for restricted and protected routes
  const isRestricted = ROUTES.RESTRICTED?.some((path) =>
    pathname.startsWith(path)
  );
  const isProtected = ROUTES.PROTECTED?.some((path) =>
    pathname.startsWith(path)
  );
  // const isTokenProtected = ROUTES.TOKEN_PROTECTED?.some((route) =>
  //   pathname.startsWith(route)
  // );

  const token = await CookieManager.getToken(request);

  // Handle restricted routes (/signin, /onboard) for authenticated users
  if (isRestricted && token) {
    try {
      const fetchResponse = await fetch(
        `${secret.apiBaseUrl}/desktop/auth/me`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (fetchResponse.ok) {
        url.pathname = "/profile";
        return NextResponse.redirect(url);
      }
      const nextResponse = NextResponse.next();
      CookieManager.removeCookie(nextResponse);
      return nextResponse;
    } catch (error) {
      const nextResponse = NextResponse.next();
      CookieManager.removeCookie(nextResponse);
      return nextResponse;
    }
  }

  // only token verified
  // if (isTokenProtected) {
  //   if (!token) {
  //     url.pathname = "/signin";
  //     return NextResponse.redirect(url);
  //   }
  //   return NextResponse.next();
  // }

  // Handle protected routes with full verification
  if (isProtected) {
    if (!token) {
      if (request.headers.get("accept")?.includes("application/json")) {
        return NextResponse.json(
          { message: "Authentication required" },
          { status: 401 }
        );
      }
      url.pathname = "/signin";
      return NextResponse.redirect(url);
    }

    try {
      const fetchResponse = await fetch(
        `${secret.apiBaseUrl}/desktop/auth/me`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!fetchResponse.ok) {
        throw new Error("Invalid token");
      }

      const data = await fetchResponse.json();

      if (!data?.user?.isVerified && pathname !== "/account-status") {
        url.pathname = "/account-status";
        return NextResponse.redirect(url);
      }

      if (data?.user?.isVerified && pathname === "/account-status") {
        url.pathname = "/profile";
        return NextResponse.redirect(url);
      }
    } catch (error) {
      if (request.headers.get("accept")?.includes("application/json")) {
        return NextResponse.json(
          { message: "Invalid or expired token" },
          { status: 401 }
        );
      }
      url.pathname = "/signin";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile/:path*",
    "/account-status",
    "/signin/:path*",
    "/onboard/:path*",
    // "/api/userinfo-update",
    // "/chat/:path*",
  ],
};
