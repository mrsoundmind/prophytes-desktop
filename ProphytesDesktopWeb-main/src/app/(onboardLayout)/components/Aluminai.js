"use client";
import React, { useEffect, useRef, useState } from "react";

import { API_ROUTES } from "@/src/configs/constants";
import useDebouncedQuery from "@/src/hooks/useDebounceQuery";
import { SaveOnboadingData } from "@/src/utils/SaveOnboadingData";
import ChapterInput from "./ChapterInput";
import { useGetChapterQuery } from "@/src/redux/services/chapterApi";
import { useDispatch, useSelector } from "react-redux";
import {
  setCity,
  setCountry,
  setState,
} from "@/src/redux/slices/onboardingSlice";
import { ArrayToObject } from "@/src/utils/ArrayToObject";
import ShieldSvg from "@/public/img/icon/ShieldSvg";
import WarningSvg from "@/public/img/icon/WarningSvg";
import AngleIcon from "@/public/img/icon/AngleIcon";
import LocationIconSvg from "@/public/img/icon/LocationIconSvg";
import CountrySelect from "../../(dashboardLayout)/components/CountrySelect";
import StateSelect from "../../(dashboardLayout)/components/StateSelect";
import CitySelect from "../../(dashboardLayout)/components/CitySelect";
import ChapterSelector from "./ChapterSelector";

const Aluminai = ({
  newCountry,
  setNewCountry,
  newState,
  setNewState,
  newCity,
  setNewCity,
  newChapter,
  setNewChapter,
}) => {
  const [onboading, setOnboading] = useState({});
  const [clearField, setClearField] = useState(false);

  const [open, setOpen] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    const onboading = JSON.parse(localStorage.getItem("onboading"));
    if (onboading) {
      const obj = ArrayToObject(onboading);
      setOnboading(obj);
    }
  }, [setOnboading]);

  useEffect(() => {
    if (newChapter) {
      SaveOnboadingData({ initiatedChapter: newChapter.chapter_name });
    }
  }, [newChapter]);

  return (
    <div className=" 2xl:mt-10">
      <CountrySelect
        newCountry={
          newCountry?.name ? newCountry?.name : onboading?.countryName
        }
        setNewCountry={setNewCountry}
        clearField={clearField}
        setClearField={setClearField}
        // searchParams="United States"
        isDiffrent={false}
        placeholder="Select your country"
        className="2xl:h-[60px] h-12 pr-10 pl-5 w-full border border-black/70   rounded-[10px] font-inter focus:outline-none placeholder:text-base placeholder:font-normal leading-6 cursor-pointer text-base   text-black/70 placeholder:text[#B2B2B2] bg-[#141616]  text-white placeholder:text-white"
      />
      <StateSelect
        newState={newState?.name ? newState?.name : onboading?.state}
        setNewState={setNewState}
        isDiffrent={false}
        showLabel={true}
        clearField={clearField}
        setClearField={setClearField}
        searParams={newCountry?.id ? newCountry?.id : 23}
        className="pr-10 pl-5 w-full 2xl:h-[60px] h-12 text-base  font-inter focus:outline-none placeholder:text-base placeholder:font-normal leading-5 cursor-pointer bg-[#141616] text-white placeholder:text-black/70   px-[30px] rounded-[10px] placeholder:text-white  sm:mt-0 mt-3"
      />
      <CitySelect
        newCity={newCity?.name ? newCity?.name : onboading?.cityName}
        setNewCity={setNewCity}
        isDiffrent={false}
        clearField={clearField}
        setClearField={setClearField}
        searParams={newState?.id}
        className="pr-10 pl-5 w-full 2xl:h-[60px] h-12 text-base *:first-letter:
          font-inter focus:outline-none  placeholder:font-normal leading-6 cursor-pointer bg-[#141616] placeholder:text-base  text-white placeholder:text-black/70   px-[30px] rounded-[10px] placeholder:text-white   mt-3"
      />

      {newState?.name && (
        <div className="mt-3">
          <ChapterSelector
            newChapter={newChapter?.name}
            setnewChapter={setNewChapter}
            placeholder="Select your Chapter"
            organization={onboading?.organization}
            type="ALUMNI"
            searchParams={newState?.id}
            className="w-full border-0 outline-none focus:outline-none 2xl:h-[60px] h-[50px]  pl-5 pr-8  rounded-[8px] text-base font-normal placeholder:text-base   text-white placeholder:text-white/70 cursor-pointer bg-[#141616]"
          />
        </div>
      )}
      <p className="flex sm:items-center  gap-2 text-sm font-normal leading-[22px] text-[#A2A2A8] mt-3">
        <span>
          <ShieldSvg className="mt-1 sm:mt-0" />
        </span>
        Your chapter is used to route you to the right community. Private by
        design.
      </p>
      <div className="w-full mt-3 2xl:mt-10">
        <p className="flex  gap-3 md:text-lg text-[15px] md:leading-7 leading-6 font-normal text-[#E6E6E6]">
          <span>
            <LocationIconSvg />
          </span>{" "}
          I’ve moved. Connect me to my local alumni chapter.
        </p>
        <button
          onClick={() => setOpen(!open)}
          className="flex  gap-3 md:text-lg text-[15px] md:leading-7 leading-6 font-normal text-[#E6E6E6] mt-4"
        >
          <span>
            <WarningSvg />
          </span>

          <span>I don’t remember my initiated chapter</span>
          <AngleIcon className="text-white xs:size-5 size-4" />
        </button>

        <div
          ref={contentRef}
          style={{
            maxHeight: open ? `${contentRef.current?.scrollHeight}px` : "0px",
          }}
          className="overflow-hidden transition-all duration-500 ease-in-out "
        >
          <div className="px-8 mt-5 space-y-4 border-l ">
            <div className="">
              <label className="block sm:text-base text-[#B2B2B2] sm:leading-6 leading-[22px] mb-2">
                School name
              </label>
              <input
                type="text"
                placeholder="Enter your school name"
                className="w-full rounded-lg bg-[#141616] border border-[#383838] px-5 md:h-[60px] h-12 text-base placeholder:text-base leading-6 text-white focus:outline-none placeholder:text-[#B2B2B2]"
              />
            </div>

            <div>
              <label className="block sm:text-base text-sm text-[#B2B2B2] sm:leading-6 leading-[22px] mb-2">
                Crossing year <span className="text-[#595959]">(optional)</span>
              </label>
              <input
                type="text"
                placeholder="Enter your school name"
                className="w-full rounded-lg bg-[#141616] border border-[#383838] px-5 md:h-[60px] h-12 text-base placeholder:text-base leading-6 text-white focus:outline-none placeholder:text-[#B2B2B2]"
              />
            </div>

            <p className="sm:text-sm text-xs sm:leading-[22px] leading-[18px] text-[#A2A2A8]">
              We’ll help match you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aluminai;
