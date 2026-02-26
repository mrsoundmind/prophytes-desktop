"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import MobileStapper from "./MobileStapper";


const PendingVerification = () => {
    // Set verificationStatus to "pending" on entry if not yet set
    useEffect(() => {
        const currentStatus = localStorage.getItem("verificationStatus");
        if (!currentStatus || currentStatus === "null" || currentStatus === "undefined") {
            localStorage.setItem("verificationStatus", "pending");
        }
    }, []);



    return (
        <div className="2xl:p-12 sm:p-5 p-0 bg-black rounded-[8px]">
            {/* Reusing MobileStapper for consistency if needed, though step info might differ. 
          UploadSection passes {disabled={false} haveValue={true}}
          Here we are likely at the 'end' of the onboarding flow for now. 
      */}
            <MobileStapper disabled={false} haveValue={true} />

            <div className="flex flex-col items-center text-center mt-6 sm:mt-10">
                <h3
                    className="mb-3 2xl:mb-6 font-montserrat text-2xl font-bold text-white"
                >
                    Pending Verification
                </h3>

                <div className="max-w-lg mx-auto">
                    <p className="sm:text-base text-sm font-normal sm:leading-6 leading-[22px] text-[#A2A2A8] mb-6">
                        Your chapter leadership is currently reviewing your membership details.
                        To protect the authenticity and legacy of our organizations, every member
                        must be verified by their chapter.
                    </p>

                    <p className="sm:text-base text-sm font-normal sm:leading-6 leading-[22px] text-[#A2A2A8] mb-8">
                        You will be notified by email once your verification is complete.
                        Thank you for your patience as we ensure the integrity of our community.
                    </p>
                </div>

                <Link
                    href="/"
                    className="w-full sm:w-auto px-12 py-3 sm:text-lg text-base font-medium sm:leading-[26px] leading-6 text-black font-inter transition rounded-full bg-primary hover:bg-primary/80 mb-6 inline-block"
                >
                    Return to Dashboard
                </Link>

                <Link
                    href="mailto:support@prophytes.com?subject=Pending%20Verification%20Support"
                    className="text-[#A2A2A8] hover:text-white transition text-sm underline"
                >
                    Having trouble?
                </Link>
            </div>
        </div>
    );
};

export default PendingVerification;
