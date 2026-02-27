import config from "@/config";
import { CookieManager } from "@/src/utils/cookieManager";
import { NextResponse } from "next/server";

// GET request handler
export async function GET(request) {
  try {
    // Check if we should use mock data (explicit flag only)
    if (process.env.USE_MOCK_DATA === "true") {
      console.warn("⚠️ USING MOCK DATA FOR COUNTRIES");
      return NextResponse.json(getMockCountries());
    }


    const token = await CookieManager.getToken();
    // Extract query parameters from the incoming request
    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search") || "";
    const skip = searchParams.get("skip") || 0;
    const limit = searchParams.get("limit") || 20;

    const queryParams = new URLSearchParams({
      search,
      skip,
      limit,
    });
    const url = `${config.apiBaseUrl
      }/desktop/getAllCountries?${queryParams.toString()}`;

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      console.warn("⚠️ BACKEND FAILED, FALLING BACK TO MOCK DATA (COUNTRIES)");
      return NextResponse.json(getMockCountries());
    }
    const countries = await response.json();
    return CookieManager.createResponse(response, countries);
  } catch (error) {
    console.warn("⚠️ NETWORK ERROR, FALLING BACK TO MOCK DATA (COUNTRIES)");
    return NextResponse.json(getMockCountries());
  }
}

function getMockCountries() {
  return {
    data: [
      { id: 233, name: "United States", code: "US", phone_code: "+1" },
      { id: 39, name: "Canada", code: "CA", phone_code: "+1" },
      { id: 232, name: "United Kingdom", code: "GB", phone_code: "+44" },
    ]
  };
}
