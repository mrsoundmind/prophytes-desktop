"use client";
import { useEffect, useState } from "react";
import { ArrayToObject } from "@/src/utils/ArrayToObject";
import Aluminai from "./Aluminai";
import Undergrade from "./Undergrade";
import CheckSvg from "@/public/img/icon/CheckSvg";
import { useDispatch, useSelector } from "react-redux";
import { setOnboardPage } from "@/src/redux/slices/onboardingSlice";
import { SaveOnboadingData } from "@/src/utils/SaveOnboadingData";

const Identity = ({ setDisabled }) => {
  const country = useSelector((state) => state.onboardPage.country);
  const state = useSelector((state) => state.onboardPage.state);
  const city = useSelector((state) => state.onboardPage.city);
  const [onboading, setOnboading] = useState({});
  const [selected, setSelected] = useState("undergrad");
  const [alumniChapter, setAlumniChapter] = useState("");
  const [underGraduateValue, setUnderGraduateValue] = useState("");
  const [newCountry, setNewCountry] = useState(country);
  const [newState, setNewState] = useState(state);
  const [newCity, setNewCity] = useState(city);
  const [undergradeChapter, setUndergradeChapter] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    const onboading = JSON.parse(localStorage.getItem("onboading"));
    if (onboading) {
      const obj = ArrayToObject(onboading);
      setOnboading(obj);
    }
  }, [setOnboading]);

  useEffect(() => {
    if (newCountry)
      SaveOnboadingData({
        countryName: newCountry?.name ? newCountry?.name : "United States",
      });
    if (newState) SaveOnboadingData({ state: newState.name });
    if (newCity) SaveOnboadingData({ cityName: newCity.name });
    if (alumniChapter) {
      SaveOnboadingData({ initiatedChapter: alumniChapter.chapter_name });
    }
    if (selected === "undergrad") {
      SaveOnboadingData({ classification: "Undergraduate" });
    } else {
      SaveOnboadingData({ classification: "Alumni" });
    }
  }, [newCountry, newState, newCity, alumniChapter, selected]);

  useEffect(() => {
    if (
      (underGraduateValue && undergradeChapter?.chapter_name) ||
      (newState?.name && alumniChapter?.chapter_name)
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [
    newState,
    newCountry,
    underGraduateValue,
    alumniChapter,
    undergradeChapter,
  ]);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (
      (isMobile && newState.name && alumniChapter.chapter_name) ||
      (isMobile && underGraduateValue && undergradeChapter?.chapter_name)
    ) {
      const timer = setTimeout(() => {
        dispatch(setOnboardPage("verify-email"));
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [
    newState,
    underGraduateValue,
    alumniChapter,
    undergradeChapter,
    dispatch,
  ]);

  return (
    <div>
      <div className="grid grid-cols-2 md:gap-[30px] gap-2">
        <label
          className={`font-montserrat gap-[15px] pl-7 2xl:pt-6 pt-3 2xl:h-[110px] h-[90px] rounded-[8px]  sm:text-xl text-lg sm:font-semibold font-medium sm:leading-[30px] leading-7 cursor-pointer transition ${
            selected === "undergrad"
              ? "bg-[#E7E7EB] "
              : "bg-[#333333] text-white "
          }`}
        >
          <input
            type="checkbox"
            checked={selected === "undergrad"}
            onChange={() => {
              setSelected("undergrad");
            }}
            className="hidden peer"
          />
          <div
            className={`size-6 rounded-full border mb-4 ${
              selected === "undergrad"
                ? "border-black bg-black text-white"
                : "border-white"
            } flex items-center justify-center`}
          >
            {selected === "undergrad" && <CheckSvg />}
          </div>
          Undergrad
        </label>

        <label
          className={`font-montserrat gap-[15px] pl-7 2xl:pt-6 pt-3 2xl:h-[110px] h-[90px] rounded-[8px]  sm:text-xl text-lg sm:font-semibold font-medium sm:leading-[30px] leading-7 cursor-pointer transition ${
            selected === "alumni" ? "bg-[#F3F3F3]" : "bg-[#333333] text-white "
          }`}
        >
          <input
            type="checkbox"
            checked={selected === "alumni"}
            onChange={() => {
              setSelected("alumni");
              setUnderGraduateValue("");
            }}
            className="hidden peer"
          />
          <div
            className={`size-6 rounded-full  mb-4 ${
              selected === "alumni"
                ? "border-black bg-black text-white"
                : "bg-[#383838] border border-white"
            } flex items-center justify-center`}
          >
            {selected === "alumni" && <CheckSvg />}
          </div>
          Alumni
        </label>
      </div>
      <p className="sm:text-base text-sm  sm:leading-6 leading-[22px] text-[#A2A2A8] mt-3 ">
        Not sure? Choose your best guess. You can update this later.
      </p>

      {selected === "alumni" ? (
        <Aluminai
          newCountry={newCountry}
          setNewCountry={setNewCountry}
          newState={newState}
          setNewState={setNewState}
          newCity={newCity}
          setNewCity={setNewCity}
          newChapter={alumniChapter}
          setNewChapter={setAlumniChapter}
        />
      ) : (
        <Undergrade
          value={underGraduateValue}
          setValue={setUnderGraduateValue}
          undergradeChapter={undergradeChapter}
          setUndergradeChapter={setUndergradeChapter}

          // isUndergrade={selected}
          // setDisabled={setDisabled}
        />
      )}
    </div>
  );
};

export default Identity;
