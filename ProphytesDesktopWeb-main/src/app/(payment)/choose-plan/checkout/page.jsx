"use client";

import PriceSkeleton from "@/src/app/(onboardLayout)/components/PriceSkeleton";
import { setOnboardPage } from "@/src/redux/slices/onboardingSlice";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const PaymentSuccess = () => {
  const router = useRouter();
  const [time, setTime] = useState(5);
  const dispatch = useDispatch();

  // Countdown effect
  useEffect(() => {
    if (time === 0) return;

    const timer = setTimeout(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [time]);

  // Redirect when countdown ends
  useEffect(() => {
    if (time === 0) {
      dispatch(setOnboardPage("unlock chapter"));
      router.push("/onboard");
    }
  }, [time, router]);

  return (
    <div className="col-span-12 mt-10 bg-black xl:col-span-7 sm:col-span-6 sm:mt-0">
      <div className="sm:h-full border border-primary rounded-tr-[10px] rounded-br-[10px]">
        <div className="w-full h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <div className="flex justify-center"></div>
            <h3 className="text-[20px] text-white font-bold leading-[48px] pt-[30px] pb-5">
              Thank you for your payment.
            </h3>
            <p className="max-w-[530px] text-[16px] text-white font-bold leading-7 sm:pb-0 pb-6">
              You will be redirected in {time}s
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
