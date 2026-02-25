"use client";

import ReportSvg from "@/public/img/icon/ReportSvg";
import SuccessNote from "./SuccessNote";

export default function ReportFailedModal({
  openReportModal,
  setOpenReportModal,
  name,
}) {
  return (
    <>
      {openReportModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F0F0FB2]/70"
          onClick={() => setOpenReportModal(false)}
        >
          <div
            className="lg:w-[640px] sm:w-[500px] w-[326px] mb-10 rounded-[16px] bg-[#3C4040] lg:p-8 p-5 text-white shadow-[0px_12px_48px_0px_#00000080]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center">
              <ReportSvg />
            </div>

            <SuccessNote
              setOpenModal={setOpenReportModal}
              title="Report Filed"
              subTitleOne={
                <>
                  Your report against {name} has been logged
                  <br className="hidden md:block" />
                  for admin review.
                </>
              }
              subTitleTwo={
                <>
                  Security and verification integrity are our priority. We will
                  follow up
                  <br className="hidden md:block" /> shortly.
                </>
              }
            />
          </div>
        </div>
      )}
    </>
  );
}
