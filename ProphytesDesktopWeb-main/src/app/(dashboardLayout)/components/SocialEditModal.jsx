"use client";
import React, { useEffect, useRef, useState } from "react";
import ModalClose from "./ModalClose";
import {
  useUserInfoQuery,
  useUserInfoUpdateMutation,
} from "@/src/redux/services/userApi";
import ButtonSkeleton from "@/components/skeleton/ButtonSkeleton";
import InputFieldSkeleton from "@/components/skeleton/InputFieldSkeleton";
import SocialInput from "./SocialInput";
import { ErrorAlert } from "@/src/utils/ErrorAlert";
import { SuccessAlert } from "@/src/utils/SuccessAlert";

const SocialEditModal = ({ open, setOpen }) => {
  const [formData, setFormData] = useState({
    facebook: "",
    twitter: "",
    linkedIn: "",
    instagram: "",
    tiktok: "",
  });

  const hasShownAlert = useRef(false);

  const { data: userInfo, isLoading: user_loading } = useUserInfoQuery();
  const [fetchData, { isLoading: loading, data, error, isSuccess }] =
    useUserInfoUpdateMutation();
  const user = userInfo?.user?.link && userInfo?.user?.link;
  const initialFormData = useRef({
    facebook: "",
    twitter: "",
    linkedIn: "",
    instagram: "",
    tiktok: "",
  });
  useEffect(() => {
    if (userInfo) {
      const initial = {
        facebook: user?.facebook || "",
        twitter: user?.twitter || "",
        website: user?.website || "",
        instagram: user?.instagram || "",
        linkedIn: user?.linkedIn || "",
        tiktok: user?.tiktok || "",
      };
      initialFormData.current = initial;
      setFormData(initial);
    }
  }, [userInfo]);

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

    const changedFields = { ...formData };

    const isValidUrl = (string) => {
      if (!string) return true;
      try {
        new URL(string);
        return true;
      } catch (_) {
        return false;
      }
    };

    const invalidFields = Object.entries(changedFields).filter(
      ([_, value]) => value && !isValidUrl(value)
    );

    if (invalidFields.length > 0) {
      ErrorAlert("Please enter valid URLs!");
      return;
    }

    fetchData({ links: changedFields });
    hasShownAlert.current = false;
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
    }
  }, [isSuccess]);

  return (
    <div>
      {open && (
        <div
          className="fixed max-w-[1920px] mx-auto inset-0 z-[9999] flex items-center justify-center bg-black/50 overflow-hidden"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-xl 2xl:p-10 sm:p-6 p-4 xl:w-[60%] w-[80%] h-fit shadow-lg overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <ModalClose title="Social Media" setOpen={setOpen} />

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
                  <div className="">
                    <div className="grid gap-1 sm:gap-4 md:grid-cols-2">
                      <SocialInput
                        label="Facebook"
                        name="facebook"
                        value={formData.facebook}
                        onChange={handleChange}
                        placeholder="URL"
                      />
                      <SocialInput
                        label="Twitter"
                        name="twitter"
                        value={formData.twitter}
                        onChange={handleChange}
                        placeholder="URL"
                      />
                      <SocialInput
                        label="Instagram"
                        name="instagram"
                        value={formData.instagram}
                        onChange={handleChange}
                        placeholder="URL"
                      />
                      <SocialInput
                        label="Linkedin"
                        name="linkedIn"
                        value={formData.linkedIn}
                        onChange={handleChange}
                        placeholder="URL"
                      />
                      <SocialInput
                        label="Website"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        placeholder="URL"
                      />
                      <SocialInput
                        label="Tiktok"
                        name="tiktok"
                        value={formData.tiktok}
                        onChange={handleChange}
                        placeholder="URL"
                      />
                    </div>
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
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SocialEditModal;
