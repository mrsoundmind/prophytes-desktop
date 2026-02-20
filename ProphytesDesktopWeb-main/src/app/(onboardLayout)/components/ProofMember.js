/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useState } from "react";
import { organizations } from "@/src/configs/constants";
import { useDispatch } from "react-redux";
// import { setOnboardPage } from "@/src/redux/slices/onboardingSlice"; // Unused if removing backnav
import Staricon from "@/public/img/icon/Staricon";
import CorrectSvg from "@/public/img/icon/CorrectSvg";
import { useRouter } from "next/navigation";
import MobileStapper from "./MobileStapper";
import secret from "@/config";

const ProofMember = () => {
  const [items, setItems] = useState({});
  const [haveValue] = useState(true);
  const [conversations, setConversations] = useState(null);

  // const dispatch = useDispatch(); // Unused
  const router = useRouter();

  useEffect(() => {
    const storedData = localStorage.getItem("onboading");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const org = parsedData.find((item) => item.organization)?.organization;
      const matched = organizations.find((item) => item.organization === org);
      if (matched) setItems(matched);
    }
  }, []);

  const handleNext = () => {
    // If conversation ID exists, go there. Else fallback to /chat or /profile
    const targetPath = conversations?.conversations?.[0]?.id
      ? `/chat/${conversations.conversations[0].id}?type=CHAPTER`
      : "/profile"; // Fallback to profile if chat isn't ready

    router.push(targetPath);

    // Cleanup onboarding data
    localStorage.removeItem("onboading");
    // Do NOT remove token/email as user is logged in
    // localStorage.removeItem("email"); 
    // localStorage.removeItem("token");
  };

  const handleDashboard = () => {
    router.push("/profile");
    // Cleanup onboarding data as we are leaving the flow
    localStorage.removeItem("onboading");
  };

  useEffect(() => {
    const fetchResponse = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch(
          `${secret.apiBaseUrl}/desktop/chat/conversations`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        setConversations(data);
      } catch (error) {
        console.warn("⚠️ [ProofMember] Error fetching data (expected if backend offline):", error);
      }
    };

    fetchResponse();
  }, []);

  // Removed Auto-Redirect useEffect entirely

  return (
    <div className="2xl:p-12 sm:p-6 p-0 bg-black rounded-[8px]">
      <MobileStapper disabled={false} haveValue={haveValue} />

      {/* Removed Progress Bar */}

      <h3 className="mb-1 sm:mb-3 font-montserrat">Unlock Chapter Access</h3>

      <p className="text-base text-white/70 leading-[26px] mb-4">
        These organizations were established to provide a supportive network for
        African American students during times when they faced exclusion from
        other collegiate societies.
      </p>

      <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
        {[
          "Chapter-Verified",
          "Unlock Chapter Access",
          "Protect the Legacy",
        ].map((title, index) => (
          <div key={index} className="bg-[#333333] rounded-[24px] px-6 py-4">
            <div
              className="grid mb-2 rounded-full size-10 place-content-center"
              style={{ backgroundColor: `#${items.color}` }}
            >
              <CorrectSvg />
            </div>
            <h4 className="text-xl font-semibold text-white">{title}</h4>
            <p className="mt-2 text-sm text-white/80">
              Verified chapter members gain secure access and identity
              protection.
            </p>
          </div>
        ))}
      </div>

      {/* Removed "Redirecting you..." text */}

      <div className="flex flex-col-reverse sm:flex-row items-center justify-between mt-10 gap-4">
        {/* Secondary: Return to Dashboard */}
        <button
          onClick={handleDashboard}
          className="text-white/60 hover:text-white font-medium text-sm underline-offset-4 hover:underline transition-colors"
        >
          Return to Dashboard
        </button>

        {/* Primary: Enter Chapter Chat */}
        <button
          onClick={handleNext}
          className="inline-flex gap-2 items-center h-[60px] bg-primary rounded-[99px] group"
        >
          <span
            className={`font-inter ml-1 py-[15px] sm:text-[16px] text-[15px] font-bold leading-5 text-white px-[14px] bg-black rounded-[99px] capitalize group-hover:bg-[#1a1a1a] transition-colors`}
          >
            Enter Chapter Chat
          </span>
          <span className="mr-2">
            <Staricon />
          </span>
        </button>
      </div>
    </div>
  );
};

export default ProofMember;
