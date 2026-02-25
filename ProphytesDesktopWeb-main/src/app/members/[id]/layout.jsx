import Footer from "@/components/footer/Footer";
import NavBar from "@/components/header/NavBar";
import config from "@/config";
import { headers } from "next/headers";
import React from "react";

export async function generateMetadata({ params }) {
  const { id } = await params;

  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto") || "http";
  const baseUrl = `${protocol}://${host}`;

  const res = await fetch(`${config.apiBaseUrl}/desktop/member/${id}`);
  const { data: memberData } = await res.json();

  return {
    title: `${memberData?.firstName} ${memberData?.lastName}`,
    description: `${memberData?.firstName} ${memberData?.lastName} is a ${
      memberData?.isVerified ? "verified" : ""
    } prophytes member from the ${
      memberData?.organization?.organization &&
      memberData?.organization?.organization + " chapter"
    }.
    Check out the profile, explore connections, and feel free to connect!.`,
    openGraph: {
      title: `${memberData?.firstName} ${memberData?.lastName} - Prophytes Member Details`,
      description: `${memberData?.firstName} ${memberData?.lastName} is a ${
        memberData?.isVerified ? "verified" : ""
      } prophytes member from the ${
        memberData?.organization?.organization &&
        memberData?.organization?.organization + " chapter"
      }.
    Check out the profile, explore connections, and feel free to connect!.`,
      url: `${baseUrl}/members/${id}`,
      images: [
        {
          url: memberData?.avatar,
          width: 800,
          height: 600,
          alt: `${memberData?.firstName} ${memberData?.lastName}'s Profile Picture`,
        },
      ],
    },
  };
}

export default async function MemberLayout({ children }) {
  return (
    <>
      <NavBar />
      {children}
      <Footer />
    </>
  );
}
