"use client";
import ButtonSkeleton from "@/components/skeleton/ButtonSkeleton";
import InputFieldSkeleton from "@/components/skeleton/InputFieldSkeleton";
import {
  useUserInfoQuery,
  useUserInfoUpdateMutation,
} from "@/src/redux/services/userApi";
import { SuccessAlert } from "@/src/utils/SuccessAlert";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import SchoolSelect from "@/components/ui/SchoolSelect";
import { organizations } from "@/src/configs/constants";
import { ErrorAlert } from "@/src/utils/ErrorAlert";
import ChpaterSelector from "./ChpaterSelector";
import EducationCustomSelect from "./EducationCustomSelect";
import InputField from "./InputField";
import ModalClose from "./ModalClose";
import OrganizationSelect from "@/components/ui/OrganizationSelect";
import CustomDropdown from "../../(onboardLayout)/components/CustomDropdown";

const EditEducationModal = ({
  setOpen,
  open,
  isOpen = false,
  setIsOpen = () => {},
}) => {
  const [underGradSchool, setUnderGradSchool] = useState("");
  const [gradSchool, setGradSchool] = useState("");
  const [selectChpater, setSelectChpater] = useState("");
  const [initiatedChapter, setInitiatedChapter] = useState("");
  const [selectedOrga, setSelectedOrga] = useState("");
  const [clearFiled, setClearField] = useState(false);
  const [semester, setSemester] = useState("");
  const currentYear = new Date().getFullYear();

  const years = Array.from({ length: currentYear - 1970 }, (_, i) =>
    (1971 + i).toString()
  );
  const [selectedYear, setSelectedYear] = useState();

  const [formData, setFormData] = useState({
    underGraduateSchool: "",
    graduateSchoolName: "",
    classification: "",
    seasonMemberSince: "",
    yearMemberSince: "",
    initiatedChapter: "",
    currentChapter: "",
  });

  const hasShownAlert = useRef(false);
  const [initialData, setInitialData] = useState({});
  const [isChanged, setIsChanged] = useState(false);

  const { data: userInfo, isLoading: user_loading } = useUserInfoQuery();

  const [fetchData, { isLoading: loading, data, error, isSuccess }] =
    useUserInfoUpdateMutation();
  const organization = () => {
    const org = organizations.find(
      (item) => item.id === userInfo?.user?.organizationId
    );

    return org || null;
  };

  useEffect(() => {
    if (userInfo) {
      const filledData = {
        underGraduateSchool:
          userInfo?.user?.education?.underGraduateSchool?.name || "",
        graduateSchoolName:
          userInfo?.user?.education?.graduateSchool?.name || "",
        classification: userInfo?.user?.education?.classification || "",
        seasonMemberSince: userInfo?.user?.education?.seasonMemberSince || "",
        yearMemberSince: userInfo?.user?.education?.yearMemberSince || "",
        initiatedChapter:
          userInfo?.user?.education?.initiatedChapter?.name || "",
        currentChapter: userInfo?.user?.education?.currentChapter?.name || "",
      };

      setFormData(filledData);
      setInitialData(filledData);
    }
  }, [userInfo]);

  // Detect changes
  useEffect(() => {
    const hasChanges = Object.keys(formData).some(
      (key) => formData[key] !== initialData[key]
    );
    setIsChanged(hasChanges);
  }, [formData, initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle undergraduate school
  useEffect(() => {
    if (underGradSchool) {
      setFormData((prev) => ({
        ...prev,
        underGraduateSchool: underGradSchool.name,
        underGraduateSchoolId: underGradSchool.id,
      }));
    }
  }, [underGradSchool]);

  // Handle graduate school
  useEffect(() => {
    if (gradSchool) {
      setFormData((prev) => ({
        ...prev,
        graduateSchoolName: gradSchool.name,
        graduateSchoolId: gradSchool.id,
      }));
    }
  }, [gradSchool]);

  useEffect(() => {
    if (selectChpater) {
      setFormData((prev) => ({
        ...prev,
        currentChapter: selectChpater.chapter_name,
        currentChapterId: selectChpater.id,
      }));
    }
  }, [selectChpater]);

  useEffect(() => {
    if (initiatedChapter) {
      setFormData((prev) => ({
        ...prev,
        initiatedChapter: initiatedChapter.chapter_name,
        initiatedChapterId: initiatedChapter.id,
      }));
    }
  }, [initiatedChapter]);

  useEffect(() => {
    if (semester) {
      setFormData((prev) => ({
        ...prev,
        seasonMemberSince: semester,
      }));
    }
  }, [semester]);

  useEffect(() => {
    if (selectedYear) {
      setFormData((prev) => ({
        ...prev,
        yearMemberSince: selectedYear,
      }));
    }
  }, [selectedYear]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const changed = {};

    if (userInfo?.user?.education?.id) {
      formData["id"] = Number(userInfo.user.education.id);
    }

    for (const key in formData) {
      if (formData[key] !== initialData[key]) {
        changed[key] = formData[key];
      }
    }
    const changedFields = changed;

    if (Object.keys(changedFields).length === 0) {
      return;
    }

    fetchData({ education: changedFields }), (hasShownAlert.current = false);
  };

  useEffect(() => {
    if (data?.status === 200 && !hasShownAlert.current) {
      SuccessAlert("Information Successfully Updated");
      hasShownAlert.current = true;
    }
    if (error) {
      ErrorAlert(error?.data?.issue?.message || "Failed to update information");
    }
  }, [data, error]);
  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      setIsOpen(false);
    }
  }, [isSuccess]);

  const options = [{ name: "Undergraduate" }, { name: "Alumni" }];

  return (
    <div>
      {open && (
        <div
          className="fixed max-w-[1920px] mx-auto inset-0 z-[9999] flex items-center justify-center bg-black/50 overflow-hidden"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-xl 2xl:px-10 2xl:py-10 sm:px-6 px-0 py-2 xl:w-[60%] w-[85%] h-fit shadow-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 xxs:p-6 sm:p-0">
              <ModalClose title="Education" setOpen={setOpen} />

              {user_loading ? (
                <>
                  <div className="grid gap-2 sm:gap-4 md:grid-cols-2">
                    {Array(6)
                      .fill(0)
                      .map((_, i) => (
                        <InputFieldSkeleton key={i} />
                      ))}
                  </div>
                  <InputFieldSkeleton />
                  <ButtonSkeleton />
                </>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-2 sm:gap-4 md:grid-cols-2">
                    <SchoolSelect
                      newSchool={
                        formData.underGraduateSchool
                          ? formData.underGraduateSchool
                          : underGradSchool
                      }
                      setNewSchool={setUnderGradSchool}
                      label="Undergraduate School"
                      placeholder=""
                      crossColor={true}
                      className="sm:py-4 py-[10px] pl-3 pr-[26px] w-full bg-transparent text-black/70 border text-black border-black/70 rounded-[10px] font-inter placeholder:text-black focus:outline-none text-base placeholder:text-base placeholder:font-normal leading-5"
                    />

                    <SchoolSelect
                      newSchool={
                        formData.graduateSchoolName
                          ? formData.graduateSchoolName
                          : gradSchool
                      }
                      setNewSchool={setGradSchool}
                      label="Graduation School"
                      placeholder=""
                      crossColor={true}
                      className="sm:py-4 py-[10px] pl-3 pr-[26px] w-full bg-transparent text-black/70 border text-black border-black/70 rounded-[10px] font-inter placeholder:text-black focus:outline-none text-base placeholder:text-base placeholder:font-normal leading-6"
                    />

                    {/* <EducationCustomSelect
                      label="Classification"
                      defaultValue={formData.classification}
                      options={options}
                      optionLabelKey="name"
                      placeholder="N/A"
                      onChange={(val) => {
                        setFormData((prev) => ({
                          ...prev,
                          classification: val,
                        }));
                      }}
                    /> */}

                    <InputField
                      label="Classification"
                      name="seasonMemberSince"
                      value={formData.classification}
                      onChange={handleChange}
                      placeholder="N/A"
                      isEdit={true}
                    />

                    <CustomDropdown
                      label="Membership Status"
                      options={["Fall", "Spring", "Summer", "Winter"]}
                      value={semester}
                      onChange={setSemester}
                      placeholder="Fall"
                      onClear={() => {}}
                      className="sm:py-[14px] py-[10px] pl-3 pr-3 w-full bg-transparent text-black/70 border text-left text-black border-black/70 rounded-[10px] font-inter placeholder:text-black focus:outline-none placeholder:text-base placeholder:font-normal leading-5"
                    />

                    <CustomDropdown
                      label="Member Since"
                      options={years.reverse()}
                      value={selectedYear}
                      onChange={setSelectedYear}
                      placeholder="2026"
                      onClear={() => {}}
                      className="sm:py-3 py-[10px] pl-3 pr-3 w-full bg-transparent text-black/70 border text-left text-black border-black/70 rounded-[10px] font-inter placeholder:text-black focus:outline-none placeholder:text-base placeholder:font-normal leading-5"
                    />

                    {/* <InputField
                      label="Member Since"
                      name="yearMemberSince"
                      value={formData.yearMemberSince}
                      onChange={handleChange}
                      placeholder="N/A"
                      isEdit={true}
                    /> */}
                    {userInfo?.user?.education?.initiatedChapter
                      ?.chapter_name ? (
                      <InputField
                        label="Initiated Chapter"
                        name="initiatedChapter"
                        value={formData.initiatedChapter}
                        onChange={handleChange}
                        placeholder=""
                        isEdit={true}
                      />
                    ) : (
                      <ChpaterSelector
                        label="Initiated Chapter"
                        selectChpater={formData?.initiatedChapter}
                        setSelectChpater={setInitiatedChapter}
                        undergrade={formData.underGraduateSchool}
                        alumini={formData.graduateSchoolName}
                        organization={
                          selectedOrga.organization
                            ? selectedOrga.organization
                            : organization()?.organization
                        }
                        clearFiled={clearFiled}
                      />
                    )}
                  </div>
                  <div className="">
                    <div className="">
                      <ChpaterSelector
                        label="Current Chapter"
                        selectChpater={formData?.currentChapter}
                        setSelectChpater={setSelectChpater}
                        organization={organization()?.organization}
                        location={userInfo?.user?.state}
                      />
                    </div>
                    {/* {!userInfo?.user?.isVerified && (
                      <div className="w-full ">
                        <OrganizationSelect
                          newOrganization={""}
                          setNewOrganization={setSelectedOrga}
                          label="Select organization"
                          placeholder=""
                          crossColor={true}
                          setClearField={setClearField}
                          className="sm:py-4 py-[10px] pl-3 pr-[26px] w-full bg-transparent text-black/70 border text-black border-black/70 rounded-[10px] font-inter placeholder:text-black focus:outline-none placeholder:text-base placeholder:font-normal leading-5"
                        />
                      </div>
                    )} */}
                  </div>

                  <button
                    type="submit"
                    disabled={!isChanged || loading}
                    className={`font-inter sm:text-base text-[15px] text-white font-bold leading-5 w-full md:mt-5 mt-3 rounded-full sm:mb-0 mb-2  ${
                      !isChanged || loading
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

export default EditEducationModal;
