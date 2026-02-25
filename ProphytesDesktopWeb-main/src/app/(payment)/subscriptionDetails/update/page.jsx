"use client";
import { useUpgradePlanMutation } from "@/src/redux/services/subscriptionApi";
import { useUserInfoQuery } from "@/src/redux/services/userApi";
import { ErrorAlert } from "@/src/utils/ErrorAlert";
import { SuccessAlert } from "@/src/utils/SuccessAlert";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function page() {
//   const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
  const router = useRouter();
  const { data: userInfo } = useUserInfoQuery();
  const [updatePlan, updatePlanRes] = useUpgradePlanMutation();
  const query = useSearchParams();
  const plan = query.get("plan");
  const price = query.get("prices");
  const planId = query.get("priceId");
  const handleUpdate = () => {
    if (userInfo?.user?.subscriptionId) {
      updatePlan({
        subscriptionId: userInfo?.user?.subscriptionId,
        newPriceId: planId,
      });
    }
  };

  useEffect(() => {
    if (updatePlanRes?.data) {
      SuccessAlert("Subscription updated successfully");
      router.push("/subscriptionDetails");
    }
    if (updatePlanRes?.error) {
      ErrorAlert(
        updatePlanRes?.error?.data?.message || "Failed to update subscription"
      );
    }
  }, [updatePlanRes]);
  return (
    <div className="text-white my-5 xl:my-10 ">
      <h4 className="text-2xl lg:text-[36px] font-bold text-center">
        Confirm your updates
      </h4>

      <div className="my-5 md:my-10">
        <div className="flex justify-between items-center ">
          <div>
            <h6 className="font-bold text-lg ">{plan}</h6>
            <p className="text-white mt-3 text-sm">
              What you`ll pay monthly <br />
              sarting August 29,2025
            </p>
          </div>
          <p className="text-white mt-3 text-[22px] font-bold">${price}</p>
        </div>
        <div className="h-[1px] bg-[#E6E6E6] mt-5 "></div>
      </div>

      <div className="mb-5">
        <div className="flex justify-between items-center">
          <div>
            <h6 className="font-bold text-lg ">Amount Due Today</h6>
          </div>
          <p className="text-white mt-3 text-[22px] font-bold">${price}</p>
        </div>
        <div className="h-[1px] bg-[#E6E6E6] mt-5 "></div>
      </div>

      <div className="flex flex-col lg:flex-row items-center gap-5 mt-10 justify-center md:text-base">
        <button
          onClick={handleUpdate}
          className="min-w-[350px] py-3 bg-white  hover:bg-[#1E1E1E] hover:text-white text-black rounded-lg font-bold"
          disabled={updatePlanRes?.isLoading}
        >
          {updatePlanRes?.isLoading ? "Updating..." : "Update Plan"}
        </button>
        <button
          onClick={() => router.back()}
          href="/subscriptionDetails/choosePlan"
          className="min-w-[350px] py-3 text-center bg-[#1E1E1E] hover:bg-white hover:text-black text-white rounded-lg font-bold"
        >
          Back
        </button>
      </div>
    </div>
  );
}
