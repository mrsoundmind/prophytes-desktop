"use client";
import creditCard from "@/public/img/icon/credit-card.png";
import {
  useCancelSubscriptionMutation,
  useSubscriptionDetailsMutation,
} from "@/src/redux/services/subscriptionApi";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import SubDetailsSkeleton from "../components/skeleton/SubDetailsSkeleton";
import { SuccessAlert } from "@/src/utils/SuccessAlert";
import { ErrorAlert } from "@/src/utils/ErrorAlert";
import { useUserInfoQuery } from "@/src/redux/services/userApi";

export default function SubscriptionDetails() {
  const router = useRouter();
  const { data: userInfo } = useUserInfoQuery();
  const [getSubscriptionDetails, { data, error, isLoading }] =
    useSubscriptionDetailsMutation();
  const [cancelSub, cancelSubRes] = useCancelSubscriptionMutation();
  const [subDetails, setSubDetails] = useState(null);
  const [end, setEnd] = useState(null);

  const handleCancelSub = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      iconColor: "black",
      showCancelButton: true,
      confirmButtonColor: "black",
      cancelButtonColor: "black",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (subDetails?.id) cancelSub({ subscriptionId: subDetails?.id });
      }
    });
  };

  useEffect(() => {
    if (userInfo?.user?.subscriptionId) {
      getSubscriptionDetails({
        subscriptionId: userInfo?.user?.subscriptionId,
      });
    }
  }, [userInfo?.user?.subscriptionId]);

  useEffect(() => {
    if (cancelSubRes?.data) {
      SuccessAlert("Subscription cancelled successfully");
    }
    if (cancelSubRes?.error) {
      ErrorAlert(
        cancelSubRes?.error?.data?.message || "Failed to cancel subscription"
      );
    }
  }, [cancelSubRes]);

  useEffect(() => {
    if (data) {
      setSubDetails(data?.data?.subscription);
      const endDate = new Date(
        data?.data?.subscription?.items?.data[0]?.current_period_end * 1000
      ); // Multiply by 1000 to convert UNIX to JS Date
      const formattedEndDate = endDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });

      setEnd(formattedEndDate);
    }
    if (error) {
    }
  }, [data, error]);

  useEffect(() => {
    if (cancelSubRes?.data) {
    }
    if (cancelSubRes?.error) {
    }
  }, [cancelSubRes]);


  return isLoading ? (
    <SubDetailsSkeleton />
  ) : (
    <div className="text-white ">
      <h4 className="text-2xl font-bold">Current Plan</h4>
      <div className="flex items-center w-full gap-5 p-4 my-5 bg-white rounded-lg">
        <div className="flex items-center justify-center w-6 h-6 bg-white border border-black rounded-full ">
          <div className="w-4 h-4 bg-black rounded-full "></div>
        </div>
        <div>
          <p className="font-bold">
            {subDetails?.plan?.interval === "year" ? "Yearly" : "Monthly"}
          </p>
          <p className="text-[12px] mt-1">
            ${subDetails?.plan?.amount / 100} / {subDetails?.plan?.interval}
          </p>
          <p className="text-[12px]">Your subscription renews on {end}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 md:gap-5 justify-center text-[12px] md:text-base">
        <Link
          href={`/subscriptionDetails/choosePlan${
            subDetails?.items?.data[0]?.price?.id
              ? `?currentPlanId=${subDetails?.items?.data[0]?.price?.id}`
              : ""
          }`}
          className="px-3 py-2 bg-white  hover:bg-[#1E1E1E] hover:text-white text-black rounded-full font-bold"
        >
          Update Subscription
        </Link>
        <button
          onClick={handleCancelSub}
          disabled={cancelSubRes?.isLoading}
          className="px-3 py-2 bg-[#1E1E1E] hover:bg-white hover:text-black text-white rounded-full font-bold"
        >
          {cancelSubRes?.isLoading ? "Cancelling..." : "Cancel Subscription"}
        </button>
      </div>

      <div>
        <h4 className="mt-5 text-2xl font-bold md:mt-10">Payment method</h4>
        <div className="p-4 bg-[#1E1E1E] w-[150px] md:w-[200px] my-5 rounded-lg ">
          <Image height={40} width={40} src={creditCard} alt="credit card" />
          <p className="mt-2 text-white">Credit Card</p>
        </div>

        {/* <button className="px-10 py-2 bg-[#1E1E1E] hover:bg-white hover:text-black text-white rounded-lg font-bold">
            + Add Payment Method
          </button> */}
      </div>

      <div>
        <h4 className="mt-5 text-2xl font-bold md:mt-10 font-montserrat">
          Billing and shipping information
        </h4>

        <button
          onClick={() => {
            router.push("/subscriptionDetails/updateInfo");
          }}
          className="px-10 py-2 mt-5 bg-[#1E1E1E] hover:bg-white hover:text-black text-white rounded-lg font-bold"
        >
          + Update information
        </button>
      </div>

      <div>
        <h4 className="mt-5 text-2xl font-bold md:mt-10 font-montserrat">
          Invoices
        </h4>
        <p className="text-[14px] text-white my-5">
          View And download your invoices and payment history
        </p>
        <Link
          href={"/subscriptionDetails/invoice"}
          className="px-10 py-2 bg-[#1E1E1E] hover:bg-white hover:text-black text-white rounded-lg font-bold"
        >
          View
        </Link>
      </div>
    </div>
  );
}
