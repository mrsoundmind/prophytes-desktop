// src/app/signin/email-verify/page.js
"use client";
import Footer from "@/components/footer/Footer";
import NavBar from "@/components/header/NavBarFluid";
import { useVerifyOtpLoginMutation } from "@/src/redux/services/userApi";
import { ErrorAlert } from "@/src/utils/ErrorAlert";
import { SuccessAlert } from "@/src/utils/SuccessAlert";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import OTPInput from "../../(onboardLayout)/components/OTPInput";

const EmailVerify = () => {
  const [otpValue, setOtpValue] = useState("");
  const router = useRouter();

  const [fetchData, { isLoading: loading, data, error }] =
    useVerifyOtpLoginMutation();
  const handleOTPChange = (otp) => {
    setOtpValue(otp);
  };

  const handleSubmit = async () => {
    const email = localStorage.getItem("email");

    if (!email || !otpValue || otpValue.length !== 6) {
      ErrorAlert("Please enter a valid email and 6-digit OTP");
      return;
    }
    const finalPayload = {
      email: email,
      otpCode: otpValue,
    };

    await fetchData(finalPayload);
  };

  useEffect(() => {
    if (data) {
      SuccessAlert("Email verified successfully");
      window.location.href = "/profile";
    }
    if (error) {
      ErrorAlert(error?.data?.issue?.message || "Failed to verify email");
    }
  }, [data, router, error]);

  return (
    <div className="">
      <NavBar bgColor="bg-[#0D0D0D]" />
      <div className="h-screen py-20 bg-black">
        <div className="container">
          <h4 className="md:text-[28px] sm:text-[24px] text-[18px] text-white text-center font-bold sm:leading-10 leading-7 mb-7">
            Email Verify
          </h4>
          <div className="">
            <div className="flex justify-center">
              <OTPInput length={6} onChangeOTP={handleOTPChange} />
            </div>{" "}
            <p className="mt-4 text-sm text-center text-gray-400">
              We have sent a code to your email.
            </p>
            <button
              className={`block m-auto xs:w-[350px] w-[250px] px-6 sm:py-4 py-3 mt-8 font-bold text-black transition rounded-full ${
                loading ? "bg-gray-400 cursor-not-allowed" : "bg-white"
              }`}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Loading..." : "Verify Email"}
            </button>
          </div>
        </div>
      </div>
      {/* <NewsLetter /> */}
      {/* <Footer /> */}
    </div>
  );
};

export default EmailVerify;
