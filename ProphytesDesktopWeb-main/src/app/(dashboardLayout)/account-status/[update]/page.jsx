/* eslint-disable react/no-unescaped-entities */
"use client";
import UploadCard from "@/src/app/(onboardLayout)/components/UploadCard";

import {
  useStateApprovedMutation,
  useUploadImageMutation,
} from "@/src/redux/services/upload.service";
import { ErrorAlert } from "@/src/utils/ErrorAlert";
import { SuccessAlert } from "@/src/utils/SuccessAlert";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function StatusUpdate() {
  const [stateApprovedImage, setStateApprovedImage] = useState(null);
  const [membershipImage, setMembershipImage] = useState(null);
  const [text, setText] = useState("");
  const router = useRouter();
  const [fetchData, { isLoading: loading, data, error }] =
    useUploadImageMutation();

  const [
    statusFetchData,
    {
      isLoading: statusLoading,
      data: statusData,
      error: statusError,
      isSuccess: success,
    },
  ] = useStateApprovedMutation();

  const [response1, setResponse1] = useState(null);
  const [response2, setResponse2] = useState(null);
  const handleSubmit = async () => {
    if (
      !stateApprovedImage
      // || !membershipImage
    ) {
      ErrorAlert("Please upload image");
      return;
    }

    const validTypes = ["image/jpeg", "image/png", "image/jpg"];
    const maxSizeMB = 5;
    const maxSizeBytes = maxSizeMB * 1024 * 1024;

    const validateImage = (file, fieldName) => {
      if (!validTypes.includes(file.type)) {
        ErrorAlert(`${fieldName} must be JPG, JPEG, or PNG`);
        return false;
      }
      if (file.size > maxSizeBytes) {
        ErrorAlert(`${fieldName} must be under ${maxSizeMB}MB`);
        return false;
      }
      return true;
    };
    if (
      !validateImage(stateApprovedImage, "State Approved Image")
      // || !validateImage(membershipImage, "Membership Image")
    ) {
      return;
    }

    const results = [];

    // Upload stateApprovedImage if present
    if (stateApprovedImage) {
      const formData = new FormData();
      formData.append("file", stateApprovedImage);

      const response = await fetchData(formData);
      setResponse1(response);
      results.push({ field: "stateApprovedImage", response1 });
    }

    // Upload membershipImage if present
    // if (membershipImage) {
    //   const formData = new FormData();
    //   formData.append("file", membershipImage);

    //   const response = await fetchData(formData);
    //   setResponse2(response);
    //   results.push({ field: "membershipImage", response2 });
    // }
  };
  useEffect(() => {
    if (
      response1?.data?.status === 200
      // && response2?.data?.status === 200
    ) {
      statusFetchData({
        stateApprovedImageId: response1?.data?.message?.data,
        // membershipImageId: response2?.data?.message?.data,
        // membershipId: text,
      });
    }
    if (error && !loading) {
      ErrorAlert("Failed to upload images");
    }
  }, [response1, router, loading]);

  useEffect(() => {
    if (statusData) {
      SuccessAlert("Images uploaded successfully");
      window.location.href = "/account-status";
    }
    if (statusError && !statusLoading) {
      ErrorAlert("Failed to upload images");
    }
  }, [statusData, statusError, statusLoading]);

  return (
    <section className="bg-black h-full py-[30px] pb-20  flex items-center justify-center">
      <div className="">
        <div className="w-full px-4 text-center text-white rounded-lg sm:px-0 md:max-w-md lg:max-w-lg xl:max-w-2xl">
          <h3 className="lg:text-[28px] md:text-[22px] xs:text-xl text-[19px]  font-bold lg:leading-10 leading-8">
            Submit Your Proof. Claim Your Legacy.
          </h3>
          <div className="flex flex-col justify-center ">
            <div className="flex flex-col gap-2 my-4 sm:gap-5 md:my-10">
              <p className="text-[12px] font-bold text-white md:text-base max-w-[700px]">
                To protect the legacy of our organizations and keep the
                directory 100% authentic, all members must complete
                verification.
              </p>
              <p className="text-[12px] font-bold text-white md:text-base max-w-[700px] mt-2">
                Once approved, you’ll receive your Prophytes Number — your
                unique digital ID to unlock access, build connections, and be
                counted in future activations.
              </p>
              <p className="mt-2 text-xs text-white sm:mt-0 md:text-sm">
                Please upload:
              </p>
              <ul className="text-xs text-white md:text-sm">
                <li className="mb-1 sm:mb-2">
                  • ⁠A government-issued photo ID
                </li>
                <li className="mb-1 sm:mb-2">
                  •⁠ An official org membership card or certificate
                </li>
                <li>•⁠ Both documents must be clear and readable</li>
              </ul>
            </div>
            <div className="flex flex-col justify-center gap-1 mt-3 sm:mt-0">
              <div className="flex flex-row justify-center gap-6 sm:flex-col sm:gap-10 lg:flex-row">
                <UploadCard
                  label="State Approved ID"
                  image={stateApprovedImage}
                  setImage={setStateApprovedImage}
                />
                {/* <UploadCard
                  label="Membership ID"
                  image={membershipImage}
                  setImage={setMembershipImage}
                /> */}
              </div>

              {/* <input
                className={`xs:py-5 py-[14px] px-5 w-full sm:mt-5 mt-[14px]   bg-white text-black rounded-[10px] font-inter placeholder:text-black focus:outline-none placeholder:text-base placeholder:font-normal leading-5`}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter your membership ID"
                type="text"
              /> */}

              <button
                disabled={loading}
                className="w-full px-6 py-3 mt-[14px] font-bold text-black transition rounded-full sm:py-4 sm:mt-6 bg-primary hover:bg-primary/80"
                onClick={handleSubmit}
              >
                {loading || statusLoading ? "Uploading..." : "Submit"}
              </button>
              <p className="mt-[14px] text-[13px] text-center text-white md:text-sm sm:mt-5">
                You’ll receive an email once your verification is approved.
              </p>
            </div>
          </div>

          {/* Status Buttons */}
        </div>
      </div>
    </section>
  );
}
