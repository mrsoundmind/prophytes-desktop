"use client";
import Footer from "@/components/footer/Footer";
import NavBar from "@/components/header/NavBar";
import { usePathname } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import PaymentStepper from "../components/PaymentStepper";
import ShownPlan from "../components/ShownPlan";
import PaymentMiddelware from "../components/PaymentMiddelware";
import { useSelector } from "react-redux";
import PriceSkeleton from "../../(onboardLayout)/components/PriceSkeleton";

export default function layout({ children }) {
  const pathName = usePathname();
  const price = useSelector((state) => state.price.price);

  return (
    <div>
      <PaymentMiddelware />
      <div className="">
        <NavBar />
        <Suspense fallback={<PriceSkeleton />}>{children}</Suspense>
        {/* <div
          className={`xl:max-w-[1400px] xl:mx-auto mx-5 ${
            pathName == "/choose-plan/payment" ? "grid" : "block"
          } xl:grid-cols-4 gap-4 sm:mt-10 mt-0 lg:mt-20 `}
        >
          {pathName == "/choose-plan/payment" && (
            <div className={`hidden xl:block`}>
              <Suspense fallback={<div>Loading...</div>}>
                <ShownPlan />
              </Suspense>
            </div>
          )}
        </div> */}
        {/* <Footer /> */}
      </div>
    </div>
  );
}
