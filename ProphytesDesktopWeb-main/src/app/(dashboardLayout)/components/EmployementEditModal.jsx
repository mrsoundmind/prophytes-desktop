"use client";
import ButtonSkeleton from "@/components/skeleton/ButtonSkeleton";
import InputFieldSkeleton from "@/components/skeleton/InputFieldSkeleton";
import {
  useUserInfoQuery,
  useUserInfoUpdateMutation,
} from "@/src/redux/services/userApi";
import { SuccessAlert } from "@/src/utils/SuccessAlert";
import { useEffect, useRef, useState } from "react";
import { ErrorAlert } from "@/src/utils/ErrorAlert";
import EducationCustomSelect from "./EducationCustomSelect";
import InputField from "./InputField";
import CrossSvg from "@/public/img/icon/CrossSvg";
import ModalClose from "./ModalClose";

const EmployementEditModal = ({ setOpen, open }) => {
  const { data: userInfo, isLoading: user_loading } = useUserInfoQuery();
  const [status, setStatus] = useState("");
  const [formData, setFormData] = useState({
    status: "",
    companyName: "",
    position: "",
  });

  const initialFormData = useRef({ status: "", companyName: "", position: "" });
  const hasShownAlert = useRef(false);

  const [fetchData, { isLoading: loading, data, error, isSuccess }] =
    useUserInfoUpdateMutation();

  useEffect(() => {
    if (userInfo) {
      const initial = {
        status: userInfo?.user?.employment?.status || "",
        companyName: userInfo?.user?.employment?.companyName || "",
        position: userInfo?.user?.employment?.position || "",
      };
      initialFormData.current = initial;
      setFormData(initial);
      setStatus(initial.status);
    }
  }, [userInfo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (status) {
      setFormData((prevState) => ({
        ...prevState,
        status: status,
      }));
    }
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userInfo?.user?.employment?.id) {
      formData["id"] = Number(userInfo.user.employment.id);
    }

    fetchData({ employment: formData }), (hasShownAlert.current = false);
  };

  const options = [
    { name: "Student" },
    { name: "Seeking" },
    { name: "Employement" },
    { name: "Employed" },
    { name: "Entrepreneur" },
    { name: "Business" },
    { name: "Owner" },
  ];

  useEffect(() => {
    if (data?.status === 200 && !hasShownAlert.current) {
      SuccessAlert("Information Successfully Updated");
      hasShownAlert.current = true;
    }

    if (error) {
      ErrorAlert(error?.data?.issue?.message || "Failed to update information");
    }
  }, [data, error]);

  const hasChanged =
    formData.status !== initialFormData.current.status ||
    formData.companyName !== initialFormData.current.companyName ||
    formData.position !== initialFormData.current.position;
  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
    }
  }, [isSuccess]);
  return (
    <div>
      {open && (
        <div
          className="fixed max-w-[1920px] mx-auto inset-0 z-[9999] flex items-center justify-center bg-black/50"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-xl lg:p-10 p-6 xl:w-[60%] w-[80%] h-fit shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="">
              <ModalClose title="Employment Status" setOpen={setOpen} />

              {user_loading ? (
                <div>
                  <div className="grid lg:grid-cols-2 gap-[30px]">
                    {Array(4)
                      .fill(0)
                      .map((_, i) => (
                        <InputFieldSkeleton key={i} />
                      ))}
                  </div>
                  <ButtonSkeleton />
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid lg:grid-cols-2 xs:gap-[30px] gap-4">
                    <EducationCustomSelect
                      label="Status"
                      defaultValue={status}
                      options={options}
                      optionLabelKey="name"
                      placeholder=""
                      onChange={(val) => setStatus(val)}
                    />
                    <InputField
                      label="Company Name"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder=""
                    />
                  </div>

                  <div className="xs:mt-[30px] mt-4">
                    <InputField
                      label="Position"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                      placeholder=""
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading || !hasChanged}
                    className={`font-inter sm:text-base text-[15px] text-white font-bold leading-5 w-full mt-8 sm:mb-0 mb-8 rounded-full ${
                      loading || !hasChanged
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-black"
                    } xs:py-5 py-[14px] transition-colors`}
                  >
                    {loading ? "Saving..." : "Save"}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployementEditModal;
