"use client";
import {
  useStateApprovedMutation,
  useUploadImageMutation,
} from "@/src/redux/services/upload.service";
import { setOnboardPage } from "@/src/redux/slices/onboardingSlice";
import { ErrorAlert } from "@/src/utils/ErrorAlert";
import { SaveOnboadingData } from "@/src/utils/SaveOnboadingData";
import { SuccessAlert } from "@/src/utils/SuccessAlert";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import UploadCard from "./UploadCard";
import MobileStapper from "./MobileStapper";

const UploadSection = () => {
  const [stateApprovedImage, setStateApprovedImage] = useState(null);
  const [text, setText] = useState("");
  const [membershipImage, setMembershipImage] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [haveValue, setHaveValue] = useState(true);
  const dispatch = useDispatch();

  const handlePrev = () => {
    dispatch(setOnboardPage("verify-code"));
  };
  // const [fetchToken, { isLoading, data: tokenData }] = useSetTokenMutation();

  // const token = localStorage.getItem("token");

  const handleNext = () => {
    // dispatch(setOnboardPage("proof-membership"));
    dispatch(setOnboardPage("unlock chapter"));
  };
  const router = useRouter();
  const [fetchData, { isLoading: loading, data, error }] =
    useUploadImageMutation();

  const [
    statusFetchData,
    { isLoading: statusLoading, data: statusData, error: statusError },
  ] = useStateApprovedMutation();

  const [response1, setResponse1] = useState(null);
  const [response2, setResponse2] = useState(null);

  const handleSubmit = async () => {
    if (
      !stateApprovedImage
      //  ||membershipImage
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

    // Validate both images
    if (
      !validateImage(stateApprovedImage, "State Approved Image")
      // !validateImage(membershipImage, "Membership Image")
    ) {
      return;
    }

    const results = [];

    // Upload stateApprovedImage
    const formData1 = new FormData();
    formData1.append("file", stateApprovedImage);

    const response1 = await fetchData(formData1);

    setResponse1(response1);
    results.push({ field: "stateApprovedImage", response1 });

    // Upload membershipImage
    // const formData2 = new FormData();
    // formData2.append("file", membershipImage);

    // const response2 = await fetchData(formData2);

    // setResponse2(response2);
    // results.push({ field: "membershipImage", response2 });
  };

  useEffect(() => {
    if (
      response1?.data?.status === 200
      // && response2?.data?.status === 200
    ) {
      const status = async () => {
        await statusFetchData({
          stateApprovedImageId: response1?.data?.message?.data,
          // membershipImageId: response2?.data?.message?.data,
          // membershipId: text,
        });
      };
      status();
    }
    if (
      response1?.error &&
      // || response2?.error
      !loading
    ) {
      ErrorAlert("Failed to upload images");
    }
  }, [response1, router, loading]);

  // useEffect(() => {
  //   if (token) {
  //     fetchToken({ token });
  //   }
  // }, [token]);

  useEffect(() => {
    if (statusData) {
      SuccessAlert("Images uploaded successfully");
      SaveOnboadingData({
        stateApprovedId: true,
      });
      handleNext();
    }
    if (statusError) {
      ErrorAlert("Failed to upload images");
    }
  }, [statusData, statusError]);

  // }, [statusData, statusLoading, router]);

  const handleSkip = () => {
    SaveOnboadingData({
      stateApprovedId: true,
    });
    handleNext();
  };

  return (
    <div className="2xl:p-12 sm:p-5 p-0 bg-black rounded-[8px]">
      <MobileStapper disabled={false} haveValue={haveValue} />
      <div className="">
        <h3 className="mb-3 2xl:mb-6 font-montserrat">Claim Your Legacy.</h3>

        <ul className="sm:text-base text-sm font-normal sm:leading-6 leading-[22px] text-[#A2A2A8]">
          <li className="flex items-start gap-1 mb-1 sm:mb-3">
            <span className="text-lg text-white ">*</span> To protect the legacy
            of our organizations and keep the directory 100% authentic, all
            members must complete verification.
          </li>
          <li className="flex items-start gap-1 mb-1 sm:mb-3">
            <span className="text-lg text-white ">*</span> Once approved,
            you&apos;ll receive your Prophytes Number, your unique digital ID to
            unlock access, build connections, and be counted in future
            activations.
          </li>
        </ul>

        <h5 className="2xl:mt-5 mt-3 text-xl font-semibold leading-[30px] text-white mb-3">
          Please upload:
        </h5>

        <p className="sm:text-base text-sm sm:leading-6 leading-[22px]  font-normal text-[#A2A2A8]">
          A government issued photo ID
        </p>
      </div>
      <div className="bg-black  2xl:mt-4 mt-3 2xl:p-12 p-5 rounded-[16px] border border-[#383838]">
        <div className="">
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
                    onChange={(e) => setText(e.target.value)}
                    className={`xs:py-5 py-[14px] px-5 w-full sm:mt-5 mt-[14px]   bg-black text-white border border-[#383838] rounded-[10px] font-inter placeholder:text-white focus:outline-none placeholder:text-base placeholder:font-normal leading-5`}
                    placeholder="Enter your membership ID"
                    type="text"
                  /> */}

        <button
          disabled={loading}
          className="w-full px-6 py-2 mt-[14px] sm:text-lg text-base font-medium sm:leading-[26px] leading-6 text-black font-inter transition rounded-full sm:py-5 2xl:mt-8 bg-primary hover:bg-primary/80 "
          onClick={handleSubmit}
        >
          {loading || statusLoading ? "Uploading..." : "Submit"}
        </button>
      </div>
      <div className="flex items-center justify-end mt-5 sm:justify-between sm:mt-10">
        <div className="hidden sm:block">
          {/* <NextPreviousButton
            backFn={handlePrev}
            previous=" "
            next=""
            NextButtonDisabled={disabled}
          /> */}
        </div>
        <div className="text-lg font-medium leading-7 text-center text-white/70">
          <button
            className="cursor-pointer font-montserrat"
            onClick={handleSkip}
          >
            skip
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadSection;
