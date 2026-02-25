"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

import PhonNumberSelector from "@/components/ui/PhoneNumberSelector";
import icon from "@/public/img/icon/submit.svg";
import {
  useSendCodeEmailMutation,
  useSendOtpPhoneMutation,
} from "@/src/redux/services/userApi";
import { ErrorAlert } from "@/src/utils/ErrorAlert";
import { SuccessAlert } from "@/src/utils/SuccessAlert";

const LoginForm = () => {
  const [active, setActive] = useState("phone");
  const [showMessage, setShowMessage] = useState(false);
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isoptVerified, setIsotpVerified] = useState();
  const router = useRouter();

  const [fetchData, { isLoading: loading, data, error }] =
    useSendCodeEmailMutation();

  const [
    phoneDatafetch,
    { isLoading: phone_loading, data: result, error: phone_error },
  ] = useSendOtpPhoneMutation({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const UserPhone = phoneNumber;
    await phoneDatafetch({ phoneNumber: UserPhone, type: "login" });
    localStorage.setItem("phone", phoneNumber);
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    const UserEmail = email;
    localStorage.setItem("email", email);

    await fetchData({ email: UserEmail });
    // setShowMessage(true);
    // setTimeout(() => setShowMessage(false), 3000);
  };

  // if (result?.success) {
  //   router.push("/signin/phone-verify");
  // }

  useEffect(() => {
    if (result) {
      SuccessAlert("OTP sent successfully");
      router.push("/signin/phone-verify");
    }
    if (phone_error) {
      ErrorAlert(
        phone_error?.data?.data?.issue?.message || "Failed to send OTP"
      );
    }
  }, [result, router, phone_error]);

  useEffect(() => {
    if (data) {
      SuccessAlert("OTP sent successfully");
      router.push("/signin/email-verify");
    }
    if (error) {
      ErrorAlert(error?.data?.data?.data?.message || "Failed to send OTP");
    }
  }, [data, error, router]);

  return (
    <div className="relative w-full h-screen bg-black">
      <div className="container">
        <div className="inset-0 absolute top-0  bg-[#0D0D0D]/60"></div>

        <div className="py-12 sm:py-20">
          <h2 className="text-center text-white relative z-[9] sm:mb-10 mb-8 font-montserrat">
            Sign In To Your Account
          </h2>

          <div className="block m-auto max-w-[561px] relative z-[9]">
            <div className="flex flex-wrap gap-8 sm:gap-10 ">
              <button
                onClick={() => setActive("phone")}
                className={`font-inter flex  items-center justify-center gap-[10px] sm:py-5 py-[14px] sm:w-[260px] w-full  sm:text-[16px] text-[15px] font-bold leading-5 rounded-[20px] ${
                  active == "phone"
                    ? "bg-[#E6E6E6] text-black"
                    : "border border-[#E6E6E6] text-white"
                } `}
              >
                <FontAwesomeIcon
                  className={` size-4 ${
                    active == "phone" ? "text-black" : " text-white"
                  }`}
                  icon={faPhone}
                />
                Phone
              </button>
              <button
                onClick={() => setActive("email")}
                className={`font-inter flex  items-center justify-center gap-[10px] sm:py-5 py-[14px] sm:w-[260px] w-full  sm:text-[16px] text-[15px] font-bold leading-5 rounded-[20px] ${
                  active == "email"
                    ? "bg-[#E6E6E6] text-black"
                    : "border border-[#E6E6E6] text-white"
                } `}
              >
                <FontAwesomeIcon
                  className={` size-4 ${
                    active == "email" ? "text-black" : " text-white"
                  }`}
                  icon={faEnvelope}
                />
                Email
              </button>
            </div>
            {active == "phone" ? (
              <form onSubmit={handleSubmit} className="mt-8 sm:mt-11">
                <PhonNumberSelector
                  className="text-white border border-white"
                  label=""
                  phoneNumber={phoneNumber}
                  setPhoneNumber={setPhoneNumber}
                  setIsotpVerified={setIsotpVerified}
                  isoptVerified={isoptVerified}
                />

                <p className={` font-inter text-white mt-4`}>
                  Please Input Your Phone Number
                </p>
                <button
                  type="submit"
                  className={`flex justify-between items-center px-[30px] text-[16px] font-bold  leading-5 my-[30px] sm:h-[60px] h-[52px] font-montserrat  w-full rounded-[10px] ${
                    phone_loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-secondary"
                  }`}
                >
                  {phone_loading ? "loading..." : "Send Code"}
                  <Image src={icon} alt="icon" />
                </button>
                <div className="flex items-center justify-between w-full text-sm text-white">
                  <label className="inline-flex items-center space-x-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 accent-white" />
                    <span
                      className={`font-inter text-[16px] font-normal leading-5`}
                    >
                      Remember Me
                    </span>
                  </label>
                </div>
              </form>
            ) : (
              <form onSubmit={handleEmailSubmit}>
                <input
                  type="email"
                  value={email}
                  required
                  onChange={({ target }) => setEmail(target.value)}
                  className="mt-5 mb-[11px] w-full h-[60px] text-white pl-5  bg-black border border-[#E7E7EB] focus:outline-none rounded-[10px]"
                />
                <p className={` font-inter text-white`}>
                  Your One time password Send this email
                </p>
                {showMessage && (
                  <p className="mt-6 text-center text-green-400">
                    OTP has been sent to your email.
                  </p>
                )}

                <button
                  type="submit"
                  className={`flex justify-between items-center px-[30px] text-[16px] font-bold  leading-5 my-[30px] h-[60px]  w-full rounded-[10px] font-montserrat ${
                    loading ? "bg-gray-400 cursor-not-allowed" : "bg-secondary"
                  }`}
                >
                  {loading ? "loading..." : "Send Code"}
                  <Image src={icon} alt="icon" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
