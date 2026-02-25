"use client";
import { useEffect, useState } from "react";

import { usePricePlanQuery } from "@/src/redux/services/subscriptionApi";
import { setPricePlan } from "@/src/redux/slices/priceSlice";
import { ArrayToObject } from "@/src/utils/ArrayToObject";
import { ErrorAlert } from "@/src/utils/ErrorAlert";
import { SaveOnboadingData } from "@/src/utils/SaveOnboadingData";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import NextPreviousButton from "../../(onboardLayout)/components/NextPreviousButton";
import PriceSkeleton from "../../(onboardLayout)/components/PriceSkeleton";
import left from "@/public/img/home/bg-left.png";
import right from "@/public/img/home/bg-right.png";
import Image from "next/image";

import clock from "@/public/img/status/clock.png";
import clockShadow from "@/public/img/status/clock-shadow.png";
import Plan from "../components/Plan";

const PricePlan = () => {
  const router = useRouter();
  const [prices, setPrices] = useState();
  const [monthly, setMonthly] = useState({});
  const [yearly, setYearly] = useState({});
  const { data, isLoading: loading } = usePricePlanQuery();
  const [onboading, setOnboading] = useState({});
  const [price, setPrice] = useState("yearly");
  const [url, setUrl] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    if (prices) {
      const monthly = prices.find(
        (item) => item?.recurring?.interval === "month"
      );
      const yearly = prices.find(
        (item) => item?.recurring?.interval === "year"
      );
      setMonthly(monthly);
      setYearly(yearly);
    }
  }, [prices]);

  useEffect(() => {
    if (data?.status === 200 && !loading) {
      setPrices(data?.data?.prices);
    } else if (data) {
      ErrorAlert("Failed to get price plan");
    }
  }, [data]);

  useEffect(() => {
    const onboading = JSON.parse(localStorage.getItem("onboading"));
    if (onboading) {
      const obj = ArrayToObject(onboading);
      setOnboading(obj);
    }
  }, [setOnboading]);

  useEffect(() => {
    if (onboading?.pricePlan) {
      setPrice(onboading?.pricePlan);
    }
  }, [onboading]);

  useEffect(() => {
    if (price) {
      const params = price === "monthly" ? monthly?.id : yearly?.id;
      const prices =
        price === "monthly"
          ? monthly?.unitAmount / 100
          : yearly?.unitAmount / 100;
      const plan = price === "monthly" ? "Yearly" : "Yearly";
      setUrl(`choose-plan/payment?priceId=${params}&prices=100&plan=${plan}`);
    }
  }, [price, monthly, yearly]);

  useEffect(() => {
    localStorage.setItem("price", price);
  }, [price]);

  const handleNext = () => {
    SaveOnboadingData({ pricePlan: price });
  };

  const handleBack = () => {
    router.push("/onboard");
  };

  const hadndleFree = () => {
    setPrice("free");
    dispatch(setPricePlan("free"));
  };

  return loading ? (
    <PriceSkeleton />
  ) : (
    <div>
      <section className="overflow-hidden bg-[#000000] h-screen">
        <div className="relative w-full mx-auto overflow-hidden">
          <div className="mx-auto ">
            <div className="absolute z-0 hidden -left-10 -top-40 lg:block">
              <Image
                src={right}
                alt="Left background"
                className=" h-[700px] 2xl:w-[720px] w-auto"
              />
            </div>

            <div className="absolute right-0 z-0 hidden -top-40 lg:block">
              <Image
                src={left}
                alt="Right background"
                className=" 2xl:h-[800px] h-[700px] 2xl:w-[700px] w-auto"
              />
            </div>

            <div className="container ">
              <div className="max-w-[980px] block mx-auto  md:mt-[60px] mt-[30px]">
                <h2 className="xl:text-[52px] sm:text-[44px] text-[23px] xl:leading-[65px] sm:leading-[60px] leading-9 text-white font-montserrat text-center">
                  <span className="font-medium text-[#B2B2B2]">
                    Your verification
                  </span>
                  <br />{" "}
                  <span className="text-[#B2B2B2] font-medium">
                    opened the door
                  </span>{" "}
                  Premium unlocks the full network.
                </h2>
              </div>
              <div className="bg-[#141616] max-w-[600px] mx-auto mt-10 rounded-[20px] sm:p-6 p-4">
                <Plan fn={handleNext} next={url} title="Upgrade to Premium" />
              </div>

              <div className="max-w-[953px] block m-auto mt-20">
                <h2 className="text-center text-white ">
                  $1 Trillion in <br /> Lifetime Economic Power
                </h2>
                <p className="max-w-[585px] block m-auto text-center text-base font-medium text-white leading-6 pt-6">
                  The Divine Nine has contributed over a century of cultural,
                  civic, and financial leadership. Premium is where we activate
                  that power — through verified connections, business
                  collaborations, and shared opportunities.
                </p>
              </div>
              <div className="bg-[#141616] p-4 lg:rounded-full rounded-[30px] mt-[64px] relative overflow-hidden mb-8">
                <div className="flex sm:flex-nowrap flex-wrap items-center 2xl:gap-[52px] sm:gap-10 gap-5">
                  <div className="block m-auto sm:m-0">
                    <Image
                      className="sm:w-[150px] w-[120px]"
                      src={clock}
                      alt="clock"
                    />
                  </div>
                  <h2 className="">
                    12 Founder’s spots <br /> remain — secure yours today.
                  </h2>
                </div>
                <div className="absolute top-0 right-0">
                  <Image src={clockShadow} alt="clockShadow" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    // <div className="">
    //   <div className="lg:px-[60px] px-4">
    //     <div className="sm:pt-[20px] pt-1 pb-5  text-center">
    //       <p
    //         className={`font-inter max-w-[630px]  text-center block m-auto sm:text-base text-[13px] sm:leading-6 leading-4 font-normal text-white sm:mb-[30px] mb-4`}
    //       >
    //         {price == "free"
    //           ? "Get verified, claim your Prophytes Number, and join the only digital network built exclusively for Divine Nine members."
    //           : `The Divine Nine created the most respected network in Black America.
    //         Now, for the first time, you can access that network — digitally
    //         verified and organized by those who truly crossed.`}
    //       </p>
    //       <div className="inline-flex gap-3 text-center justify-center p-[7px] rounded-[10px] border border-white">

    //         <button
    //           onClick={() => {
    //             setPrice("monthly");
    //             dispatch(setPricePlan("monthly"));
    //           }}
    //           className={` ${
    //             price == "monthly"
    //               ? "bg-white text-black"
    //               : "bg-transparent text-white"
    //           } sm:text-[22px] text-[12px]  px-[16px] font-bold sm:leading-7 leading-4 rounded-[8px] `}
    //         >
    //           Monthly
    //         </button>
    //         <button
    //           onClick={() => {
    //             setPrice("yearly");
    //             dispatch(setPricePlan("yearly"));
    //           }}
    //           className={`p-[9px] ${
    //             price == "yearly"
    //               ? "bg-white text-black"
    //               : "bg-transparent text-white"
    //           } sm:text-[22px] text-[12px] font-bold sm:leading-7 leading-4 rounded-[8px]`}
    //         >
    //           Yearly
    //         </button>
    //       </div>
    //     </div>

    //     <div className="block m-auto text-center">
    //       <div className="inline-flex sm:p-[30px] p-4 bg-white rounded-[10px] border-primary">
    //         <div>
    //           <ul className="sm:mt-6 mt-3 sm:space-y-5 space-y-2 text-[16px] text-[#333333] font-normal leading-5 sm:pb-5">
    //             <li className="flex gap-2">
    //               <div>
    //                 <CheckMarkIcon className="w-4 h-4 text-black" />
    //               </div>

    //               <span className="text-start sm:text-base text-[13px] sm:leading-5 leading-4">
    //                 {price == "free"
    //                   ? "Verified Profile & Standard Badge"
    //                   : `Your Verified Prophytes Black Card — a digital gesture of
    //                 earned membership`}
    //               </span>
    //             </li>
    //             <li className="flex gap-2">
    //               <div>
    //                 <CheckMarkIcon className="w-4 h-4 text-black" />
    //               </div>
    //               <span className="sm:text-base text-[13px] text-start sm:leading-5 leading-4">
    //                 {price == "free"
    //                   ? "Your Prophytes Number"
    //                   : "A Premium Profile with a shareable business card"}
    //               </span>
    //             </li>
    //             <li className="flex items-center gap-2">
    //               <div>
    //                 <CheckMarkIcon className="w-4 h-4 text-black" />
    //               </div>

    //               <span className="text-start sm:text-base text-[13px] sm:leading-5 leading-4">
    //                 {price == "free"
    //                   ? "Public Directory Listing"
    //                   : "Access to every verified member in your organization"}
    //               </span>
    //             </li>
    //             <li className="flex gap-2">
    //               <div>
    //                 <CheckMarkIcon className="w-4 h-4 text-black" />
    //               </div>
    //               <span className="text-start sm:text-base text-[13px] sm:leading-5 leading-4">
    //                 {price == "free"
    //                   ? "Search and connect across all Divine Nine orgs"
    //                   : "Search and connect across all Divine Nine orgs"}
    //               </span>
    //             </li>
    //             <li className="flex items-start gap-2">
    //               <div>
    //                 {" "}
    //                 <CheckMarkIcon className="w-4 h-4 text-black" />
    //               </div>
    //               <span className=" sm:text-base text-[13px] text-start sm:leading-5 leading-4">
    //                 {price == "free"
    //                   ? "Connect & DM Verified Members"
    //                   : "Listed in the Verified Members Directory"}
    //               </span>
    //             </li>
    //             <li className="flex items-start gap-2">
    //               <div>
    //                 <CheckMarkIcon className="w-4 h-4 text-black" />
    //               </div>
    //               <span className=" sm:text-base text-[14px] text-start sm:leading-5 leading-4">
    //                 {price == "free"
    //                   ? "Instant Chapter Group Chat Access"
    //                   : "Listing in the Divine Nine Business Directory (Coming Soon)"}
    //               </span>
    //             </li>
    //           </ul>
    //           <div className="sm:mb-[30px] mb-3 flex items-end">
    //             <span className="text-start sm:text-[36px] text-xl text-black font-bold leading-[48px]">
    //               $
    //               {price === "free"
    //                 ? 0
    //                 : price === "monthly"
    //                 ? monthly?.unitAmount / 100
    //                 : yearly?.unitAmount / 100}
    //             </span>
    //             <p className={`font-inter text-[#333333]`}>
    //               /{" "}
    //               {price === "free"
    //                 ? "Free"
    //                 : price === "monthly"
    //                 ? "Monthly"
    //                 : "Yearly"}
    //             </p>
    //           </div>
    //         </div>
    //       </div>
    //       <p
    //         className={`font-inter max-w-[613px] sm:text-sm text-[13px] sm:leading-[22px] leading-4 text-white font-normal sm:mt-5 mt-3 block m-auto `}
    //       >
    //         Why It Matters: The Divine Nine has contributed over a century of
    //         cultural, civic, and financial leadership. It&apos;s members
    //         represent over $1 trillion in lifetime economic power- and this
    //         platform exist to connect and activate that power.
    //       </p>
    //       <Link
    //         href="/terms"
    //         target="_blank"
    //         className="text-base text-white/80 text-center block m-auto sm:mt-5 mt-3 leading-[22px]  font-normal underline"
    //       >
    //         Terms Of Services
    //       </Link>
    //     </div>

    //     {/* Navigation Buttons */}
    //     <div className="my-10">
    //       <NextPreviousButton
    //         fn={handleNext}
    //         backFn={handleBack}
    //         previous=" "
    //         next={url}
    //       />
    //     </div>
    //   </div>
    // </div>
  );
};

export default PricePlan;
