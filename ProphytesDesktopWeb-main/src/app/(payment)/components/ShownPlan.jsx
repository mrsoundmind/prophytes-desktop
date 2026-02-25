"use client";
import CheckMarkIcon from "@/src/assets/icon/CheckMarkIcon";
import { useRouter, useSearchParams } from "next/navigation";
export default function ShownPlan() {
  const params = useSearchParams();
  const price = params.get("prices");
  const plan = params.get("plan");
  const router = useRouter();
  const handlePlan = () => {
    router.push("/choose-plan");
  };
  return (
    <div className="border border-white h-full rounded-md max-w-[500px]">
      <div className="sm:bg-[linear-gradient(185.28deg,_rgba(230,230,230,0.17)_-4.66%,_rgba(128,128,128,0.06)_145.92%)] py-4">
        <h4 className="md:text-[28px] sm:text-[24px] text-[18px] px-3 text-white text-center font-bold sm:leading-10 leading-7 sm:mt-0 mt-10">
          {plan}
        </h4>
      </div>

      <div className="block h-full px-5 m-auto my-10 text-center">
        <div className="inline-flex  p-4 bg-white rounded-[10px]  border-primary">
          <div>
            <div className="mb-[10px] flex items-center justify-center">
              <span className=" sm:text-[36px] text-xl text-black font-bold leading-[48px]">
                ${price}
              </span>
            </div>

            <div className="h-[2px] mt-2 bg-[#E5E5E5]"></div>

            <ul className="mt-6 space-y-5 text-[12px] text-[#333333] font-normal leading-5 pb-5">
              <li className="flex gap-2">
                <div>
                  <CheckMarkIcon className="w-5 h-4 mt-1 text-black" />
                </div>
                <span className="text-start sm:text-base text-[14px]">
                  Your Verified Prophytes Black Card — a digital gesture of
                  earned membership
                </span>
              </li>
              <li className="flex gap-2">
                <div>
                  <CheckMarkIcon className="w-6 h-4 mt-1 text-black" />
                </div>
                <span className="sm:text-base text-[14px] text-start">
                  A Premium Profile with a shareable business card
                </span>
              </li>
              <li className="flex items-center gap-2">
                <div>
                  <CheckMarkIcon className="w-4 h-4 mt-1 text-black" />
                </div>
                <span className="text-start sm:text-base text-[14px]">
                  Access to every verified member in your organization
                </span>
              </li>
              <li className="flex gap-2">
                <div>
                  <CheckMarkIcon className="w-4 h-4 mt-1 text-black" />
                </div>
                <span className="text-start sm:text-base text-[14px]">
                  Search and connect across all Divine Nine orgs
                </span>
              </li>
              <li className="flex items-start gap-2">
                <div>
                  <CheckMarkIcon className="w-5 h-4 mt-1 text-black" />
                </div>
                <span className=" sm:text-base text-[14px] text-start">
                  Listed in the Verified Members Directory
                </span>
              </li>
            </ul>
          </div>
        </div>

        <button
          onClick={handlePlan}
          className="px-5 py-3 mt-10 text-sm font-bold bg-white rounded-full "
        >
          Do you want to change your plan?
        </button>
      </div>
    </div>
  );
}
