"use client";

import { usePathname } from "next/navigation";
import React from "react";

const PaymentStepper = () => {
  const pathname = usePathname();
  const steps = ["Order", "Payment Details", "Checkout"];

  const stepMap = {
    "/choose-plan": 0,
    "/choose-plan/payment": 1,
    "/choose-plan/checkout": 2,
  };

  const currentStep = stepMap[pathname] ?? 0;

  return (
    <div className="mx-5 overflow-hidden">
      <div className="relative w-full max-w-2xl py-5 mx-auto overflow-hidden sm:py-6">
        {/* Horizontal line */}
        <div className="absolute md:pl-96 pl-[200px] xss:pl-[295px] xxs:pl-[250px] top-[40px] transform -translate-y-1/2 left-0 w-[40%] xs:w-[95%]  h-1 bg-gray-600 z-0" />

        {/* Progress line */}
        <div
          className="absolute  top-[40px] ml-1 transform -translate-y-1/2 left-0 h-1  bg-white z-10 transition-all duration-300"
          style={{ width: `${(currentStep / (steps.length - 1)) * 94}%` }}
        />

        {/* Step circles */}
        <div className="relative z-20 flex items-center justify-between">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold z-20
                ${
                  index <= currentStep
                    ? "bg-white text-black"
                    : "bg-gray-600 text-white"
                }`}
              >
                {index + 1}
              </div>
              <span className="mt-2 text-sm text-center text-white">
                {step}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaymentStepper;
