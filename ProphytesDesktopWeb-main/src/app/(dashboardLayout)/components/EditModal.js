import { useEffect, useRef, useState } from "react";
import InputField from "./InputField";

import ButtonSkeleton from "@/components/skeleton/ButtonSkeleton";
import InputFieldSkeleton from "@/components/skeleton/InputFieldSkeleton";
import PhoneNumberSelector from "@/components/ui/PhoneNumberSelector";
import {
  useUserInfoQuery,
  useUserInfoUpdateMutation,
} from "@/src/redux/services/userApi";
import { ErrorAlert } from "@/src/utils/ErrorAlert";
import { SuccessAlert } from "@/src/utils/SuccessAlert";
import Link from "next/link";
import CitySelect from "./CitySelect";
import ModalClose from "./ModalClose";
import CountrySelect from "./CountrySelect";
import StateSelect from "./StateSelect";

const EditModal = ({ setOpen, open }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newCountry, setNewCountry] = useState();
  const [newState, setNewState] = useState("");
  const [isoptVerified, setIsotpVerified] = useState(false);
  const [tempNum, setTempNum] = useState();
  const [clearField, setClearField] = useState(false);
  const [countryId, setCountryId] = useState(null);
  const { data: userInfo, isLoading: user_loading } = useUserInfoQuery();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    countryName: "",
    cityName: "",
    state: "",
    relationshipStatus: "",
    email: "",
    phone_number: "",
  });

  const initialFormData = useRef({
    firstName: "",
    lastName: "",
    dob: "",
    cityName: "",
    countryName: "",
    state: "",
    relationshipStatus: "",
    email: "",
    phone_number: "",
  });

  const hasShownAlert = useRef(false);
  const [fetchData, { isLoading: loading, data, error }] =
    useUserInfoUpdateMutation();

  // Populate data from userInfo
  useEffect(() => {
    if (userInfo) {
      const initial = {
        firstName: userInfo?.user?.firstName || "",
        lastName: userInfo?.user?.lastName || "",
        dob: userInfo?.user?.dob || "",
        cityName: userInfo?.user?.cityName || "",
        state: userInfo?.user?.state || "",
        countryName: userInfo?.user?.country?.name || "",
        relationshipStatus: userInfo?.user?.relationshipStatus || "",
        email: userInfo?.user?.email || "",
        phone_number: userInfo?.user?.phone_number || "",
      };
      initialFormData.current = initial;
      setFormData(initial);
      setPhoneNumber(initial.phone_number);
      setNewCity(initial.cityName);
      setNewState(initial.state);
      setNewCountry(initial.countryName);
    }
  }, [userInfo]);

  // Update phone_number on state change
  useEffect(() => {
    if (phoneNumber) {
      setFormData((prev) => ({ ...prev, phone_number: phoneNumber }));
    }
  }, [phoneNumber]);

  useEffect(() => {
    if (newCity) {
      setFormData((prev) => ({ ...prev, cityName: newCity.name }));
    } else {
      setFormData((prev) => ({ ...prev, cityName: "" }));
    }
  }, [newCity]);

  useEffect(() => {
    if (newCountry) {
      setFormData((prev) => ({ ...prev, countryName: newCountry.name }));
    } else {
      setFormData((prev) => ({ ...prev, countryName: "" }));
    }
  }, [newCountry]);

  useEffect(() => {
    if (newState) {
      setFormData((prev) => ({ ...prev, state: newState.name }));
    } else {
      setFormData((prev) => ({ ...prev, state: "" }));
    }
  }, [newState]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const hasChanged = Object.keys(formData).some(
    (key) => formData[key] !== initialFormData.current[key]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const changedFields = {};
    for (const key in formData) {
      if (formData[key] !== initialFormData.current[key]) {
        changedFields[key] = formData[key];
      }
    }

    if ("phone_number" in changedFields) {
      if (tempNum && !isoptVerified) {
        return ErrorAlert("Please verify your phone number before saving.");
      }

      if (isoptVerified) {
        delete changedFields.phone_number;
      }
    }

    if (Object.keys(changedFields).length === 0) {
      return;
    }
    if (tempNum && !isoptVerified) {
      return ErrorAlert("Phone verification required before saving changes.");
    }

    fetchData(changedFields);
    hasShownAlert.current = false;
  };

  useEffect(() => {
    if (data?.status === 200 && !hasShownAlert.current) {
      SuccessAlert("Information Successfully Updated");
      hasShownAlert.current = true;
      setOpen(false);
    }
    if (error) {
      ErrorAlert(error?.data?.issue?.message || "Failed to update information");
    }
  }, [data, error]);

  useEffect(() => {
    if (userInfo?.user?.countryId) {
      setCountryId(userInfo?.user?.countryId);
    }
  }, [userInfo?.user?.countryId]);

  return (
    <div>
      {open && (
        <div
          className="fixed max-w-[1920px] mx-auto inset-0 z-[9999] flex items-center justify-center bg-black/50 overflow-hidden"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-xl 2xl:p-10 sm:p-6 p-4 xl:w-[60%] w-[90%] h-fit shadow-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <ModalClose title="Personal Information" setOpen={setOpen} />

            <div>
              {user_loading ? (
                <>
                  <div className="grid lg:grid-cols-2 gap-[30px]">
                    {Array(8)
                      .fill(0)
                      .map((_, i) => (
                        <InputFieldSkeleton key={i} />
                      ))}
                  </div>
                  <ButtonSkeleton />
                </>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-1 sm:gap-4 md:grid-cols-2">
                    <InputField
                      label="First Name"
                      name="firstName"
                      value={formData?.firstName}
                      onChange={handleChange}
                      placeholder="N/A"
                      isEdit={false}
                    />
                    <InputField
                      label="Last Name"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="N/A"
                      isEdit={false}
                    />
                    <InputField
                      label="Email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="N/A"
                      isEdit={true}
                    />
                    <PhoneNumberSelector
                      label="Phone Number"
                      phoneNumber={phoneNumber}
                      setPhoneNumber={setPhoneNumber}
                      isoptVerified={isoptVerified}
                      setIsotpVerified={setIsotpVerified}
                      tempNum={tempNum}
                      setTempNum={setTempNum}
                    />
                    <InputField
                      label="Date Of Birth"
                      name="dob"
                      type="date"
                      value={formData.dob}
                      onChange={handleChange}
                      placeholder="N/A"
                    />

                    <CountrySelect
                      label="Country"
                      newCountry={
                        newCountry ? newCountry : userInfo?.user?.country?.name
                      }
                      setNewCountry={setNewCountry}
                      clearField={clearField}
                      setClearField={setClearField}
                      className="sm:py-4 py-[10px] pr-10 pl-5 w-full border border-black/70   rounded-[10px] font-inter focus:outline-none placeholder:text-base placeholder:font-normal leading-5 cursor-pointer placeholder:text-black text-black/70"
                    />
                    <StateSelect
                      label="State"
                      newState={newState ? newState : userInfo?.user?.state}
                      setNewState={setNewState}
                      searParams={
                        newCountry?.id ?? userInfo?.user?.countryId ?? null
                      }
                      clearField={clearField}
                      setClearField={setClearField}
                      className="sm:py-4 py-[10px] pr-10 pl-5 w-full border border-black/70   rounded-[10px] font-inter focus:outline-none placeholder:text-base placeholder:font-normal leading-5 cursor-pointer placeholder:text-black text-black/70"
                    />

                    <CitySelect
                      label="City"
                      newCity={newCity ? newCity : userInfo?.user?.cityName}
                      setNewCity={setNewCity}
                      searParams={newState && newState?.id}
                      clearField={clearField}
                      setClearField={setClearField}
                      className="sm:py-4 py-[10px] pr-10 pl-5 w-full border border-black/70   rounded-[10px] font-inter focus:outline-none placeholder:text-base placeholder:font-normal leading-5 cursor-pointer placeholder:text-black text-black/70"
                    />
                  </div>
                  <div className="mt-4">
                    <InputField
                      label="Relationship"
                      name="relationshipStatus"
                      value={formData.relationshipStatus}
                      onChange={handleChange}
                      placeholder="N/A"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !hasChanged}
                    className={`font-inter sm:text-base text-[15px] text-white font-bold leading-5 w-full md:mt-5 mt-2 rounded-full sm:mb-0 mb-2 ${
                      loading || !hasChanged
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-black"
                    } sm:py-5 py-[14px] transition-colors`}
                  >
                    {loading ? "Saving..." : "Save"}
                  </button>

                  <p className="sm:text-base text-[13px] text-center font-normal sm:leading-5 leading-4 text-gray-800 sm:mt-[26px] mt-0">
                    Need to update information that you can&apos;t change
                    yourself? Email us at{" "}
                    <Link
                      href={`mailto:support@prophytes.com`}
                      target="_blank"
                      className="underline"
                    >
                      support@prophytes.com
                    </Link>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditModal;
