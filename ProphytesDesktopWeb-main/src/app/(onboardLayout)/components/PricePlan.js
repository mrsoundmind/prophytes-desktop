"use client";
import { useEffect, useState } from "react";

import NextPreviousButton from "./NextPreviousButton";

import check from "@/public/img/icon/check.svg";
import Image from "next/image";
import Link from "next/link";
import MobileStapper from "./MobileStapper";
import { SaveOnboadingData } from "@/src/utils/SaveOnboadingData";
import { ArrayToObject } from "@/src/utils/ArrayToObject";
import CheckMarkIcon from "@/src/assets/icon/CheckMarkIcon";
import { ErrorAlert } from "@/src/utils/ErrorAlert";
import PriceSkeleton from "./PriceSkeleton";
import { useDispatch } from "react-redux";
import { setOnboardPage } from "@/src/redux/slices/onboardingSlice";
import FreePlanNextPreviousBtn from "./FreePlanNextPreviousBtn";
import { usePricePlanQuery } from "@/src/redux/services/subscriptionApi";

const PricePlan = () => {
  const [prices, setPrices] = useState();
  const [monthly, setMonthly] = useState({});
  const [yearly, setYearly] = useState({});
  const { data, isLoading: loading } = usePricePlanQuery();
  const [onboading, setOnboading] = useState({});
  const [price, setPrice] = useState("monthly");
  const [url, setUrl] = useState();
  const dispatch = useDispatch();

  const handlePrev = () => {
    dispatch(setOnboardPage("upload-image"));
  };
  const handleNext = () => {
    if (price == "free") {
      setUrl(" ");
      return dispatch(setOnboardPage("proof-membership"));
    } else {
      return SaveOnboadingData({ pricePlan: price });
    }
  };

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
        `choose-plan/payment?priceId=${params}&prices=${prices}&plan=${plan}`
      );
    } else {
      setUrl(dispatch(setOnboardPage("proof-membership")));
    }
  }, [price, monthly, yearly]);

  const handleSkip = () => {
    dispatch(setOnboardPage("proof-membership"));
  };

  return loading ? (
    <PriceSkeleton />
  ) : (
    <div className="">
      <div className="sm:bg-[linear-gradient(185.28deg,_rgba(230,230,230,0.17)_-4.66%,_rgba(128,128,128,0.06)_145.92%)] sm:py-8 py-0">
        <MobileStapper />
        <h4 className="md:text-[28px] sm:text-[24px] text-[18px] sm:px-3 px-0 text-white text-center font-bold sm:leading-10 leading-6 sm:mt-0 mt-4 font-montserrat">
          {price == "free"
            ? "You crossed for a reason. Stay connected to what matters — at no cost."
            : "You Were Promised a Network. This Is That Network — Verified."}
        </h4>
      </div>

      <div className="lg:px-[60px] sm:px-4 px-0">
        <div className="sm:pt-[20px] pt-1 sm:pb-5 pb-2  text-center">
          <p
            className={`font-inter max-w-[538px]  text-center block m-auto sm:text-base text-[13px] sm:leading-6 leading-4 font-normal text-white sm:mb-[30px] mb-4`}
          >
            {price == "free"
              ? "Get verified, claim your Prophytes Number, and join the only digital network built exclusively for Divine Nine members."
              : `The Divine Nine created the most respected network in Black America.
            Now, for the first time, you can access that network — digitally
            verified and organized by those who truly crossed.`}
          </p>
          <div className="inline-flex gap-3 text-center justify-center p-[7px] rounded-[10px] border border-white">
            <button
              onClick={() => setPrice("free")}
              className={`p-[9px] ${
                price == "free" ? "bg-white" : "bg-transparent text-white"
              } sm:text-[22px] text-[12px] font-bold sm:leading-7 leading-4 font-montserrat  rounded-[8px]`}
            >
              Free
            </button>
            <button
              onClick={() => setPrice("monthly")}
              className={`p-[9px] ${
                price == "monthly" ? "bg-white" : "bg-transparent text-white"
              } sm:text-[22px] text-[12px] font-bold font-montserrat sm:leading-7 leading-4  rounded-[8px]`}
            >
              Monthly
            </button>
            <button
              onClick={() => setPrice("yearly")}
              className={`p-[9px] ${
                price == "yearly" ? "bg-white " : "bg-transparent text-white"
              } sm:text-[22px] text-[12px] font-bold font-montserrat sm:leading-7 leading-4  rounded-[8px]`}
            >
              Yearly
            </button>
          </div>
        </div>

        <div className="block m-auto text-center">
          <div className="inline-flex sm:p-10 p-3 bg-white rounded-[10px] border-primary">
            <div>
              <ul className="sm:mt-6 mt-3 sm:space-y-5 space-y-2 text-[16px] text-[#333333] font-normal leading-5 sm:pb-5">
                <li className="flex gap-2">
                  <div>
                    <CheckMarkIcon className="w-4 h-4 text-black" />
                  </div>

                  <span className="text-start sm:text-base text-[13px] sm:leading-5 leading-4">
                    {price == "free"
                      ? "Verified Profile & Standard Badge"
                      : `Your Verified Prophytes Black Card — a digital gesture of
                    earned membership`}
                  </span>
                </li>
                <li className="flex gap-2">
                  <div>
                    <CheckMarkIcon className="w-4 h-4 text-black" />
                  </div>
                  <span className="sm:text-base text-[13px] text-start sm:leading-5 leading-4">
                    {price == "free"
                      ? "Your Prophytes Number"
                      : "A Premium Profile with a shareable business card"}
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <div>
                    <CheckMarkIcon className="w-4 h-4 text-black" />
                  </div>

                  <span className="text-start sm:text-base text-[13px] sm:leading-5 leading-4">
                    {price == "free"
                      ? "Public Directory Listing"
                      : "Access to every verified member in your organization"}
                  </span>
                </li>
                <li className="flex gap-2">
                  <div>
                    <CheckMarkIcon className="w-4 h-4 text-black" />
                  </div>
                  <span className="text-start sm:text-base text-[13px] sm:leading-5 leading-4">
                    {price == "free"
                      ? "Search and connect across all Divine Nine orgs"
                      : "Search and connect across all Divine Nine orgs"}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div>
                    {" "}
                    <CheckMarkIcon className="w-4 h-4 text-black" />
                  </div>
                  <span className=" sm:text-base text-[13px] text-start sm:leading-5 leading-4">
                    {price == "free"
                      ? "Connect & DM Verified Members"
                      : "Listed in the Verified Members Directory"}
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <div>
                    <CheckMarkIcon className="w-4 h-4 text-black" />
                  </div>
                  <span className=" sm:text-base text-[14px] text-start sm:leading-5 leading-4">
                    {price == "free"
                      ? "Instant Chapter Group Chat Access"
                      : "Listing in the Divine Nine Business Directory (Coming Soon)"}
                  </span>
                </li>
              </ul>
              <div className="sm:mb-[30px] mb-3 flex items-end">
                <span className="text-start sm:text-[36px] text-xl text-black font-montserrat font-bold leading-[48px] ">
                  $
                  {price === "free"
                    ? 0
                    : price === "monthly"
                    ? monthly?.unitAmount / 100
                    : yearly?.unitAmount / 100}
                </span>
                <p className={`font-inter text-[#333333]`}>
                  /{" "}
                  {price === "free"
                    ? "Free"
                    : price === "monthly"
                    ? "Monthly"
                    : "Yearly"}
                </p>
              </div>
            </div>
          </div>
          <p
            className={`font-inter max-w-[613px] sm:text-sm text-[13px] sm:leading-[22px] leading-4 text-white font-normal sm:mt-5 mt-3 `}
          >
            Why It Matters: The Divine Nine has contributed over a century of
            cultural, civic, and financial leadership. It&apos;s members
            represent over $1 trillion in lifetime economic power- and this
            platform exist to connect and activate that power.
          </p>
        </div>

        <Link
          href="/terms"
          target="_blank"
          className="text-base text-white/80 text-center block m-auto sm:mt-5 mt-3 leading-[22px]  font-normal underline"
        >
          Terms Of Services
        </Link>

        {/* Navigation Buttons */}
        {price == "free" ? (
          <FreePlanNextPreviousBtn />
        ) : (
          <div className="my-3 sm:my-10">
            <NextPreviousButton
              fn={handleNext}
              backFn={handlePrev}
              previous=" "
              next={url}
              nextButtonText={
                price == "free"
                  ? "Join the Network — Free"
                  : "Activate My Membership"
              }
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default PricePlan;
