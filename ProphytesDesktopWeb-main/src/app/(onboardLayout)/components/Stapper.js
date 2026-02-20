"use client";

import clsx from "clsx";
import { onboardingSteps } from "@/src/configs/constants";
import { useSelector } from "react-redux";
import TikSvg from "@/public/img/icon/TikSvg";

export default function Stepper() {
  const currentPage = useSelector((state) => state?.onboardPage?.currentPage);

  // FILTER: Exclude "Welcome" from progress steps
  const progressSteps = onboardingSteps.filter(step => step.currentPath !== "welcome");

  // INDEX: Find index within the filtered list
  // Using currentPath because currentPage might rely on Redux which syncs with path
  const currentPath = currentPage || ""; // Handle empty string for Organization
  const currentProgressIndex = progressSteps.findIndex(
    (step) => step.currentPath === currentPath
  );

  // SAFETY: If we are on Welcome (index -1), do not render stepper
  if (currentProgressIndex === -1) {
    return null;
  }

  return (
    <div className="hidden h-full sm:block ">
      <>
        <div className="mb-12">
          <p className="text-base font-normal leading-6 text-white/70">
            STEP {currentProgressIndex + 1} of {progressSteps.length}
          </p>
          <h5 className="text-xl font-medium leading-[30px] text-white font-montserrat mt-2">
            {progressSteps[currentProgressIndex]?.name}
          </h5>
        </div>
      </>
      {progressSteps.map((step, index) => {
        const isCompleted = index <= currentProgressIndex;
        const isCurrent = index === currentProgressIndex;

        return (
          <div
            key={step.name}
            className={clsx(
              "flex justify-between  items-center mb-5  rounded-[16px]",
              {
                "": isCompleted,
                " text-black ": !isCurrent && isCompleted,
                "bg-transparent  ": !isCompleted,
              }
            )}
          >
            <div className="flex items-center gap-[10px]">
              <div
                className={clsx(
                  "rounded-[8px] size-8  flex items-center justify-center text-sm font-normal transition-all text-[#A2A2A8]",
                  {
                    // "bg-black text-white border-black": isCurrent,
                    "bg-white text-white ": isCompleted,
                    " text-black ": !isCurrent && isCompleted,
                    "bg-black ": !isCompleted,
                  }
                )}
              >
                {isCompleted ? <TikSvg /> : index + 1}
              </div>

              <div
                className={clsx(" transition-colors text-lg  leading-7", {
                  "font-medium text-white ": isCompleted,
                  "font-normal text-[#A2A2A8]": !isCompleted,
                })}
              >
                {step.name}
              </div>
            </div>
            {/* <button
              className={`grid place-content-center rounded-full size-7 border border-[#33333333]/20 ${
                isCompleted ? "bg-black" : "bg-transparent"
              }`}
            >
              {isCompleted && <TikSvg />}
            </button> */}
          </div>
        );
      })}
    </div>
  );
}
