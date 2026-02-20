import config from "@/config";
import { CookieManager } from "@/src/utils/cookieManager";
import { NextResponse } from "next/server";

// GET request handler
export async function GET(request) {
  try {
    // Check if we should use mock data (explicit flag only)
    if (process.env.USE_MOCK_DATA === "true") {
      console.warn("⚠️ USING MOCK DATA FOR CHAPTERS");
      return NextResponse.json(getMockChapters(request));
    }

    // Extract query parameters from the incoming request

    const { searchParams } = new URL(request.url);

    const search = searchParams.get("search") || "";
    const university = searchParams.get("university") || "";
    const organization = searchParams.get("organization") || "";
    const location = searchParams.get("location") || "";
    const locationType = searchParams.get("locationType") || "";
    const skip = searchParams.get("skip") || 0;
    const limit = searchParams.get("limit") || 10;
    const initial = searchParams.get("initial") || "";

    // Construct the query string to pass to the backend
    const queryParams = new URLSearchParams({
      search,
      university,
      organization,
      location,
      locationType,
      skip,
      limit,
      initial,
      //   location,
    });

    const url = `${config.apiBaseUrl
      }/desktop/chapters?${queryParams.toString()}`;

    // Call the backend API with the query parameters
    const response = await fetch(`${url}`);

    // Check for errors in the response
    if (!response.ok) {
      // If backend fails and we are in dev mode, fallback to mock data
      if (process.env.USE_MOCK_DATA === "true") {
        console.warn("⚠️ BACKEND FAILED, FALLING BACK TO MOCK DATA (CHAPTERS)");
        return NextResponse.json(getMockChapters(request));
      }
      throw new Error("Failed to fetch members");
    }

    // Parse and return the response from the backend
    const members = await response.json();
    return CookieManager.createResponse(response, members);
  } catch (error) {
    if (process.env.USE_MOCK_DATA === "true") {
      console.warn("⚠️ NETWORK ERROR, FALLING BACK TO MOCK DATA (CHAPTERS)");
      return NextResponse.json(getMockChapters(request));
    }
    // Handle any errors
    return CookieManager.handleError(error);
  }
}

function getMockChapters(request) {
  const { searchParams } = new URL(request.url);
  const search = (searchParams.get("search") || "").toLowerCase();
  const university = searchParams.get("university") || "";
  const organization = searchParams.get("organization") || "";
  const locationType = searchParams.get("locationType") || "";

  // Debug Reality: Log incoming params
  console.log("🛠️ [Mock Chapters] Incoming Request:", {
    search,
    university,
    organization,
    locationType,
    url: request.url
  });

  // Base chapters list
  const allChapters = [
    { id: 1, chapter_name: "Alpha Chapter", organization: "Alpha Phi Alpha", university: "Howard University", locationType: "UNDERGRADUATE" },
    { id: 2, chapter_name: "Beta Chapter", organization: "Alpha Phi Alpha", university: "Virginia Union University", locationType: "UNDERGRADUATE" },
    // ... (rest of chapters)

    { id: 3, chapter_name: "Gamma Chapter", organization: "Alpha Phi Alpha", university: "Virginia Union University", locationType: "UNDERGRADUATE" },
    { id: 4, chapter_name: "Delta Lambda", organization: "Alpha Phi Alpha", university: "", locationType: "ALUMNI", city: "Baltimore" },
    { id: 5, chapter_name: "Alpha Omega", organization: "Alpha Kappa Alpha", university: "Howard University", locationType: "UNDERGRADUATE" },
    { id: 6, chapter_name: "Xi Omega", organization: "Alpha Kappa Alpha", university: "", locationType: "ALUMNI", city: "Washington" },
    { id: 7, chapter_name: "Alpha Chapter", organization: "Kappa Alpha Psi", university: "Indiana University", locationType: "UNDERGRADUATE" },
    { id: 8, chapter_name: "New York Alumni", organization: "Kappa Alpha Psi", university: "", locationType: "ALUMNI", city: "New York" },
    { id: 9, chapter_name: "Alpha Chapter", organization: "Omega Psi Phi", university: "Howard University", locationType: "UNDERGRADUATE" },
    { id: 10, chapter_name: "Alpha Omega", organization: "Omega Psi Phi", university: "", locationType: "ALUMNI", city: "Washington" },
    // Spelman College (AKA, Delta)
    { id: 11, chapter_name: "Mu Pi Chapter", organization: "Alpha Kappa Alpha", university: "Spelman College", locationType: "UNDERGRADUATE" },
    { id: 12, chapter_name: "Eta Kappa Chapter", organization: "Delta Sigma Theta", university: "Spelman College", locationType: "UNDERGRADUATE" },
    // Morehouse College (Alpha, Kappa, Omega)
    { id: 13, chapter_name: "Alpha Rho Chapter", organization: "Alpha Phi Alpha", university: "Morehouse College", locationType: "UNDERGRADUATE" },
    { id: 14, chapter_name: "Pi Chapter", organization: "Kappa Alpha Psi", university: "Morehouse College", locationType: "UNDERGRADUATE" },
    { id: 15, chapter_name: "Psi Chapter", organization: "Omega Psi Phi", university: "Morehouse College", locationType: "UNDERGRADUATE" },
    // Florida A&M (Alpha, AKA, Kappa, Omega, Delta)
    { id: 16, chapter_name: "Beta Nu Chapter", organization: "Alpha Phi Alpha", university: "Florida A&M University", locationType: "UNDERGRADUATE" },
    { id: 17, chapter_name: "Beta Alpha Chapter", organization: "Alpha Kappa Alpha", university: "Florida A&M University", locationType: "UNDERGRADUATE" },
    { id: 18, chapter_name: "Alpha Xi Chapter", organization: "Kappa Alpha Psi", university: "Florida A&M University", locationType: "UNDERGRADUATE" },
    { id: 19, chapter_name: "Upsilon Psi Chapter", organization: "Omega Psi Phi", university: "Florida A&M University", locationType: "UNDERGRADUATE" },
    { id: 20, chapter_name: "Beta Alpha Chapter", organization: "Delta Sigma Theta", university: "Florida A&M University", locationType: "UNDERGRADUATE" },
    // NC A&T
    { id: 21, chapter_name: "Beta Epsilon Chapter", organization: "Alpha Phi Alpha", university: "North Carolina A&T State University", locationType: "UNDERGRADUATE" },
    { id: 22, chapter_name: "Alpha Phi Chapter", organization: "Alpha Kappa Alpha", university: "North Carolina A&T State University", locationType: "UNDERGRADUATE" },
    // Hampton
    { id: 23, chapter_name: "Gamma Iota Chapter", organization: "Alpha Phi Alpha", university: "Hampton University", locationType: "UNDERGRADUATE" },
    { id: 24, chapter_name: "Gamma Theta Chapter", organization: "Alpha Kappa Alpha", university: "Hampton University", locationType: "UNDERGRADUATE" },
    // Generic Alumni Chapters for Testing
    { id: 25, chapter_name: "Chicago Alumni", organization: "Alpha Phi Alpha", university: "", locationType: "ALUMNI", city: "Chicago" },
    { id: 26, chapter_name: "Atlanta Alumni", organization: "Alpha Kappa Alpha", university: "", locationType: "ALUMNI", city: "Atlanta" },
    { id: 27, chapter_name: "Houston Alumni", organization: "Kappa Alpha Psi", university: "", locationType: "ALUMNI", city: "Houston" },
    { id: 28, chapter_name: "Los Angeles Alumni", organization: "Omega Psi Phi", university: "", locationType: "ALUMNI", city: "Los Angeles" },
    { id: 29, chapter_name: "Dallas Alumni", organization: "Delta Sigma Theta", university: "", locationType: "ALUMNI", city: "Dallas" },
  ];

  let filtered = allChapters;

  // Filter by organization if provided (approximate check)
  // Normalize Logic: Handle locationType param or alumni param
  const isAlumni = locationType === "ALUMNI" || searchParams.get("alumni") === "true";

  if (isAlumni) {
    filtered = filtered.filter(c => c.locationType === "ALUMNI");
  } else {
    // Default assume undergrad if not alumni specified or explicit undergrad
    // But ONLY if not effectively "all" (if needed). For now, strict separation.
    filtered = filtered.filter(c => c.locationType === "UNDERGRADUATE");
  }

  // Filter by organization if provided (approximate check)
  if (organization) {
    const orgTerm = organization.toLowerCase().trim();
    // Check name 
    filtered = filtered.filter(c => c.organization.toLowerCase().includes(orgTerm));
  }

  // Filter by university if provided
  if (university) {
    const uniTerm = university.toLowerCase().trim();
    filtered = filtered.filter(c => c.university.toLowerCase().includes(uniTerm));
  }

  // Filter by search term
  if (search) {
    const searchTerm = search.toLowerCase().trim();
    filtered = filtered.filter(c => c.chapter_name.toLowerCase().includes(searchTerm));
  }

  // Step 4: Fallback safety (only in mock mode)
  if (filtered.length === 0) {
    console.warn("⚠️ [Mock Chapters] No chapters found for query, returning fallback seed.");
    filtered = [
      { id: 991, chapter_name: "Mock Chapter Alpha", organization: organization || "Mock Org", university: university || "Mock Uni", locationType: isAlumni ? "ALUMNI" : "UNDERGRADUATE" },
      { id: 992, chapter_name: "Mock Chapter Beta", organization: organization || "Mock Org", university: university || "Mock Uni", locationType: isAlumni ? "ALUMNI" : "UNDERGRADUATE" },
    ];
  }

  console.log(`✅ [Mock Chapters] Returned ${filtered.length} results for query.`);

  return {
    chapters: filtered
  };
}
