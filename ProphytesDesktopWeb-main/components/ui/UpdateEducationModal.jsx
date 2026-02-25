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
import { ErrorAlert } from "@/src/utils/ErrorAlert";
import ChpaterSelector from "@/src/app/(dashboardLayout)/components/ChpaterSelector";
import GraduationSchoolSelector from "@/src/app/(dashboardLayout)/components/GraduationSchoolSelector";
import InputField from "@/src/app/(dashboardLayout)/components/InputField";
import ModalClose from "@/src/app/(dashboardLayout)/components/ModalClose";
import EducationCustomSelect from "@/src/app/(dashboardLayout)/components/EducationCustomSelect";
import CrossSvg from "@/public/img/icon/CrossSvg";

const UpdateEducationModal = ({
  setOpenEducationModal,
  openEducationModal,
}) => {
  const [underGradSchool, setUnderGradSchool] = useState("");
  const [gradSchool, setGradSchool] = useState("");

  const [selectChpater, setSelectChpater] = useState("");
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
        initiatedChapter: userInfo?.user?.education?.initiatedChapter || "",
        currentChapter: userInfo?.user?.education?.currentChapter || "",
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
      setFormData((prev) => ({ ...prev, currentChapter: selectChpater }));
    }
  }, [selectChpater]);

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
      setOpenEducationModal(false);
    }
  }, [isSuccess]);

  const options = [{ name: "Student" }, { name: "Alumni" }];

  return (
    <div>
      {openEducationModal && (
        <div
          className="fixed max-w-[1920px] mx-auto inset-0 z-[9999] flex items-center justify-center bg-black/50 overflow-hidden"
          onClick={() => setOpenEducationModal(false)}
        >
          <div
            className="bg-white rounded-xl 2xl:px-10 2xl:py-10 sm:px-6 px-0 py-2 xl:w-[60%] w-[85%] h-fit shadow-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 xxs:p-6 sm:p-0">
              <div>
                <div className="flex justify-between">
                  <h3 className="lg:text-[28px] md:text-[22px] xs:text-xl text-[19px] font-bold lg:leading-10 leading-8 sm:mb-[30px] mb-[5px] font-montserrat text-black">
                    hello
                  </h3>
                  <button
                    onClick={() => setOpenEducationModal(false)}
                    className="grid bg-black rounded-full size-9 place-content-center"
                  >
                    <CrossSvg />
                  </button>
                </div>
              </div>

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
                    {/* <InputField
                      label="Undergraduate School"
                      name="underGraduateSchool"
                      value={formData.underGraduateSchool}
                      onChange={handleChange}
                      placeholder="N/A"
                      isEdit={true}
                    /> */}
                    <GraduationSchoolSelector
                      label="Undergraduate School"
                      gradSchool={formData.underGraduateSchool}
                      setGradSchool={setUnderGradSchool}
                    />

                    <GraduationSchoolSelector
                      label="Graduation School"
                      gradSchool={formData.graduateSchoolName}
                      setGradSchool={setGradSchool}
                    />

                    <EducationCustomSelect
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
                    />

                    <InputField
                      label="Membership Status"
                      name="seasonMemberSince"
                      value={formData.seasonMemberSince}
                      onChange={handleChange}
                      placeholder="N/A"
                      isEdit={true}
                    />
                    <InputField
                      label="Member Since"
                      name="yearMemberSince"
                      value={formData.yearMemberSince}
                      onChange={handleChange}
                      placeholder="N/A"
                      isEdit={true}
                    />
                    <InputField
                      label="Initiated Chapter"
                      name="initiatedChapter"
                      value={formData.initiatedChapter}
                      onChange={handleChange}
                      placeholder=""
                      isEdit={true}
                    />
                  </div>
                  <div className="mt-2 sm:mt-5">
                    <ChpaterSelector
                      label="Current Chapter"
                      selectChpater={formData?.currentChapter}
                      setSelectChpater={setSelectChpater}
                    />
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

export default UpdateEducationModal;
