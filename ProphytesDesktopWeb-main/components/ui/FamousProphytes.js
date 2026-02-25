"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import { useGetAllOrganizationsQuery } from "@/src/redux/services/organizationApi";
import { useGetProphytesQuery } from "@/src/redux/services/prophytesApi";

import ProphytesSkeleton from "../skeleton/ProphytesSkeleton";
import PropytesContent from "./PropytesContent";
import CustomSelect from "./CustomSelect";
import MemberSearchSvg from "@/public/img/icon/MemberSearchSvg";

const FamousProphytes = () => {
  const [selectedOrga, setSelectedOrga] = useState("");
  const [selectedMember, setSelectedMember] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  const [filterParams, setFilterParams] = useState({});

  const {
    data: prophytesData,
    isLoading,
    isFetching,
  } = useGetProphytesQuery(filterParams);

  const { data: orgs, isLoading: orgsLoading } = useGetAllOrganizationsQuery();

  const handleSearch = () => {
    const params = {};

    if (selectedMember) params.search = selectedMember;
    if (selectedOrga) params.organization = selectedOrga;

    setFilterParams(params);
  };

  const getShortCode = (organization) => {
    return organization
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <section className="md:py-[135px] xs:py-20 py-[60px] bg-[#141616]">
      <div className="container">
        <div className="items-center justify-between pb-5 sm:pb-10 lg:flex">
          <h2 className="text-white font-montserrat">
            Famous <br className="hidden lg:block" /> Prophytes
          </h2>

          <div className="xl:bg-[#383838] rounded-[60px] xl:p-5 lg:mt-0 mt-5 flex sm:flex-row flex-col sm:gap-2 gap-[10px] items-center self-end">
            <div className="flex items-center gap-1 pr-5 justify-between border border-[#383838] sm:bg-black bg-[#383838] rounded-[36px] sm:w-[300px] w-full">
              <input
                type="text"
                value={selectedMember}
                onChange={(e) => setSelectedMember(e.target.value)}
                placeholder="Search Famous Prophytes"
                className="w-full sm:h-[60px] h-[50px] font-normal text-base placeholder:text-[#FFFFFFB2] placeholder:text-base text-white bg-transparent px-5 focus:outline-none"
              />
              <MemberSearchSvg />
            </div>

            <div className="sm:w-[280px] w-full">
              <CustomSelect
                value={selectedOrga}
                setValue={setSelectedOrga}
                options={orgs?.organizations}
                optionKey="organization"
                optionLabel="organization"
                placeholder={isMobile ? "Organization" : "Search Organization"}
                loading={orgsLoading}
                changeBg
              />
            </div>

            <button
              onClick={handleSearch}
              className="group right-[10px] sm:h-[60px] h-12 sm:w-[208px] w-full bg-white rounded-full text-[14px] font-semibold leading-[28px]  hover:text-white hover:bg-black relative z-[1] overflow-hidden transition-all duration-300 ease-in-out before:content-[''] before:absolute before:top-[162%] before:left-1/2 before:w-[210%] before:h-[290%] sm:before:bg-white before:bg-black  before:transform before:-translate-x-1/2 before:-rotate-[8deg] before:rounded-[80%] before:z-[-1] before:duration-[800ms] hover:before:-top-[96%] hover:before:bg-black sm:ml-[10px] ml-3"
            >
              <span className="text-black sm:group-hover:text-white group-hover:text-white z-[99] transition-all duration-300 ease-in-out">
                Search
              </span>
            </button>
          </div>
        </div>

        <div className="grid gap-3 sm:gap-6 lg:grid-cols-2">
          {isLoading || isFetching ? (
            Array(4)
              .fill(0)
              .map((_, i) => <ProphytesSkeleton key={i} />)
          ) : prophytesData?.data?.length > 0 ? (
            prophytesData.data
              .slice(0, 4)
              .map((prophyte, index) => (
                <PropytesContent
                  key={index}
                  prophyte={prophyte}
                  sortCode={getShortCode(prophyte.organization)}
                />
              ))
          ) : (
            <div className="col-span-2 mt-10 text-xl font-bold text-center text-white md:text-2xl lg:text-3xl">
              Not found!
            </div>
          )}
        </div>

        {prophytesData?.data?.length > 0 && (
          <div className="block m-auto mt-8 text-center xs:mt-10">
            {" "}
            <div className="block m-auto mt-6 text-center sm:mt-14">
              {" "}
              <Link
                href="/famous-prophytes"
                className="group relative inline-flex m-auto xs:gap-[18px] gap-[10px] items-center h-[66px] overflow-hidden bg-white border-white rounded-[99px] transition-all duration-500 ease-in cursor-pointer after:content-[''] after:absolute after:left-auto after:right-0 after:bottom-0 after:h-full after:z-[1] after:rounded-[99px] after:w-0 after:bg-black xs:after:py-[15px] after:py-[11px] after:transition-[width] after:duration-[500ms] after:border after:border-white after:ease-[cubic-bezier(0.25,0.8,0.25,1)] hover:after:text-white hover:after:w-full hover:after:left-0 hover:after:right-auto "
              >
                {" "}
                <span className="ml-[5px] py-[14px] px-5 bg-black text-lg font-medium text-white leading-[26px] rounded-[99px]">
                  {" "}
                  <span className="relative z-[9] group-hover:text-white group-hover:transition-all group-hover:duration-500 ease-in">
                    {" "}
                    Explore More{" "}
                  </span>{" "}
                </span>{" "}
                <span className="pr-3">
                  {" "}
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-black group-hover:text-white relative z-[9] xs:size-6 size-6 transition-all duration-500 ease-out"
                  >
                    {" "}
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M20.7497 12.751H3.25V11.251L20.7497 11.251V12.751Z"
                      fill="currentColor"
                    />{" "}
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M19.9998 11.2441C16.4723 11.2441 13.5898 14.3462 13.5898 17.6541V18.4041H15.0898V17.6541C15.0898 15.1426 17.3324 12.7441 19.9998 12.7441H20.7494V11.2441H19.9998Z"
                      fill="currentColor"
                    />{" "}
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M20.0037 12.7479C16.4762 12.7479 13.5938 9.6458 13.5938 6.33789V5.58789H15.0938V6.33789C15.0938 8.84947 17.3363 11.2479 20.0037 11.2479H20.7534V12.7479H20.0037Z"
                      fill="currentColor"
                    />{" "}
                  </svg>{" "}
                </span>{" "}
              </Link>{" "}
            </div>{" "}
          </div>
        )}
      </div>
    </section>
  );
};

export default FamousProphytes;
