"use client";

import { useEffect, useState } from "react";
import ReportSvg from "@/public/img/icon/ReportSvg";
import ReportFailedModal from "./ReportFailedModal";
import ConnectionDropdown from "./ConnectionDropdown";
import { useChapterUserVerifyMutation } from "@/src/redux/services/conversationApi";
import { ErrorAlert } from "@/src/utils/ErrorAlert";
import Note from "./Note";

export default function ReportProfileModal({
  open,
  setOpenReport,
  verificationId,
  name,
}) {
  const [connection, setConnection] = useState("");
  const [note, setNote] = useState("");
  const [openReportModal, setOpenReportModal] = useState(false);

  const [verifyUser, verifyUserRes] = useChapterUserVerifyMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (connection === "") {
      return ErrorAlert("Report reason is required to continue");
    }

    const data = {
      voteType: "REPORT",
      reportReason: connection,
      note: note,
      verificationId: verificationId,
    };
    verifyUser(data);
  };

  useEffect(() => {
    if (verifyUserRes?.isSuccess) {
      setOpenReportModal(true);
      setOpenReport(false);
    }
    if (verifyUserRes?.error) {
      ErrorAlert(
        (verifyUserRes?.error?.data?.data?.message &&
          verifyUserRes?.error?.data?.data?.message) ||
          "You have already vouched for this member"
      );
    }
  }, [verifyUserRes]);

  return (
    <>
      <div
        className={`fixed inset-0 z-50 flex items-center justify-center
          bg-[#0F0F0FB2]/70 transition-all duration-300
          ${
            open
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }
        `}
      >
        <div
          className={`lg:w-[640px] sm:w-[500px] w-[326px] mb-10 rounded-[16px] bg-[#3C4040] lg:p-8 p-5 text-white
            shadow-[0px_12px_48px_0px_#00000080]
            transform transition-all duration-300 ease-out
            ${open ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}
          `}
        >
          <div className="flex justify-center">
            <ReportSvg />
          </div>

          <h4 className="md:mt-3 mt-2 md:text-[28px] text-xl font-semibold md:leading-10 leading-[30px] text-center font-montserrat">
            Report Profile: {name}
          </h4>

          <p className="mt-2 md:text-sm text-xs md:leading-[22px] leading-[18px] text-center text-white/70">
            A report triggers an admin review. If 2
            <br className="block md:hidden" />
            reports are filed, the profile <br className="hidden md:block" /> is
            temporarily
            <br className="block md:hidden" />
            hidden from the chat.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mt-5 md:mt-8">
              <label className="block sm:text-sm text-xs text-white/70 sm:mb-[10px] mb-1.5">
                Reason for Report
              </label>

              <ConnectionDropdown
                value={connection}
                onChange={setConnection}
                label="Select Report Reason..."
                options={[
                  { label: "Name Not Organized By Chapter Members" },
                  { label: "Never pledged at this chapter/school" },
                  { label: "Suspected Impersonation/Fraud" },
                  { label: "Inappropriate Content/Spam" },
                ]}
              />
            </div>
            <Note
              note={note}
              setNote={setNote}
              label="Mandatory Details/Evidence"
            />

            <div className="flex items-center justify-end gap-5 mt-3">
              <button
                type="button"
                onClick={() => setOpenReport(false)}
                className="text-base text-white"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-8 py-3 text-base text-black bg-white rounded-full"
                disabled={verifyUserRes.isLoading}
              >
                {verifyUserRes.isLoading ? "Submiting..." : "Submit Report"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <ReportFailedModal
        openReportModal={openReportModal}
        setOpenReportModal={setOpenReportModal}
        name={name}
      />
    </>
  );
}
