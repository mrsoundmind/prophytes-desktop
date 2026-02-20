"use client";
import OrganaizationSkeleton from "@/components/skeleton/OrganaizationSkeleton";
import { ArrayToObject } from "@/src/utils/ArrayToObject";
import { SaveOnboadingData } from "@/src/utils/SaveOnboadingData";
import Image from "next/image";
import { useEffect, useState } from "react";
import MobileStapper from "./MobileStapper";
import NextPreviousButton from "./NextPreviousButton";
import Stepper from "./Stapper";
import { useDispatch } from "react-redux";
import { setOnboardPage } from "@/src/redux/slices/onboardingSlice";
import { useGetAllOrganizationsQuery } from "@/src/redux/services/organizationApi";
import ShieldSvg from "@/public/img/icon/ShieldSvg";
import { getColorById } from "@/src/utils/getColorById";
import WarningSvg from "@/public/img/icon/WarningSvg";

const Organization = () => {
  const [isActive, setIsActive] = useState(0);
  const [onboading, setOnboading] = useState({});
  const [disabled, setDisabled] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const dispatch = useDispatch();
  const { data: organizations, isLoading: loading, refetch } =
    useGetAllOrganizationsQuery();

  const hasOrganizations = organizations?.organizations && organizations.organizations.length > 0;
  const organizationsFailed = !loading && !hasOrganizations;

  const handleNext = () => {
    dispatch(setOnboardPage("initiated-chapter"));
  };

  useEffect(() => {
    const onboading = JSON.parse(localStorage.getItem("onboading"));
    if (onboading) {
      const obj = ArrayToObject(onboading);
      setOnboading(obj);
    }

    // detect mobile
    setIsMobile(window.innerWidth <= 768);
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setOnboading]);

  const handleOrganaization = (item) => {
    setIsActive(item?.organization);
    SaveOnboadingData({ organization: item?.organization });
    SaveOnboadingData({ organizationId: item.id });
    setDisabled(false);

    if (isMobile) {
      setTimeout(() => {
        handleNext();
      }, 1000);
    }
  };

  useEffect(() => {
    if (onboading?.organization && hasOrganizations) {
      setIsActive(onboading?.organization);
      setDisabled(false);
    } else if (organizationsFailed || loading) {
      setDisabled(true);
    }
  }, [onboading, hasOrganizations, organizationsFailed, loading]);

  return (
    <>
      <div className="flex-1">
        <div className="">
          <MobileStapper disabled={disabled} />
        </div>
        <div className="2xl:p-12 sm:p-6 p-0 bg-black rounded-[8px]">
          <div>
            <h3 className="mb-2 2xl:mb-6 font-montserrat">
              Select Your Organization
            </h3>
            <h5 className="lg:text-lg text-sm text-[#E7E7EB] font-medium sm:leading-[26px] leading-[22px] 2xl:mb-3 mb-[6px]">
              Choose your Greek organization to begin verification.
            </h5>
            <p className="sm:text-sm text-xs text-[#A2A2A8] font-normal sm:leading-[22px] leading-[18px] flex sm:items-center items-start  gap-2 2xl:mb-6 mb-3">
              <span className="inline-block">
                <ShieldSvg className="mt-1 sm:mt-0" />
              </span>
              Private by design. We don&apos;t show your selection publicly
              until you&apos;re verified
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 ">
            {loading ? (
              Array(9)
                .fill(0)
                .map((_, i) => <OrganaizationSkeleton key={i} />)
            ) : !organizations?.organizations || organizations.organizations.length === 0 ? (
              <div className="col-span-3 flex flex-col items-center justify-center py-12 px-6 text-center">
                <p className="text-lg text-white mb-4">We couldn&apos;t load organizations right now.</p>
                <button
                  onClick={() => refetch ? refetch() : window.location.reload()}
                  className="px-6 py-3 bg-primary text-black rounded-full font-medium hover:bg-primary/80 transition"
                >
                  Retry
                </button>
              </div>
            ) : (
              organizations.organizations.map((item) => {
                const textColor = getColorById(item?.id);

                return (
                  <div
                    key={item.id}
                    className={`2xl:h-[126px] sm:h-[85px] h-[104px] 2xl:p-5 p-3 w-full  cursor-pointer rounded-[8px] relative `}
                    style={{
                      backgroundColor: `${item.id == 1 ? "#CFB53B" : `#${item.color}`
                        }`,
                    }}
                    onClick={() => handleOrganaization(item)}
                  >
                    <div>
                      {item.organization === isActive && (
                        <div className="absolute top-4 right-3">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 28 28"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              width="28"
                              height="28"
                              rx="14"
                              fill="black"
                            />
                            <path
                              d="M19.3307 10L11.9974 17.3333L8.66406 14"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col justify-between h-full">
                      <Image
                        src={item.miniLogo}
                        width={56}
                        height={24}
                        alt="minilogo"
                        className="sm:w-[56px] w-10 h-6 object-contain"
                      />
                      <div>
                        <p
                          className="lg:text-[19px] sm:text-sm text-xs  lg:font-semibold font-medium font-montserrat lg:leading-[30px] leading-[22px] "
                          style={{
                            color: `${textColor}`,
                          }}
                        >
                          {item?.organization}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
          {/* <h5 className="flex items-center gap-2 text-lg font-medium leading-7 text-[#A2A2A8] mt-6">
            <WarningSvg /> Not sure? Choose now. You can change this later.
          </h5> */}
          {!isMobile && (
            <div className="hidden mt-4 2xl:mt-8 sm:block">
              {(disabled || organizationsFailed) && (
                <p className="text-sm text-[#A2A2A8] mb-3 text-right">
                  {organizationsFailed
                    ? "Organizations couldn't be loaded. Please Retry."
                    : ""}
                </p>
              )}
              <div className="flex justify-end">
                <NextPreviousButton
                  fn={handleNext}
                  previous=""
                  next=" "
                  NextButtonDisabled={disabled}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Organization;
