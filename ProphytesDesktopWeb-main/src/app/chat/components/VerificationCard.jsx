"use client";

import BlackCircle from "@/public/img/icon/BlackCircle";
import CloseCircle from "@/public/img/icon/CloseCircle";
import { organizations } from "@/src/configs/constants";
import { useGetChapterVerificationQuery } from "@/src/redux/services/conversationApi";
import { vouchReport } from "@/src/redux/slices/messageSlice";
import { updateUserStatus } from "@/src/redux/slices/userSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConfirmVouchModal from "./ConfirmVouchModal";
import ReportProfileModal from "./ReportProfileModal";
import { VerificationSkeleton } from "@/components/skeleton/VerificationSkeleton";

export default function VerificationCard({ content, metadata }) {
  const [openVouch, setOpenVouch] = useState(false);
  const dispatch = useDispatch();
  const verificationIds = useSelector(
    (state) => state.messages.vouchReport.verificationId
  );
  const [openReport, setOpenReport] = useState(false);
  const [verificationId, setVerificationId] = useState();
  const { data, refetch, isLoading } = useGetChapterVerificationQuery(
    {
      id: content?.verificationId,
    },
    { skip: !content?.verificationId }
  );

  useEffect(() => {
    console.log({ verificationIds, content });
    if (Number(verificationIds) == Number(content?.verificationId)) {
      dispatch(vouchReport({ verificationId: null }));
      dispatch(updateUserStatus(null));
      refetch();
    }
  }, [verificationIds]);

  const orgColor = organizations.find(
    (org) => org.id === content?.education?.organizationId
  )?.color;
  const voteType = data?.data?.verification?.userVote?.voteType;
  const hasVote = voteType === "VOUCH" || voteType === "REPORT";

  if (isLoading) {
    return <VerificationSkeleton />;
  }

  // console.log(data?.data?.verification?.status);
  return (
    <>
      {data?.data?.verification?.status == "VERIFIED" ? (
        ""
      ) : (
        <>
          <div className="md:w-full w-[358px] mt-7">
            <div className="flex items-end justify-between bg-[#3C4040] px-5 py-3 rounded-t-[20px] border-b border-[#333333]">
              <div className="flex-none gap-1 md:flex">
                <p
                  className="text-sm font-medium leading-6 font-inter text-[#F79400] "
                  // style={{ color: `#${orgColor}` }}
                >
                  System Message:
                </p>
                <p className="text-sm text-[#A2A2A8] font-medium font-inter leading-6  ">
                  Verification Profile
                </p>
              </div>
              <button
                className="text-sm font-semibold leading-[22px] text-[#000000] bg-[#F79400] py-[3px] px-[9px] rounded-full  uppercase"
                // style={{ backgroundColor: `#${orgColor}` }}
              >
                {data?.data?.verification?.status}
              </button>
            </div>
            <div className="bg-[#3C4040] px-4 pt-4 rounded-b-[16px]">
              <div className="space-y-2 text-sm text-gray-300">
                <div className="min-h-6">
                  <p className="text-sm font-medium leading-6 text-white">
                    <span className="mr-2 w-[118px] text-sm font-normal leading-6 text-white/70">
                      Unverified User:
                    </span>
                    {content?.userName}
                  </p>
                </div>
                {content?.education?.underGraduateSchool?.name && (
                  <div className="min-h-6">
                    <p className="text-sm font-medium leading-6 text-white">
                      <span className="w-[118px] inline-block text-sm font-normal leading-6 text-white/70">
                        School:
                      </span>
                      {content?.education?.underGraduateSchool?.name
                        ? content?.education?.underGraduateSchool?.name
                        : content?.education?.graduateSchool}
                    </p>
                  </div>
                )}

                <div className="min-h-6">
                  <p className="text-sm font-medium leading-6 text-white">
                    <span className="w-[118px] inline-block text-sm font-normal leading-6 text-white/70">
                      Chapter:
                    </span>
                    {content?.chapterName}
                  </p>
                </div>

                <div className="min-h-6">
                  <p className="text-sm font-medium leading-6 text-white">
                    <span className="w-[118px] inline-block text-sm font-normal leading-6 text-white/70">
                      Crossing Year:
                    </span>
                    {content?.education?.seasonMemberSince}{" "}
                    {content?.education?.yearMemberSince}
                  </p>
                </div>
                {/* <div className="min-h-6">
              <p className="text-base font-medium leading-6 text-white">
                <span className="mr-3 w-[118px] inline-block text-base font-normal leading-6 text-white/70">
                  Line:
                </span>
                The Lone Wolf (#1)
              </p>
            </div> */}
              </div>

              <div className="bg-[#272727] rounded-[12px] py-[14px] px-4 my-4 ">
                <p className="text-sm font-normal leading-6 text-white/70">
                  “Hey everyone, just submitting my info for verification.
                  Hoping to connect <br className="hidden sm:block" /> with
                  local chapter members!”
                </p>
              </div>
              {data?.data?.verification?.metadata?.isResolved ? (
                <p
                  className={`text-sm font-medium text-center leading-6 text-white/70 rounded-[12px] py-[14px] px-4 my-4 
                bg-[#272727]
              `}
                >
                  This user has been verified by{" "}
                  {data?.data?.verification?.metadata?.resolvedBy}
                </p>
              ) : (
                <p
                  className={`text-sm font-medium text-center leading-6 text-white rounded-[12px] py-[14px] px-4 my-4 ${
                    hasVote ? "bg-[#272727]" : ""
                  }`}
                >
                  {voteType === "VOUCH"
                    ? "Your vouch for this user has already been submitted."
                    : voteType === "REPORT"
                    ? "Your report for this user has already been submitted."
                    : ""}
                </p>
              )}

              {hasVote || data?.data?.verification?.metadata?.isResolved ? (
                <div className="pt-1"></div>
              ) : (
                <div className="grid grid-cols-2 gap-3 pb-3">
                  <div>
                    <button
                      onClick={() => {
                        setOpenVouch(true);
                        setVerificationId(content.verificationId);
                      }}
                      className="flex items-center justify-center w-full h-12 gap-[6px] font-medium text-black bg-white rounded-full shadow-lg"
                    >
                      <BlackCircle className="text-black" /> Vouch
                    </button>
                    <p className="flex gap-[6px] items-center justify-center mt-5 text-base font-medium leading-6 text-white">
                      <BlackCircle className="text-white" />{" "}
                      {data?.data?.verification?.vouchCount} Vouch
                    </p>
                  </div>

                  <div>
                    <button
                      onClick={() => {
                        setOpenReport(true),
                          setVerificationId(content.verificationId);
                      }}
                      className="flex items-center justify-center w-full  gap-[6px] h-12   bg-[#000000] rounded-full text-[#EA4335] font-medium leading-5 "
                    >
                      <CloseCircle /> Report
                    </button>
                    <p className="flex gap-[6px] items-center justify-center mt-5 text-base font-medium leading-6 text-white">
                      <CloseCircle /> {data?.data?.verification?.reportCount}{" "}
                      Report
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <ConfirmVouchModal
            open={openVouch}
            setOpenVouch={setOpenVouch}
            verificationId={verificationId}
            name={content?.userName}
          />
          <ReportProfileModal
            open={openReport}
            setOpenReport={setOpenReport}
            verificationId={verificationId}
            name={content?.userName}
          />
        </>
      )}
    </>
  );
}
