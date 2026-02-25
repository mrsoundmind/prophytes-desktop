"use client";
import { useEffect, useState } from "react";

import NextPreviousButton from "@/src/app/(onboardLayout)/components/NextPreviousButton";
import PriceSkeleton from "@/src/app/(onboardLayout)/components/PriceSkeleton";
import CheckMarkIcon from "@/src/assets/icon/CheckMarkIcon";
import { usePricePlanQuery } from "@/src/redux/services/subscriptionApi";
import { ArrayToObject } from "@/src/utils/ArrayToObject";
import { ErrorAlert } from "@/src/utils/ErrorAlert";
import { SaveOnboadingData } from "@/src/utils/SaveOnboadingData";
import { useRouter } from "next/navigation";
import Plan from "../../components/Plan";

const PricePlan = () => {
  const router = useRouter();
  const [prices, setPrices] = useState();
  const [monthly, setMonthly] = useState({});
  const [yearly, setYearly] = useState({});
  const { data, isLoading: loading } = usePricePlanQuery();
  const [onboading, setOnboading] = useState({});
  const [price, setPrice] = useState("yearly");
  const [url, setUrl] = useState();

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
      const plan = price === "monthly" ? "Monthly" : "Yearly";
      setUrl(
        `subscriptionDetails/update?priceId=${params}&prices=100&plan=${plan}`
      );
    }
  }, [price, monthly, yearly]);

  const handleNext = () => {
    SaveOnboadingData({ pricePlan: price });
  };

  const handleBack = () => {
    router.push("/subscriptionDetails");
  };

  return loading ? (
    <PriceSkeleton />
  ) : (
    <div className="container">
      <div className="bg-[#141616] max-w-[600px] mx-auto mt-10 rounded-[20px] xl:p-[50px] md:p-10 sm:p-6 p-4">
        <Plan fn={handleNext} next={url} title="Upgrade to Premium" />
      </div>
    </div>

    // <div className="">
    //   <div className="lg:px-[60px] px-4">
    //     <div className="sm:pt-[20px] pt-1 pb-5  text-center">
    //       <div className="inline-flex gap-3 text-center justify-center p-[7px] rounded-[10px] border border-white">
    //         <button
    //           onClick={() => setPrice("monthly")}
    //           className={`p-[9px] ${
    //             price == "monthly"
    //               ? "bg-white text-black"
    //               : "bg-transparent text-white"
    //           } sm:text-[22px] px-[16px] font-bold leading-7 rounded-[8px]`}
    //         >
    //           Monthly
    //         </button>
    //         <button
    //           onClick={() => setPrice("yearly")}
    //           className={`p-[9px] ${
    //             price == "yearly"
    //               ? "bg-white text-black"
    //               : "bg-transparent text-white"
    //           } sm:text-[22px] text-base font-bold leading-7 rounded-[8px]`}
    //         >
    //           Yearly
    //         </button>
    //       </div>
    //     </div>

    //     <div className="block m-auto text-center">
    //       <div className="inline-flex sm:p-10 p-4 bg-white rounded-[10px] border-primary">
    //         <div>
    //           <div className="mb-[30px] flex items-end">
    //             <span className="text-start sm:text-[36px] text-xl text-black font-bold leading-[48px]">
    //               $
    //               {price == "monthly"
    //                 ? monthly?.unitAmount / 100
    //                 : yearly?.unitAmount / 100}
    //             </span>
    //             <p className={`font-inter text-[#333333]`}>
    //               / {price == "monthly" ? "Monthly" : "Yearly"}
    //             </p>
    //           </div>

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
    //         </div>
    //       </div>
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
