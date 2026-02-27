import config from "@/config";
import { CookieManager } from "@/src/utils/cookieManager";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // Check if we should use mock data (explicit flag only)
    if (process.env.USE_MOCK_DATA === "true") {
      console.warn("⚠️ USING MOCK DATA FOR UNIVERSITIES");
      return NextResponse.json(getMockUniversities());
    }

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const skip = parseInt(searchParams.get("skip") || "0", 10);
    const limit = parseInt(searchParams.get("limit") || "20", 10);

    const queryParams = new URLSearchParams({
      search,
      skip: skip.toString(),
      limit: limit.toString(),
    });
    const url = `${config.apiBaseUrl
      }/desktop/getAllUniversities?${queryParams.toString()}`;

    const response = await fetch(url);

    if (!response.ok) {
      console.warn("⚠️ BACKEND FAILED, FALLING BACK TO MOCK DATA (UNIVERSITIES)");
      return NextResponse.json(getMockUniversities());
    }

    const universities = await response.json();
    return CookieManager.createResponse(response, universities);
  } catch (error) {
    console.warn("⚠️ NETWORK ERROR, FALLING BACK TO MOCK DATA (UNIVERSITIES)");
    return NextResponse.json(getMockUniversities());
  }
}

function getMockUniversities() {
  return {
    data: [
      { id: 1, name: "Howard University" },
      { id: 2, name: "Spelman College" },
      { id: 3, name: "Morehouse College" },
      { id: 4, name: "Florida A&M University" },
      { id: 5, name: "North Carolina A&T State University" },
      { id: 6, name: "Hampton University" },
      { id: 7, name: "Tuskegee University" },
      { id: 8, name: "Xavier University of Louisiana" },
      { id: 9, name: "Clark Atlanta University" },
      { id: 10, name: "Fisk University" },
    ]
  };
}
