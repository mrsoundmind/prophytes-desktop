"use client";
import { useEffect } from "react";

import warn from "@/public/img/icon/warning.svg";
import Image from "next/image";

import {
  useDeleteUserMutation,
  useUserInfoQuery,
} from "@/src/redux/services/userApi";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import DeleteIcon from "@/public/img/icon/DeleteIcon";
import ShareProfile from "../../components/ShareProfile";

const DeleteAccount = () => {
  const router = useRouter();
  const { data: userInfo, isLoading: user_loading } = useUserInfoQuery();

  const [fetchData, { isLoading: loading, data, error }] =
    useDeleteUserMutation();
  const firstName = userInfo?.user?.firstName || "";

  const lastName = userInfo?.user?.lastName || "";
  const id = userInfo?.user?.id || "";
  const cleanedLastName = Number(lastName.replace(/^#/, ""));

  const userName =
    cleanedLastName === id
      ? `${firstName} ${lastName}`
      : `${firstName} ${lastName} #${id}`;

  const handleDelete = async () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000",
      cancelButtonColor: "#000",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        fetchData();
        window.location.reload();
      }
    });
  };

  useEffect(() => {
    if (data) {
      Swal.fire({
        title: "Deleted!",
        text:
          data?.data?.data?.message ||
          "Your account has been successfully deleted",
        icon: "success",
      });

      localStorage.removeItem("email");
      localStorage.removeItem("onboading");
      localStorage.removeItem("phone");
      router.refresh();
    }
    if (error) {
      Swal.fire({
        title: "Error!",
        text: "Unexpected error occurred.",
        icon: "error",
      });
    }
  }, [data, error]);

  return (
    <div>
      <div className="relative flex flex-wrap items-center justify-between gap-4 ">
        <div className="">
          <h3 className="text-[36px]  text-white  font-semibold leading-[48px] font-montserrat">
            Settings
          </h3>
        </div>
        <ShareProfile />
      </div>
      <div className="sm:p-10 p-5 bg-[#141615] border border-[#383838] rounded-[16px] shadow-lg mt-6">
        <p className="text-white/70 text-sm font-normal leading-[22px] mb-3">
          Delete Account
        </p>
        <div className="flex sm:items-center items-start sm:gap-[8px] gap-3 ">
          <Image className="mt-1 sm:mt-0" src={warn} alt="warning" />
          <h3 className="text-xl  text-white font-semibold   leading-[30px] font-montserrat">
            Are you sure you want to delete your account {userName}?
          </h3>
        </div>
        <p
          className={`font-inter mt-3 mb-8 text-white/70 text-sm leading-[22px]`}
        >
          By deleting your account, all your data — including your profile,
          education records, mentorship history, and employment details — will
          be permanently erased. This action cannot be undone.
        </p>
        <button
          onClick={handleDelete}
          className={`font-inter w-full text-base font-normal leading-5 rounded-full sm:py-[18px] py-5 bg-black text-white/70  flex sm:px-4 px-5  sm:items-center justify-center sm:gap-3 gap-1 `}
        >
          <span>
            <DeleteIcon />
          </span>{" "}
          Yes, I want to permanently delete my account
        </button>
      </div>
    </div>
  );
};

export default DeleteAccount;
