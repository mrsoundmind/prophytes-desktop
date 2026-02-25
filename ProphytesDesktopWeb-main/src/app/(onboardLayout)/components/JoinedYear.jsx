"use client";
import { ArrayToObject } from "@/src/utils/ArrayToObject";
import { SaveOnboadingData } from "@/src/utils/SaveOnboadingData";
import { useEffect, useState } from "react";

import CustomDropdown from "./CustomDropdown";
import MobileStapper from "./MobileStapper";
import NextPreviousButton from "./NextPreviousButton";
import { useDispatch, useSelector } from "react-redux";
import { setOnboardPage } from "@/src/redux/slices/onboardingSlice";
import CitySelect from "../../(dashboardLayout)/components/CitySelect";
import CountrySelect from "../../(dashboardLayout)/components/CountrySelect";
import StateSelect from "../../(dashboardLayout)/components/StateSelect";

const JoinedYear = () => {
  const country = useSelector((state) => state.onboardPage.country);
  const state = useSelector((state) => state.onboardPage.state);
  const city = useSelector((state) => state.onboardPage.city);
  const [disabled, setDisabled] = useState(true);
  const [semester, setSemester] = useState("Fall");
  const [newCity, setNewCity] = useState(city);
  const [newCountry, setNewCountry] = useState(country);
  const [newState, setNewState] = useState(state);
  const [onboading, setOnboading] = useState({});
  const [clearField, setClearField] = useState(false);

  const dispatch = useDispatch();
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 1970 }, (_, i) =>
    (1971 + i).toString()
  );
  const [selectedYear, setSelectedYear] = useState(years[years.length - 1]);

  useEffect(() => {
    const onboading = JSON.parse(localStorage.getItem("onboading"));
    if (onboading) {
      const obj = ArrayToObject(onboading);
      setOnboading(obj);
    }
  }, [setOnboading]);

  // Pre-fill saved data
  useEffect(() => {
    if (onboading?.yearMemberSince) {
      setSelectedYear(onboading?.yearMemberSince);
    }
    if (onboading?.seasonMemberSince) {
      setSemester(onboading?.seasonMemberSince);
    }
    if (
      onboading?.state &&
      onboading?.countryName &&
      onboading?.cityName &&
      onboading?.yearMemberSince &&
      onboading?.seasonMemberSince
    )
      setDisabled(false);
  }, [onboading]);

  const handleNext = () => {
    dispatch(setOnboardPage("verify-email"));
  };

  const handlePrev = () => {
    dispatch(setOnboardPage("initiated-chapter"));
  };

  // Save data to localStorage on change

  useEffect(() => {
    if (newState) SaveOnboadingData({ state: newState.name });
    if (selectedYear) SaveOnboadingData({ yearMemberSince: selectedYear });
    if (semester) SaveOnboadingData({ seasonMemberSince: semester });
    if (newCountry) SaveOnboadingData({ countryName: newCountry.name });
    if (newCity) SaveOnboadingData({ cityName: newCity.name });

    if (newState && selectedYear && semester && newCity && newCountry) {
      return setDisabled(false);
    }
  }, [selectedYear, semester, newCountry, newCity, newState]);

  useEffect(() => {
    if (clearField) {
      onboading.state = "";
      onboading.countryName = "";
      onboading.cityName = "";
      setDisabled(true);
      setNewState(null);
      setNewCountry(null);
      setNewCity(null);
      setClearField(false);
      // localStorage.setItem("onboading", JSON.stringify([]));
    }
  }, [clearField]);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (
      isMobile &&
      newState &&
      selectedYear &&
      semester &&
      newCity &&
      newCountry
    ) {
      const timer = setTimeout(() => {
        handleNext();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [newCity, newCountry, selectedYear, semester, newState]);

  useEffect(() => {
    if (newState) {
      localStorage.setItem("countryId", newCountry.id);
    }
    if (newCity) {
      localStorage.setItem("stateId", newState.id);
      localStorage.setItem("cityId", newCity.id);
    }
  }, [newState, newCity]);

  return (
    <div className="p-12 bg-black rounded-[8px]">
      <div>
        <MobileStapper />
      </div>

      <div className="flex flex-col justify-center ">
        <div className="">
          <div className="flex flex-col items-center justify-between md:flex-row sm:gap-y-10 gap-y-5 md:gap-x-10">
            <CustomDropdown
              label="Select Season"
              options={["Fall", "Spring", "Summer", "Winter"]}
              value={semester}
              onChange={setSemester}
              placeholder="Select Semester"
              onClear={() => {
                onboading.seasonMemberSince = "";
                setDisabled(true);
              }}
            />
            <CustomDropdown
              label="Select Year"
              options={years.reverse()}
              value={selectedYear}
              onChange={setSelectedYear}
              placeholder="Select Year"
              onClear={() => {
                onboading.yearMemberSince = "";
                setDisabled(true);
              }}
            />
          </div>

          {/* <div className="mt-5">
            <CountrySelect
              label="Country"
              newCountry={newCountry ? newCountry : onboading?.countryName}
              setNewCountry={setNewCountry}
              isDiffrent={false}
              // searchParams={countryId}
              clearField={clearField}
              setClearField={setClearField}
            />

            <div className="grid mt-5 sm:grid-cols-2 sm:gap-y-10 gap-y-5 md:gap-x-10">
              <StateSelect
                label="State"
                newState={newState?.name ? newState?.name : onboading?.state}
                setNewState={setNewState}
                isDiffrent={false}
                showLabel={true}
                clearField={clearField}
                setClearField={setClearField}
                searParams={newCountry?.id}
                className="pr-10 pl-5 w-full  font-inter focus:outline-none placeholder:text-base placeholder:font-normal leading-5 cursor-pointer bg-black text-white placeholder:text-black/70   px-[30px] rounded-[10px] placeholder:text-white sm:py-[17px] py-4 sm:mt-0 mt-3"
              />
              <CitySelect
                label="City"
                newCity={newCity ? newCity : onboading?.cityName}
                setNewCity={setNewCity}
                isDiffrent={false}
                clearField={clearField}
                setClearField={setClearField}
                searParams={newState?.id}
                className="pr-10 pl-5 w-full  font-inter focus:outline-none placeholder:text-base placeholder:font-normal leading-5 cursor-pointer bg-black placeholder:text-black/70   px-[30px] rounded-[10px] placeholder:text-white sm:py-[17px] py-4 sm:mt-0 mt-3 text-white"
              />
            </div>
          </div> */}

          {/* Navigation Buttons */}
          <div className="mt-10 sm:mt-20">
            <NextPreviousButton
              fn={handleNext}
              backFn={handlePrev}
              previous=" "
              next=" "
              NextButtonDisabled={disabled}
              hideNextOnMobile={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinedYear;
