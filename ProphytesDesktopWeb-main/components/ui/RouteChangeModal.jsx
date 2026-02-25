"use client";

import EditEducationModal from "@/src/app/(dashboardLayout)/components/EditEducationModal";
import { useUserInfoQuery } from "@/src/redux/services/userApi";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";

export default function RouteChangeModal() {
  const [openEducationModal, setOpenEducationModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const pathname = usePathname();
  const { data: userInfo, isLoading: user_loading } = useUserInfoQuery();

  const prevPathRef = useRef();

  const user = userInfo?.user;
  const graduateName = user?.education?.graduateSchool?.name;
  const undergradName = user?.education?.underGraduateSchool?.name;
  const alumini = user?.education?.initiatedChapter?.isCustom;
  const initiatedChapter = user?.education?.initiatedChapter?.name;
  const currentChapter = user?.education?.currentChapter?.name;

  useEffect(() => {
    if (user_loading) return;
    if (!userInfo?.user) return;

    const isSchoolMissing = !graduateName && !undergradName;
    const isAlumniMissingChapters =
      alumini && !initiatedChapter && !currentChapter;

    if (pathname && prevPathRef.current !== pathname) {
      if (undergradName && !initiatedChapter) {
        setModalMessage("Please complete your profile information.");
        setIsOpen(true);
      } else if (isSchoolMissing && !initiatedChapter) {
        setModalMessage("Please complete your chapter information.");
        setIsOpen(true);
      }
      prevPathRef.current = pathname;
    }
  }, [
    pathname,
    user_loading,
    userInfo,
    graduateName,
    undergradName,
    alumini,
    initiatedChapter,
    currentChapter,
  ]);

  const closeModal = () => setIsOpen(false);

  const handleUpdateModal = () => {
    setOpenEducationModal(true);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
        <div className="flex flex-col items-center justify-center bg-white p-6 rounded-2xl shadow-xl w-[500px] h-[400px]">
          <h2 className="mb-4 text-xl font-semibold text-black">
            Incomplete Profile Info
          </h2>
          <p className="mb-6 text-center text-black">{modalMessage}</p>

          <div className="flex items-center gap-3">
            <button
              onClick={closeModal}
              className="px-4 py-2 text-white bg-black rounded-lg"
            >
              Close
            </button>
            <button
              onClick={handleUpdateModal}
              className="px-4 py-2 text-white bg-black rounded-lg"
            >
              Update
            </button>
          </div>
        </div>
      </div>

      <EditEducationModal
        setOpen={setOpenEducationModal}
        open={openEducationModal}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
    </>
  );
}
