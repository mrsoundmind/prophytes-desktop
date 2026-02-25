"use client";
import ButtonSkeleton from "@/components/skeleton/ButtonSkeleton";
import InputFieldSkeleton from "@/components/skeleton/InputFieldSkeleton";
import {
  useUserInfoQuery,
  useUserInfoUpdateMutation,
} from "@/src/redux/services/userApi";
import { ErrorAlert } from "@/src/utils/ErrorAlert";
import { SuccessAlert } from "@/src/utils/SuccessAlert";
import { useEffect, useRef, useState } from "react";
import EducationCustomSelect from "./EducationCustomSelect";
import CrossSvg from "@/public/img/icon/CrossSvg";
import ModalClose from "./ModalClose";

const MentorEditModal = ({ setOpen, open }) => {
  const { data: userInfo, isLoading: user_loading } = useUserInfoQuery();
  const [status, setStatus] = useState("");
  const [formData, setFormData] = useState({
    status: "",
    details: "",
  });

  const initialFormData = useRef({ status: "", details: "" });
  const hasShownAlert = useRef(false);

  const [fetchData, { isLoading: loading, data, error, isSuccess }] =
    useUserInfoUpdateMutation();

  useEffect(() => {
    if (userInfo) {
      const initial = {
        status: userInfo?.user?.mentorship?.status || "",
        details: userInfo?.user?.mentorship?.details || "",
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

    if (userInfo?.user?.mentorship?.id) {
      formData["id"] = Number(userInfo.user.mentorship.id);
    }

    fetchData({ mentorship: formData });
    hasShownAlert.current = false;
  };
  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
    }
  }, [isSuccess]);

  const options = [
    { name: "Mentor" },
    { name: "Mentee" },
    { name: "Seeking MentorShip" },
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
    formData.details !== initialFormData.current.details;

  return (
    <>
      {open && (
        <div
          className="fixed max-w-[1920px] mx-auto inset-0 z-[9999] flex items-center justify-center bg-black/50"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-xl 2xl:p-10 p-6 xl:w-[60%] w-[80%] h-fit shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <ModalClose title="Mentorship" setOpen={setOpen} />

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
                  <div>
                    <EducationCustomSelect
                      label="Status"
                      defaultValue={status}
                      options={options}
                      optionLabelKey="name"
                      placeholder=""
                      onChange={(val) => setStatus(val)}
                    />
                  </div>

                  <div className="xs:mt-[30px] mt-4">
                    <label className="block sm:mb-[9px] mb-1 text-base text-black font-normal leading-6">
                      Details
                    </label>
                    <textarea
                      placeholder=""
                      name="details"
                      value={formData.details}
                      onChange={handleChange}
                      className={`appearance-none sm:h-[160px] h-[100px] px-5 xs:pt-5 pt-3 w-full mb-2  text-black/70 border border-black/70 rounded-[10px] font-inter focus:outline-none placeholder:text-white placeholder:text-base placeholder:font-normal`}
                    ></textarea>
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
    </>
  );
};

export default MentorEditModal;
