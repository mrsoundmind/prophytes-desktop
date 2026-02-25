"use client";

import ProfileOtpInpt from "@/src/app/(dashboardLayout)/components/ProfileOtpInpt";
import countries from "@/src/data/countries";
import {
  useProfileOtpVerifyMutation,
  useSendOtpPhoneMutation,
  useVerifyOtpLoginMutation,
} from "@/src/redux/services/userApi";
import { ErrorAlert } from "@/src/utils/ErrorAlert";
import { SuccessAlert } from "@/src/utils/SuccessAlert";
import React, { useState, useEffect, useRef } from "react";

const getFlagUrl = (iso2) => `https://flagcdn.com/w40/${iso2}.png`;

export default function PhoneNumberSelector({
  label,
  phoneNumber,
  setPhoneNumber,
  isoptVerified,
  setIsotpVerified,
  setTempNum,
  tempNum,
}) {
  const [selectedCountry, setSelectedCountry] = useState(
    countries.find((c) => c.iso2 === "us") || countries[0]
  );
  const [nationalNumber, setNationalNumber] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [isUserTyping, setIsUserTyping] = useState(false);
  const [sendOtp, setSendOtp] = useState(false);
  const [otpValue, setOtpValue] = useState("");
  const wrapperRef = useRef(null);

  const [
    phoneDatafetch,
    { isLoading: phone_loading, isSuccess: success, isError, error: otpError },
  ] = useSendOtpPhoneMutation();
  // const [fetchData, { isLoading: loading, data, isSuccess, isError: error }] =
  //   useVerifyOtpLoginMutation();
  const [
    otpVerify,
    { data, isLoading: opt_loading, isSuccess, isError: error },
  ] = useProfileOtpVerifyMutation();

  // Extract national number and country when phoneNumber changes
  useEffect(() => {
    if (!isUserTyping && phoneNumber?.startsWith("+")) {
      const match = countries.find((c) =>
        phoneNumber.startsWith("+" + c.dialCode)
      );
      if (match) {
        setSelectedCountry(match);
        const numberWithoutDialCode = phoneNumber.replace(
          "+" + match.dialCode,
          ""
        );
        setNationalNumber(numberWithoutDialCode);
      }
    }
  }, [phoneNumber]);

  useEffect(() => {
    setIsotpVerified(false);
  }, [isUserTyping]);

  const getFullNumber = () => {
    return nationalNumber
      ? `+${selectedCountry.dialCode}${nationalNumber}`
      : "";
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update parent with full number when input or country changes
  useEffect(() => {
    setPhoneNumber(getFullNumber());
  }, [nationalNumber, selectedCountry]);

  const handleChange = (e) => {
    setIsUserTyping(true);
    const onlyNums = e.target.value.replace(/\D/g, "");
    setNationalNumber(onlyNums);
    setTempNum(onlyNums);
  };

  const handlePaste = (e) => {
    e.preventDefault();
    setIsUserTyping(false); // allow auto-detection on paste
    const pastedText = e.clipboardData.getData("Text");
    const onlyNums = pastedText.replace(/\D/g, "");
    setNationalNumber(onlyNums);
    setPhoneNumber("+" + selectedCountry.dialCode + onlyNums);
  };
  const handleSendCode = async () => {
    const UserPhone = phoneNumber;
    await phoneDatafetch({ phoneNumber: UserPhone });
  };

  const handleOTPChange = (otp) => {
    setOtpValue(otp);
  };

  useEffect(() => {
    if (isError || otpError) {
      ErrorAlert(
        otpError?.data?.data?.issue?.message ||
          "Phone number verification failed"
      );
    }
  }, [isError]);

  const handleVerify = async () => {
    if (!otpValue || otpValue.length !== 6) {
      ErrorAlert("Please enter 6-digit OTP");
      return;
    }

    // Construct payload with data object as per backend structure
    const finalPayload = {
      phoneNumber,
      otpCode: otpValue,
    };
    const res = await otpVerify(finalPayload);
  };
  useEffect(() => {
    if (success) {
      setSendOtp(true);
    }
  }, [success]);
  useEffect(() => {
    if (isSuccess) {
      setSendOtp(false);
      SuccessAlert("OTP verify successfully");
      setIsotpVerified(true);
    } else if (error) {
      ErrorAlert(isError?.data?.issue?.message || "Faild to verification ");
    }
  }, [isSuccess, error]);

  const isDisabled = phone_loading || !tempNum || isoptVerified;

  return (
    <div className="relative w-full" ref={wrapperRef}>
      {label && (
        <label className="block md:mb-[9px] mb-1 text-base font-normal leading-6 text-black">
          {label}
        </label>
      )}

      <div
        className={`flex w-full overflow-hidden border rounded-md ${
          label ? "border-black/70" : "border border-white"
        }`}
      >
        {/* Country selector */}
        <button
          type="button"
          className={`flex items-center sm:pl-3 pl-2   cursor-pointer select-none ${
            label ? "bg-transparent text-black/70" : "bg-black text-white"
          }`}
          onClick={() => setDropdownOpen((open) => !open)}
          aria-haspopup="listbox"
          aria-expanded={dropdownOpen}
        >
          <img
            src={getFlagUrl(selectedCountry.iso2)}
            alt={selectedCountry.iso2}
            className="object-cover w-6 h-4 mr-2 rounded-sm"
            draggable={false}
          />
          <span
            className={`mr-2 font-medium sm:text-base text-sm ${
              label ? "text-black/70" : "text-white"
            }`}
          >
            +{selectedCountry.dialCode}
          </span>
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${
              dropdownOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {/* Input field (flex-1 makes it fill remaining space) */}
        <div className="relative flex-1">
          <input
            type="tel"
            className={`flex-grow w-full text-base  sm:px-3 xs:px-1 px-0 md:py-[14px] py-[10px] placeholder:text-base focus:outline-none placeholder:text-white ${
              label ? "bg-transparent text-black/70" : "bg-black text-white"
            }`}
            placeholder="Phone number"
            value={nationalNumber}
            onChange={handleChange}
            onPaste={handlePaste}
            onBlur={() => setIsUserTyping(false)}
          />
          {label &&
            (sendOtp ? (
              <div className="absolute top-[6px] right-2">
                <div className="flex">
                  <ProfileOtpInpt length={6} onChangeOTP={handleOTPChange} />
                  <div className="w-[60px] flex items-center justify-center h-10 bg-black">
                    <div
                      onClick={handleVerify}
                      className="flex items-center justify-center w-[55px] py-1 text-xs font-medium text-black bg-white rounded-md cursor-pointer 2xl:px-2 2xl:text-sm hover:bg-gray-100"
                    >
                      {opt_loading ? "Verify..." : "Verify"}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div
                onClick={() => {
                  if (isDisabled) return;
                  handleSendCode();
                }}
                className={`absolute flex items-center justify-center sm:top-2 top-1 sm:right-2 right-1 
      sm:w-[120px] w-20 sm:h-[38px] h-8 rounded-[12px] sm:text-sm xs:text-xs text-[11px] 
      sm:leading-[22px] leading-5 font-medium text-white transition-colors
      ${
        isDisabled
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-black cursor-pointer hover:bg-gray-900"
      }`}
              >
                {phone_loading
                  ? "Sending..."
                  : isDisabled
                  ? "Verified"
                  : "SEND CODE"}
              </div>
            ))}
        </div>
      </div>

      {/* Country dropdown */}
      {dropdownOpen && (
        <div
          className="absolute z-50 w-full mt-1 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg max-h-60"
          role="listbox"
          tabIndex={-1}
        >
          <input
            type="search"
            className="w-full px-3 py-2 text-base text-black focus:outline-none placeholder:text-base"
            placeholder="Search country"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
          />

          {countries
            .filter(
              (c) =>
                c.name.toLowerCase().includes(search.toLowerCase()) ||
                c.dialCode.includes(search)
            )
            .map((c) => (
              <button
                key={c.iso2}
                type="button"
                role="option"
                aria-selected={c.iso2 === selectedCountry.iso2}
                className={`flex items-center w-full px-3 py-2 hover:bg-gray-100 ${
                  c.iso2 === selectedCountry.iso2 ? "bg-gray-200" : ""
                }`}
                onClick={() => {
                  setSelectedCountry(c);
                  setDropdownOpen(false);
                  setSearch("");
                  setNationalNumber("");
                }}
              >
                <img
                  src={getFlagUrl(c.iso2)}
                  alt={c.iso2}
                  className="object-cover w-6 h-4 mr-2 rounded-sm"
                  draggable={false}
                />
                <span className="flex-grow text-left text-black">{c.name}</span>
                <span className="ml-2 text-black">+{c.dialCode}</span>
              </button>
            ))}
        </div>
      )}
    </div>
  );
}
