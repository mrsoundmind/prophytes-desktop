import config from "@/config";
import { CookieManager } from "@/src/utils/cookieManager";
import { NextResponse } from "next/server";

// GET request handler
export async function GET(request) {
  try {
    // Check if we should use mock data (explicit flag only)
    if (process.env.USE_MOCK_DATA === "true") {
      console.warn("⚠️ USING MOCK DATA FOR STATES");
      return NextResponse.json(getMockStates());
    }

    // Extract query parameters from the incoming request
    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search") || "";
    const countryId = searchParams.get("countryId") || "";
    const skip = searchParams.get("skip") || 0;
    const limit = searchParams.get("limit") || 20;

    // Construct the query string to pass to the backend
    const queryParams = new URLSearchParams({
      search,
      countryId,
      skip,
      limit,
    });

    const response = await fetch(
      `${config.apiBaseUrl}/desktop/states?${queryParams.toString()}`
    );
    if (!response.ok) {
      console.warn("⚠️ BACKEND FAILED, FALLING BACK TO MOCK DATA (STATES)");
      return NextResponse.json(getMockStates());
    }
    const states = await response.json();
    return CookieManager.createResponse(response, states);
  } catch (error) {
    console.warn("⚠️ NETWORK ERROR, FALLING BACK TO MOCK DATA (STATES)");
    return NextResponse.json(getMockStates());
  }
}

function getMockStates() {
  return {
    states: [
      { id: 3919, name: "Alabama", state_code: "AL" },
      { id: 3920, name: "Alaska", state_code: "AK" },
      { id: 3921, name: "Arizona", state_code: "AZ" },
      { id: 3922, name: "Arkansas", state_code: "AR" },
      { id: 3923, name: "California", state_code: "CA" },
      { id: 3924, name: "Colorado", state_code: "CO" },
      { id: 3925, name: "Connecticut", state_code: "CT" },
      { id: 3926, name: "Delaware", state_code: "DE" },
      { id: 3927, name: "Florida", state_code: "FL" },
      { id: 3928, name: "Georgia", state_code: "GA" },
      { id: 3929, name: "Hawaii", state_code: "HI" },
      { id: 3930, name: "Idaho", state_code: "ID" },
      { id: 3931, name: "Illinois", state_code: "IL" },
      { id: 3932, name: "Indiana", state_code: "IN" },
      { id: 3933, name: "Iowa", state_code: "IA" },
      { id: 3934, name: "Kansas", state_code: "KS" },
      { id: 3935, name: "Kentucky", state_code: "KY" },
      { id: 3936, name: "Louisiana", state_code: "LA" },
      { id: 3937, name: "Maine", state_code: "ME" },
      { id: 3938, name: "Maryland", state_code: "MD" },
      { id: 3939, name: "Massachusetts", state_code: "MA" },
      { id: 3940, name: "Michigan", state_code: "MI" },
      { id: 3941, name: "Minnesota", state_code: "MN" },
      { id: 3942, name: "Mississippi", state_code: "MS" },
      { id: 3943, name: "Missouri", state_code: "MO" },
      { id: 3944, name: "Montana", state_code: "MT" },
      { id: 3945, name: "Nebraska", state_code: "NE" },
      { id: 3946, name: "Nevada", state_code: "NV" },
      { id: 3947, name: "New Hampshire", state_code: "NH" },
      { id: 3948, name: "New Jersey", state_code: "NJ" },
      { id: 3949, name: "New Mexico", state_code: "NM" },
      { id: 3950, name: "New York", state_code: "NY" },
      { id: 3951, name: "North Carolina", state_code: "NC" },
      { id: 3952, name: "North Dakota", state_code: "ND" },
      { id: 3953, name: "Ohio", state_code: "OH" },
      { id: 3954, name: "Oklahoma", state_code: "OK" },
      { id: 3955, name: "Oregon", state_code: "OR" },
      { id: 3956, name: "Pennsylvania", state_code: "PA" },
      { id: 3957, name: "Rhode Island", state_code: "RI" },
      { id: 3958, name: "South Carolina", state_code: "SC" },
      { id: 3959, name: "South Dakota", state_code: "SD" },
      { id: 3960, name: "Tennessee", state_code: "TN" },
      { id: 3961, name: "Texas", state_code: "TX" },
      { id: 3962, name: "Utah", state_code: "UT" },
      { id: 3963, name: "Vermont", state_code: "VT" },
      { id: 3964, name: "Virginia", state_code: "VA" },
      { id: 3965, name: "Washington", state_code: "WA" },
      { id: 3966, name: "West Virginia", state_code: "WV" },
      { id: 3967, name: "Wisconsin", state_code: "WI" },
      { id: 3968, name: "Wyoming", state_code: "WY" }
    ]
  };
}
