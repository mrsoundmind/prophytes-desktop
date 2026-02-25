"use client";
import React, { useEffect, useState } from "react";

import OTPInput from "../../(onboardLayout)/components/OTPInput";
import NavBar from "@/components/header/NavBarFluid";
import Footer from "@/components/footer/Footer";
import NewsLetter from "@/components/ui/NewsLetter";
import { useRouter } from "next/navigation";
import { SuccessAlert } from "@/src/utils/SuccessAlert";
import { ErrorAlert } from "@/src/utils/ErrorAlert";
import { useVerifyOtpLoginMutation } from "@/src/redux/services/userApi";

const PhoneVerify = () => {
  const [otpValue, setOtpValue] = useState("");
  const router = useRouter();

  const handleOTPChange = (otp) => {
    setOtpValue(otp);
  };

  const [fetchData, { isLoading: loading, data, error }] =
    useVerifyOtpLoginMutation();

  const handleSubmit = async () => {
    const phoneNumber = localStorage.getItem("phone");
    if (!otpValue || otpValue.length !== 6) {
      ErrorAlert("Please enter 6-digit OTP");
      return;
    }

    // Construct payload with data object as per backend structure
    const finalPayload = {
      phoneNumber,
      otpCode: otpValue,
    };

    const res = await fetchData(finalPayload);
  };

  useEffect(() => {
    if (data) {
      SuccessAlert("Phone number verified successfully");
      window.location.href = "/profile";
    }
    if (error) {
      ErrorAlert(
        error?.data?.issue?.message || "Phone number verification failed"
      );
    }
  }, [data, router, error]);

  return (
    <div>
      <NavBar bgColor="bg-[#0D0D0D]" />
      <div className="py-20 bg-black">
        <div className="container">
          <h4 className="md:text-[28px] sm:text-[24px] text-[18px]   text-white text-center font-bold sm:leading-10 leading-7 mb-7">
            Phone Verify
          </h4>
          <div>
            <OTPInput length={6} onChangeOTP={handleOTPChange} />
            <p className="mt-4 text-sm text-center text-gray-400">
              We have sent a verification code to your phone.
            </p>
            <button
              className="block m-auto xs:w-[400px] w-[250px] px-6 py-3 mt-8 font-bold text-black transition bg-white rounded-full "
              onClick={handleSubmit}
            >
              {loading ? "Loading..." : "Verify Phone Number"}
            </button>
          </div>
        </div>
      </div>
      {/* <NewsLetter /> */}
      {/* <Footer /> */}
    </div>
  );
};

export default PhoneVerify;
