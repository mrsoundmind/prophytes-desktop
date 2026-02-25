"use client";
import React, { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";

const ProfileOtpInpt = ({ length = 6, onChangeOTP, initialOtp }) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputsRef = useRef([]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (initialOtp && initialOtp.length === length) {
      const newOtp = initialOtp.split("");
      setOtp(newOtp);
      onChangeOTP && onChangeOTP(initialOtp);
    }
  }, [initialOtp, length, onChangeOTP]);

  const focusInput = (index) => {
    inputsRef.current[index]?.focus();
  };

  const handleChange = (e, index) => {
    let value = e.target.value.replace(/\D/g, "");
    if (!value) return;
    const digit = value[value.length - 1];
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);
    onChangeOTP && onChangeOTP(newOtp.join(""));
    if (index < length - 1) {
      setTimeout(() => focusInput(index + 1), 50);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      onChangeOTP && onChangeOTP(newOtp.join(""));
      if (index > 0) focusInput(index - 1);
    } else if (e.key === "ArrowLeft" && index > 0) {
      focusInput(index - 1);
    } else if (e.key === "ArrowRight" && index < length - 1) {
      focusInput(index + 1);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, length);

    const newOtp = [...otp];
    pastedData.split("").forEach((char, i) => {
      newOtp[i] = char;
    });
    setOtp(newOtp);
    onChangeOTP && onChangeOTP(newOtp.join(""));
    const nextIndex =
      pastedData.length < length ? pastedData.length : length - 1;
    focusInput(nextIndex);
  };

  useEffect(() => {
    if ("OTPCredential" in window && isTabletOrMobile && !initialOtp) {
      const abortController = new AbortController();
      const getOTP = async () => {
        try {
          const credential = await navigator.credentials.get({
            otp: { transport: ["sms"] },
            signal: abortController.signal,
          });
          if (credential && credential.code) {
            const otpCode = credential.code.replace(/\D/g, "").slice(0, length);
            if (otpCode.length > 0) {
              const newOtp = new Array(length).fill("");
              otpCode.split("").forEach((char, i) => {
                if (i < length) newOtp[i] = char;
              });
              setOtp(newOtp);
              onChangeOTP && onChangeOTP(newOtp.join(""));
              const focusIndex = Math.min(otpCode.length - 1, length - 1);
              focusInput(focusIndex);
            }
          }
        } catch (err) {
          if (err.name !== "AbortError") {
            console.error("WebOTP Error:", err.name, err.message);
          }
        }
      };
      getOTP();
      return () => abortController.abort();
    }
  }, [length, onChangeOTP, isTabletOrMobile, initialOtp]);

  return (
    <div className="flex gap-[10px] items-center justify-between  2xl:w-[200px] w-[140px]  px-2 h-10  bg-black ">
      <div
        className="flex justify-center flex-1 gap-[6px] "
        onPaste={handlePaste}
      >
        {otp.map((data, index) => (
          <input
            key={index}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            autoComplete="one-time-code"
            value={data}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            ref={(el) => (inputsRef.current[index] = el)}
            className="w-3 h-3 text-center text-white bg-transparent border-b-2 border-white sm:w-6 sm:h-6 focus:outline-none focus:border-white "
          />
        ))}
      </div>
    </div>
  );
};

export default ProfileOtpInpt;
