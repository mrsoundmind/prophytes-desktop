"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Aluminai from "../components/Aluminai";
import EmailVefiry from "../components/EmailVefiry";
import InitiatedChapter from "../components/InitiatedChapter";
import Organization from "../components/Organization";
import PendingVerification from "../components/PendingVerification";
import Undergrade from "../components/Undergrade";
import ProofMember from "../components/ProofMember";
import VerifyCode from "../components/VerifyCode";
import Welcome from "../components/Welcome";
import { setOnboardPage } from "@/src/redux/slices/onboardingSlice";

export default function Onboard() {
  const currentPage = useSelector((state) => state?.onboardPage?.currentPage);
  const dispatch = useDispatch();
  const router = useRouter();

  // FOUC PREVENTION: Start with a checking state to prevent flushing incorrect UI
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const checkUserStatus = () => {
      const verificationStatus = localStorage.getItem("verificationStatus");
      const onboardData = localStorage.getItem("onboading");
      const onboading = onboardData ? JSON.parse(onboardData) : null;
      const isEmptyOnboarding = !onboading || Object.keys(onboading).length === 0;

      // NEW USER CHECK:
      // Only redirect to Welcome if:
      // 1. No onboarding data exists (new user)
      // 2. User has NOT manually started onboarding (onboardingStarted flag)
      // 3. User is NOT already verified/signed up (verificationStatus)
      // 4. User is at the root /onboard path (not deep linking)
      const hasStarted = localStorage.getItem("onboardingStarted") === "true";
      const isSignedUp = !!verificationStatus;

      console.log("🔍 WELCOME DEBUG:", {
        isEmptyOnboarding,
        currentPage,
        hasStarted,
        isSignedUp,
        TRIGGER: (isEmptyOnboarding && !currentPage && !hasStarted && !isSignedUp)
      });

      if (isEmptyOnboarding && !currentPage && !hasStarted && !isSignedUp) {
        console.log("✅ Dispatching WELCOME");
        dispatch(setOnboardPage("welcome"));
        // DO NOT turn off checking here. Wait for the state to update to "welcome".
        // This keeps the screen black until the Welcome component is ready to render.
        return;
      }

      if (
        currentPage !== "verify-email" &&
        currentPage !== "verify-code" &&
        currentPage !== "pending-verification" &&
        currentPage !== "unlock chapter" &&
        currentPage !== "proof-membership" &&
        currentPage !== "initiated-chapter" &&
        currentPage !== "welcome" // Whitelisted
      ) {
        if (verificationStatus === "approved") {
          dispatch(setOnboardPage("unlock chapter"));
          return;
        }
      }

      // If no redirect happened, we can stop checking
      setIsChecking(false);
    };

    checkUserStatus();

  }, [currentPage, dispatch]);

  // Secondary Effect: Stop checking once we successfully navigated to Welcome
  useEffect(() => {
    if (currentPage === "welcome") {
      setIsChecking(false);
    }
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case "welcome":
        return <Welcome />;
      case "initiated-chapter":
        return <InitiatedChapter />;
      case "verify-email":
        return <EmailVefiry />;
      case "verify-code":
        return <VerifyCode />;
      case "pending-verification":
      case "unlock chapter":
      case "proof-membership":
        const status = localStorage.getItem("verificationStatus");
        return status === "approved" ? <ProofMember /> : <PendingVerification />;

      default:
        // FALLBACK LOGIC: If Redux is blank but conditions met, render Welcome directly
        // This handles cases where Redux is lagging or stale.
        if (typeof window !== 'undefined') {
          const verificationStatus = localStorage.getItem("verificationStatus");
          const onboardData = localStorage.getItem("onboading");
          const hasStarted = localStorage.getItem("onboardingStarted") === "true";

          const onboading = onboardData ? JSON.parse(onboardData) : null;
          const isEmptyOnboarding = !onboading || Object.keys(onboading).length === 0;

          if (isEmptyOnboarding && !hasStarted && !verificationStatus) {
            return <Welcome />;
          }
        }

        // If currentPage is explicitly empty string, it shows Organization
        return <Organization />;
    }
  };

  // Show nothing (or black screen) while checking to prevent flash of content
  if (isChecking && currentPage === "") {
    return <div className="h-screen w-full bg-black" />;
  }

  return (
    <div className="flex flex-col h-full">
      {renderPage()}
    </div>
  );
}
