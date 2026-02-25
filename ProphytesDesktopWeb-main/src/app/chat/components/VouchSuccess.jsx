"use client";
import { useRouter } from "next/navigation";
import SuccessNote from "./SuccessNote";

export default function VouchSuccess({ openModal, setOpenModal, name }) {
  if (!openModal) return null;

  const router = useRouter();

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F0F0FB2]/70"
      onClick={() => setOpenModal(false)}
    >
      <div
        className="lg:w-[640px] sm:w-[500px] w-[326px] mb-10 rounded-[16px] bg-[#3C4040] lg:p-8 p-5 text-white shadow-[0px_12px_48px_0px_#00000080]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-center">
          <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full">
            <svg
              className="w-6 h-6 text-black"
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
        <SuccessNote
          setOpenModal={setOpenModal}
          title="Vouch Submitted"
          subTitleOne={
            <>
              Your confirmation for {name} has been
              <br className="hidden md:block" />
              successfully logged.
            </>
          }
          subTitleTwo={
            <>
              The profile is now on fast-track review. Thank you{" "}
              <br className="hidden md:block" /> for your support!
            </>
          }
        />
      </div>
    </div>
  );
}
