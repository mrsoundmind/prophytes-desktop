import React from "react";
import Footer from "@/components/footer/Footer";
import NavBar from "@/components/header/NavBar";
import Stepper from "./components/Stapper";
import MobileStapper from "./components/MobileStapper";

export const metadata = {
  title: "Onboading",
};
const OnboardLayout = ({ children }) => {
  return (
    <div className="h-screen bg-black">
      <NavBar isOnbording={true} />

      <section className="py-3 bg-black sm:py-5 lg:py-10">
        <div className="container">
          <div className="flex 2xl:gap-[72px] gap-6  sm:bg-[#333333] bg-transparent 2xl:p-12 sm:p-6 p-0 rounded-[8px]">
            <div className="hidden 2xl:w-[306px] w-[280px] sm:block">
              <div className="h-full">
                <Stepper />
              </div>
            </div>

            <div className="flex-1 ">{children}</div>
          </div>
        </div>
      </section>

      {/* <Footer /> */}
    </div>
  );
};

export default OnboardLayout;
