// config.js
const config = {
  // App-level configurations
  appName: "My Next.js App",
  version: "1.0.0",

  // API configurations
  apiBaseUrl:
    typeof window === "undefined"
      ? process.env.API_BASE_URL
      : process.env.NEXT_PUBLIC_API_BASE_URL ||
        "https://lovely-healthy-pangolin.ngrok-free.app/api-docs/",

  // Environment specific variables
  isProduction: process.env.NODE_ENV === "production",
  isDevelopment: process.env.NODE_ENV === "development",
  isTest: process.env.NODE_ENV === "test",

  // Auth-related configurations (example)
  auth: {
    jwtSecret: process.env.JWT_SECRET || "default-jwt-secret",
    auth0ClientId: process.env.AUTH0_CLIENT_ID || "",
    auth0Domain: process.env.AUTH0_DOMAIN || "",
  },

  // Public variables (accessible in the client-side code)
  publicConfig: {
    siteTitle:
      process.env.NEXT_PUBLIC_SITE_TITLE || "Divine Nine Membership Directory",
    siteDescription:
      process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
      "We Built the Directory Our Founders Deserved (Members, Chapters & Businesses. All in One Place)",
  },

  // Other app-related configurations
  appConfig: {
    paginationLimit: 20,
    defaultLanguage: "en",
    appBaseUrl: process.env.NEXT_PUBLIC_APP_BASE_URL,
  },
  stripe: {
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "",
  },
};

export default config;
