
import config from "@/config";
import { CookieManager } from "@/src/utils/cookieManager";
import { NextResponse } from "next/server";

// GET request handler
// GET request handler
export async function GET() {
  try {
    // Check if we should use mock data (explicit flag only)
    if (process.env.USE_MOCK_DATA === "true") {
      console.warn("⚠️ USING MOCK DATA FOR ORGANIZATIONS");
      return NextResponse.json(getMockOrganizations());
    }

    const response = await fetch(`${config.apiBaseUrl}/desktop/organizations`);
    if (!response.ok) {
      // If backend fails and mock flag is on, fallback
      if (process.env.USE_MOCK_DATA === "true") {
        console.warn("⚠️ BACKEND FAILED, FALLING BACK TO MOCK DATA");
        return NextResponse.json(getMockOrganizations());
      }
      throw new Error("Failed to fetch organizations");
    }
    const organizations = await response.json();
    return CookieManager.createResponse(response, organizations);
  } catch (error) {
    // If backend fails (network error) and mock flag is on, fallback
    if (process.env.USE_MOCK_DATA === "true") {
      console.warn("⚠️ NETWORK ERROR, FALLING BACK TO MOCK DATA");
      return NextResponse.json(getMockOrganizations());
    }
    return CookieManager.handleError(error);
  }
}

function getMockOrganizations() {
  return {
    organizations: [
      {
        id: 1,
        organization: "Alpha Phi Alpha",
        miniLogo: "/img/onboading/organaization-01.png",
        color: "CFB53B", // Old Gold
      },
      {
        id: 2,
        organization: "Alpha Kappa Alpha",
        miniLogo: "/img/onboading/organaization-02.png",
        color: "F5A9B8", // Salmon Pink
      },
      {
        id: 3,
        organization: "Kappa Alpha Psi",
        miniLogo: "/img/onboading/organaization-03.png",
        color: "DC143C", // Crimson
      },
      {
        id: 4,
        organization: "Omega Psi Phi",
        miniLogo: "/img/onboading/organaization-04.png",
        color: "800080", // Purple
      },
      {
        id: 5,
        organization: "Delta Sigma Theta",
        miniLogo: "/img/onboading/organaization-05.png",
        color: "DC143C", // Crimson
      },
      {
        id: 6,
        organization: "Phi Beta Sigma",
        miniLogo: "/img/onboading/organaization-06.png",
        color: "0000FF", // Royal Blue
      },
      {
        id: 7,
        organization: "Zeta Phi Beta",
        miniLogo: "/img/onboading/organaization-07.png",
        color: "0000FF", // Royal Blue
      },
      {
        id: 8,
        organization: "Sigma Gamma Rho",
        miniLogo: "/img/onboading/organaization-08.png",
        color: "0000FF", // Royal Blue
      },
      {
        id: 9,
        organization: "Iota Phi Theta",
        miniLogo: "/img/onboading/organaization-09.png",
        color: "A52A2A", // Brown
      },
    ],
  };
}
