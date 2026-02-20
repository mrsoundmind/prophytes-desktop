"use client";
import { useEffect, useRef, useState } from "react";
import { SaveOnboadingData } from "@/src/utils/SaveOnboadingData";
import SchoolSelect from "@/components/ui/SchoolSelect";

import ShieldSvg from "@/public/img/icon/ShieldSvg";
import WarningSvg from "@/public/img/icon/WarningSvg";
import AngleIcon from "@/public/img/icon/AngleIcon";
import { ArrayToObject } from "@/src/utils/ArrayToObject";
import ChapterSelector from "./ChapterSelector";

const UnderGrade = ({
  value,
  setValue,
  undergradeChapter,
  setUndergradeChapter,
}) => {
  const [selectedSchool, setSelectedSchool] = useState("");
  // const [undergradeChapter, setnewChapter] = useState("");
  const [onboading, setOnboading] = useState({});
  const [clearField, setClearField] = useState(false);
  const [open, setOpen] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    if (undergradeChapter) {
      SaveOnboadingData({ initiatedChapter: undergradeChapter.chapter_name });
    }
    if (selectedSchool) {
      SaveOnboadingData({ underGraduateSchool: selectedSchool.name });
    }
  }, [undergradeChapter, selectedSchool]);
  useEffect(() => {
    if (selectedSchool) {
      setValue(selectedSchool.name);
    }
  }, [selectedSchool, setValue]);

  useEffect(() => {
    const onboading = JSON.parse(localStorage.getItem("onboading"));
    if (onboading) {
      const obj = ArrayToObject(onboading);
      setOnboading(obj);
    }
  }, [setOnboading]);

  return (
    <div className="mt-3 2xl:mt-10">
      <SchoolSelect
        newSchool={selectedSchool.name}
        setNewSchool={setSelectedSchool}
        setClearField={setClearField}
        placeholder="Select your school (undergrad)"
        className="w-full border-0 outline-none focus:outline-none sm:h-[60px] min-h-[56px] pl-5 rounded-[8px] text-base font-normal placeholder:text-base sm:pr-0 pr-[10px] text-white placeholder:text-white/70 cursor-pointer bg-[#141616]"
      />
      <div className="mt-3" />

      {(selectedSchool || value) && (
        <ChapterSelector
          newChapter={undergradeChapter?.name}
          setnewChapter={setUndergradeChapter}
          placeholder="Select your Chapter"
          organization={onboading?.organization}
          university={selectedSchool.name}
          setClearField={setClearField}
          clearField={clearField}
          className="w-full border-0 outline-none focus:outline-none sm:h-[60px] min-h-[56px] pl-5 pr-8 rounded-[8px] text-base font-normal placeholder:text-base text-white placeholder:text-white/70 cursor-pointer bg-[#141616]"
        />
      )}

      <p className="flex sm:items-center gap-2 text-[13px] sm:text-sm font-normal leading-5 sm:leading-[22px] text-[#A2A2A8] mt-4">
        <span>
          <ShieldSvg className="mt-1 sm:mt-0" />
        </span>
        Your chapter is used to route you to the right community. Private by
        design.
      </p>

      <div className="w-full mt-5 2xl:mt-10">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 md:text-lg text-[15px]  md:leading-7 leading-6  font-normal text-[#E6E6E6]"
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
              <label className="block sm:text-base text-sm text-[#B2B2B2] sm:leading-6 leading-[22px] mb-2">
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
                placeholder="e.g. 2014"
                className="w-full rounded-lg bg-[#141616] border border-[#383838] px-5 md:h-[60px] h-12 text-base placeholder:text-base leading-6 text-white focus:outline-none placeholder:text-[#B2B2B2]"
              />
            </div>

            <p className="sm:text-sm text-xs sm:leading-[22px] leading-[18px] text-[#A2A2A8]">
              We&apos;’ll help match you.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnderGrade;
