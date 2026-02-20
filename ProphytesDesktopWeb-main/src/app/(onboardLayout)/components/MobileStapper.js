"use client";

import { onboardingSteps } from "@/src/configs/constants";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";
import TikSvg from "@/public/img/icon/TikSvg";
import { setOnboardPage } from "@/src/redux/slices/onboardingSlice";
import OnboadInfomationModal from "@/components/ui/OnboadInfomationModal";

export default function MobileStapper({ disabled = true, haveValue = false }) {
  const [open, setOpen] = useState(false);
  const [isError, setIserror] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [showVerifiedModal, setShowVerifiedModal] = useState(false);

  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state?.onboardPage?.currentPage);

  // FILTER: Exclude "Welcome" from progress steps
  const progressSteps = onboardingSteps.filter(step => step.currentPath !== "welcome");

  // INDEX: Find index within filtered list
  const currentPath = currentPage || "";
  const currentProgressIndex = progressSteps.findIndex(
    (step) => step.currentPath === currentPath
  );

  // SAFETY: If we are on Welcome (index -1), do not render stepper
  if (currentProgressIndex === -1) {
    return null;
  }

  const verifyStepIndex = progressSteps.findIndex(
    (step) => step.currentPath === "verify-code"
  );

  const lastStepIndex = progressSteps.length - 1;
  const secondLastStepIndex = progressSteps.length - 2;

  const isInLastTwoSteps =
    currentProgressIndex === lastStepIndex ||
    currentProgressIndex === secondLastStepIndex;

  const shouldShowModal = (targetIndex) => {
    if (!isInLastTwoSteps) return false;
    return targetIndex <= verifyStepIndex;
  };

  const goToStepByIndex = (index) => {
    if (index < 0 || index >= progressSteps.length) return;
    dispatch(setOnboardPage(progressSteps[index].currentPath));
  };

  const handleNextStep = () => {
    if (disabled) {
      setIserror(true);
      return;
    }
    setIserror(false);
    goToStepByIndex(currentProgressIndex + 1);
  };

  const handlePrevStep = (targetIndex = currentProgressIndex - 1) => {
    if (shouldShowModal(targetIndex)) {
      setShowVerifiedModal(true);
      return;
    }

    if (!haveValue) {
      setIserror(true);
      return;
    }

    setIserror(false);
    goToStepByIndex(targetIndex);
  };

  const handleStepClick = (index) => {
    if (shouldShowModal(index)) {
      setShowVerifiedModal(true);
      return;
    }

    if (index > currentProgressIndex) {
      handleNextStep();
    } else if (index < currentProgressIndex) {
      handlePrevStep(index);
    }
  };

  return (
    <>
      {/* Header */}
      <div className="block text-center lg:hidden">
        <p className="text-base font-normal leading-6 text-white/70">
          STEP {currentProgressIndex + 1} of {progressSteps.length}
        </p>
        <h5 className="text-xl font-medium leading-[30px] text-white font-montserrat mt-2">
          {progressSteps[currentProgressIndex]?.name}
        </h5>
      </div>

      {/* Mobile Stepper */}
      <div className="flex items-center justify-center gap-4 mt-3 mb-3 2xl:mt-6 sm:hidden">
        <div className="w-full rounded-xl bg-[#0f1111] shadow-[0px_6px_6px_0px_#14161678] border border-[#383838]">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center justify-between w-full px-4 py-4 text-white"
          >
            <div className="flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 text-sm font-bold text-black bg-white rounded-md">
                <TikSvg />
              </span>
              <span className="text-base font-medium leading-6">
                {progressSteps[currentProgressIndex]?.name}
              </span>
            </div>

            <svg
              className={`h-5 w-5 transition-transform duration-300 ${open ? "rotate-180" : ""
                }`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          <div
            className={`overflow-hidden transition-all duration-500 ease-in-out ${open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
              }`}
          >
            <ul className="px-4 pb-4 space-y-3">
              {progressSteps.map((step, index) => {
                const isCompleted = index <= currentProgressIndex;

                return (
                  <li
                    key={step.name}
                    className="flex items-center justify-between mb-4"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`size-8 rounded-md flex items-center justify-center text-sm transition ${isCompleted
                            ? "bg-white text-black"
                            : "bg-[#333333] text-[#A2A2A8]"
                          }`}
                      >
                        {isCompleted ? <TikSvg /> : index + 1}
                      </div>

                      <button
                        onClick={() => handleStepClick(index)}
                        className={clsx(
                          "text-base font-normal leading-6 transition",
                          {
                            "text-white": isCompleted,
                            "text-[#A2A2A8]": !isCompleted,
                          }
                        )}
                      >
                        {step.name}
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>

      {isError && (
        <p className="mb-5 text-sm text-center text-red-500 xl:mb-10">
          Please fill in all the fields.
        </p>
      )}

      {showVerifiedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="w-[90%] max-w-sm relative rounded-xl bg-[#0f1111] p-6 text-center border border-[#383838]">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-white">
                Do you want to update your information?
              </h3>
              <button
                className="absolute flex items-center justify-center text-2xl text-white border rounded-full size-8 top-2 right-3"
                onClick={() => setShowVerifiedModal(false)}
              >
                x
              </button>
            </div>

            <button
              onClick={() => [setShowVerifiedModal(false), setOpenModal(true)]}
              className="w-full py-2 mt-5 text-sm font-medium text-black bg-white rounded-lg"
            >
              Click here
            </button>
          </div>
        </div>
      )}

      <OnboadInfomationModal setOpen={setOpenModal} open={openModal} />
    </>
  );
}
