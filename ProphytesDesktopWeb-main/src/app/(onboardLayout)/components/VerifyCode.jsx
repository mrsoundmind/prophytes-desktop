import React from "react";
import Stepper from "./Stapper";
import VerifyOTP from "./VerifyOTP";

export default function VerifyCode() {
  return (
    <div className="2xl:p-12 sm:p-6 p-0 bg-black rounded-[8px]">
      <VerifyOTP />
    </div>
  );
}
