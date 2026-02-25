"use client";

import Script from "next/script";

export default function GoogleAnalytics({ baseUrl }) {
  const expectedBaseUrl = process.env.NEXT_PUBLIC_BASE_URL;

  if (baseUrl !== expectedBaseUrl) {
    console.warn("Analytics: baseUrl not matched or not provided");
    return null;
  }
  return (
    <>
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-BFQKX8YK01"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-BFQKX8YK01');
          `,
        }}
      />
    </>
  );
}
