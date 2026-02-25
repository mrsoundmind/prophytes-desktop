"use client";

import { useEffect, useState } from "react";
import VouchSuccess from "./VouchSuccess";
import ConnectionDropdown from "./ConnectionDropdown";
import { useChapterUserVerifyMutation } from "@/src/redux/services/conversationApi";
import { ErrorAlert } from "@/src/utils/ErrorAlert";
import Note from "./Note";

export default function ConfirmVouchModal({
  open,
  setOpenVouch,
  verificationId,
  name,
}) {
  const [connection, setConnection] = useState("");
  const [note, setNote] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const [verifyUser, verifyUserRes] = useChapterUserVerifyMutation();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (connection === "") {
      return ErrorAlert("Connection type is required to continue");
    }

    const data = {
      voteType: "VOUCH",
      connectionType: connection,
      note: note,
      verificationId: verificationId,
    };
    verifyUser(data);
  };

  useEffect(() => {
    if (verifyUserRes?.isSuccess) {
      setOpenVouch(false);
      setOpenModal(true);
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
          bg-[#0F0F0FB2]/70  transition-all duration-300
          ${
            open
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }
        `}
      >
        <div
          className={`lg:w-[640px] sm:w-[500px] w-[326px] mb-8 rounded-[16px] bg-[#3C4040] lg:p-8 p-5 text-white
            shadow-[0px_12px_48px_0px_#00000080]
            transform transition-all duration-300 ease-out
            ${open ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0"}
          `}
        >
          <div className="flex justify-center">
            <div className="flex items-center justify-center  w-[49px]  h-[49px] bg-white rounded-full">
              <svg
                className="w-6 h-6 text-black md:w-8 md:h-8"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          <h5 className="mt-3 md:text-[28px] text-xl font-semibold md:leading-10 leading-[30px] text-center font-montserrat">
            Confirm Vouch for {name}
          </h5>

          <p className="mt-2 md:text-sm text-xs md:leading-[22px] leading-[18px] text-center text-white/70">
            Your vouch fast-tracks this profile for verification.
            <br />
            This action is logged.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mt-5 md:mt-8">
              <label className="block sm:text-sm text-xs text-white/70 sm:mb-[10px] mb-1.5">
                Optional Note of Confirmation
              </label>

              <ConnectionDropdown
                value={connection}
                onChange={setConnection}
                label="Select Connection type"
                options={[
                  {
                    value: "same_chapter",
                    label: "Same Chapter (Initiated with me)",
                  },
                  { value: "same_line", label: "Same Line" },
                  { value: "event", label: "Met/Engaged at a Chapter Event" },
                  {
                    value: "mutual",
                    label: "Known Person (Affirmed by a mutual)",
                  },
                  { value: "other", label: "Other (Explain below)" },
                ]}
              />
            </div>

            <Note
              note={note}
              setNote={setNote}
              label="Optional Note of Confirmation"
            />

            <div className="flex justify-end gap-5 mt-3">
              <button
                type="button"
                onClick={() => setOpenVouch(false)}
                className="text-base text-white"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="px-8 py-3 md:text-lg text-base sm:leading-[26px] leading-5 text-black bg-white rounded-full md:w-[320px] "
                disabled={verifyUserRes.isLoading}
              >
                {verifyUserRes.isLoading ? "Submiting..." : "Submit Vouch"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <VouchSuccess
        openModal={openModal}
        setOpenModal={setOpenModal}
        name={name}
      />
    </>
  );
}
