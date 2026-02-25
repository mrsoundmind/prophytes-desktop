"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "react-responsive";

const OTPInput = ({ length = 6, onChangeOTP, initialOtp }) => {
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 768px)" });

  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputsRef = useRef([]);
  const router = useRouter();

  // Focus only on mount
  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  // Sync state when initialOtp changes
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
    let value = e.target.value.replace(/\D/g, ""); // allow only digits

    if (!value) return;

    const digit = value[value.length - 1]; // always take last typed digit

    const newOtp = [...otp];
    newOtp[index] = digit; // overwrite existing
    setOtp(newOtp);
    onChangeOTP && onChangeOTP(newOtp.join(""));

    if (index < length - 1) {
      setTimeout(() => {
        focusInput(index + 1);
      }, 50);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      e.preventDefault(); // prevent default browser behavior
      const newOtp = [...otp];
      newOtp[index] = ""; // clear current input
      setOtp(newOtp);
      onChangeOTP && onChangeOTP(newOtp.join(""));

      // Move focus to previous input if index > 0
      if (index > 0) {
        focusInput(index - 1);
      }
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
    // Check if WebOTP is supported and we're on mobile
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

      return () => {
        abortController.abort();
      };
    }
  }, [length, onChangeOTP, isTabletOrMobile, initialOtp]);

  useEffect(() => {
    setTimeout(() => inputsRef.current[0]?.focus(), 1000);
  }, [router]);

  return (
    <div
      className="flex flex-wrap gap-2 mb-6 sm:gap-4 text-[36px]"
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
          className="text-center text-white transition bg-transparent border rounded-lg
             2xl:size-[108px] xl:size-[90px] lg:size-10 md:size-8 size-[43px]
             border-white/50 focus:outline-none focus:border-white"
        />
      ))}
    </div>
  );
};

export default OTPInput;
