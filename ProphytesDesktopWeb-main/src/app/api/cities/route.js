import config from "@/config";
import { CookieManager } from "@/src/utils/cookieManager";
import { NextResponse } from "next/server";

// GET request handler
export async function GET(request) {
  try {
    // Check if we should use mock data (dev mode only)
    if (process.env.USE_MOCK_DATA === "true") {
      console.warn("⚠️ USING MOCK DATA FOR CITIES");
      return NextResponse.json(getMockCities());
    }

    // Extract query parameters from the incoming request
    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search") || "";
    const stateId = searchParams.get("stateId") || "";
    const skip = searchParams.get("skip") || 0;
    const limit = searchParams.get("limit") || 20;

    const queryParams = new URLSearchParams({
      search,
      stateId,
      skip,
      limit,
    });

    const response = await fetch(
      `${config.apiBaseUrl}/desktop/getAllCities?${queryParams.toString()}`
    );
    if (!response.ok) {
      // If backend fails and we are in dev mode, fallback to mock data
      if (process.env.NODE_ENV === "development") {
        console.warn("⚠️ BACKEND FAILED, FALLING BACK TO MOCK DATA (CITIES)");
        return NextResponse.json(getMockCities());
      }
      throw new Error("Failed to fetch organizations");
    }
    const organizations = await response.json();
    return CookieManager.createResponse(response, organizations);
  } catch (error) {
    if (process.env.NODE_ENV === "development" || process.env.USE_MOCK_DATA === "true") {
      console.warn("⚠️ NETWORK ERROR, FALLING BACK TO MOCK DATA (CITIES)");
      return NextResponse.json(getMockCities());
    }
    return CookieManager.handleError(error);
  }
}

function getMockCities() {
  return {
    data: [
      { id: 1, name: "New York", stateId: 3950 },
      { id: 2, name: "Los Angeles", stateId: 3923 },
      { id: 3, name: "Chicago", stateId: 3931 },
      { id: 4, name: "Houston", stateId: 3961 },
      { id: 5, name: "Phoenix", stateId: 3921 },
      { id: 6, name: "Philadelphia", stateId: 3956 },
      { id: 7, name: "San Antonio", stateId: 3961 },
      { id: 8, name: "San Diego", stateId: 3923 },
      { id: 9, name: "Dallas", stateId: 3961 },
      { id: 10, name: "San Jose", stateId: 3923 },
      { id: 11, name: "Washington", stateId: 3926 }, // DC isn't a state in our mock but just for example
      { id: 12, name: "Atlanta", stateId: 3928 },
      { id: 13, name: "Baltimore", stateId: 3938 },
    ]
  };
}
