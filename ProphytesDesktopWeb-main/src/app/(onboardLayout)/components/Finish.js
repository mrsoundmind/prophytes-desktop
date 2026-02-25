"use client";
import check from "@/public/img/icon/finish-check.svg";
import { setOnboardPage } from "@/src/redux/slices/onboardingSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const Finish = () => {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);
  const dispatch = useDispatch();

  return (
    <div className="sm:p-12 p-0 bg-black rounded-[8px]">
      <div className="w-full h-[80%] flex items-center justify-center">
        <div className="text-center">
          <div className="flex justify-center">
            <Image src={check} alt="check" />
          </div>
          <h3 className="sm:text-[36px] text-xl text-white font-bold sm:leading-[48px] leading-[30px] sm:pt-[30px] pt-5 sm:pb-5 pb-3 font-montserrat">
            Finish Verification
          </h3>
          <p className="max-w-[530px] text-xl text-white font-bold leading-7 sm:pb-0 pb-6">
            You will be redirected to your profile in {countdown}s
          </p>
        </div>
      </div>
    </div>
  );
};

export default Finish;
