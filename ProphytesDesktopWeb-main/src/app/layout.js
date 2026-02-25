import ScrollToTopButton from "@/components/ui/ScrollBottomToTop";
import { Comfortaa, Inter, Montserrat } from "next/font/google";
import localFont from "next/font/local";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import StoreProvider from "./storeProvider";
import RouteChangeModal from "@/components/ui/RouteChangeModal";
import ClarityProvider from "./ClarityProvider";
import GoogleAnalytics from "./GoogleAnalytics";
import { headers } from "next/headers";

export const montserrat = Montserrat({
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
});
export const inter = Inter({
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});
export const comforta = Comfortaa({
  weight: ["400", "500", "600", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-comforta",
});

export const gothic = localFont({
  src: "../fonts/MyFont/centurygothic.ttf",
  display: "swap",
  variable: "--font-gothic",
});

export const metadata = {
  title: {
    template: `%s - Verified Network for Divine Nine Members`,
    default: `Prophytes : Verified Network for Divine Nine Members`,
  },
  description:
    "Get verified, join the network, and connect with Divine Nine members across generations. Your Prophytes Number unlocks exclusive access and legacy.",

  openGraph: {
    title: "Prophytes : Verified Network for Divine Nine Members",
    description:
      "Get verified, join the network, and connect with Divine Nine members across generations. Your Prophytes Number unlocks exclusive access and legacy.",
    url: "https://prophytes.com/",
    type: "website",
    images: [
      {
        url: "",
        alt: "Prophytes OG Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prophytes : Verified Network for Divine Nine Members",
    description:
      "Get verified, join the network, and connect with Divine Nine members across generations. Your Prophytes Number unlocks exclusive access and legacy.",
    images: [],
  },
};

export default async function RootLayout({ children }) {
  const headersList = await headers();
  const host = headersList.get("host");
  const proto = headersList.get("x-forwarded-proto") || "http";
  const baseUrl = `${proto}://${host}`;
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${inter.variable} font-inter`} suppressHydrationWarning={true}>
        <StoreProvider>
          <Toaster />
          <ClarityProvider baseUrl={baseUrl} />
          {children}
          <ScrollToTopButton />
          <RouteChangeModal />
        </StoreProvider>
        <GoogleAnalytics baseUrl={baseUrl} />
      </body>
    </html>
  );
}
