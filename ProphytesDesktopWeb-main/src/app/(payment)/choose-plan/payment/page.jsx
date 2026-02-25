"use client";

import NextPreviousButton from "@/src/app/(onboardLayout)/components/NextPreviousButton";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import CheckoutPage from "../../components/Checkout";
import PriceSkeleton from "@/src/app/(onboardLayout)/components/PriceSkeleton";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Home() {
  const query = useSearchParams();
  const amount = query.get("prices");
  const router = useRouter();
  const handlePlan = () => {
    router.push("/choose-plan");
  };

  return (
    <main className="">
      {amount && (
        <Elements
          stripe={stripePromise}
          options={{
            mode: "subscription",
            amount: amount * 100,
            currency: "usd",
          }}
        >
          <Suspense fallback={<PriceSkeleton />}>
            <CheckoutPage amount={amount} />
          </Suspense>
        </Elements>
      )}

      {/* <button
        onClick={handlePlan}
        className={`px-3 py-2  mt-10 text-black rounded-full text-[10px] font-bold xl:hidden`}
      >
        Do you want to change your plan?
      </button> */}
      <div className="flex items-center justify-center bg-black md:pt-[56px] pt-[30px]">
        <div className="border border-white rounded-full w-[122px] h-14 flex justify-center mb-10">
          <NextPreviousButton previous="choose-plan" next="" />
        </div>{" "}
      </div>
    </main>
  );
}
