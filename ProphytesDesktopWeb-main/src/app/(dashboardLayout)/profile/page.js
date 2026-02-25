"use client";
import React, { useState } from "react";
import Form from "../components/Form";
import EditProfileSvg from "@/public/img/icon/EditProfileSvg";
import EditModal from "../components/EditModal";
import ShareProfile from "../components/ShareProfile";
import Link from "next/link";

const PersonalInformation = () => {
  const [open, setOpen] = useState(false);
  return (
    <section className="">
      <div className="relative flex flex-wrap items-center justify-between gap-4 ">
        <div className="flex sm:items-center items-end flex-1 lg:flex-none justify-between gap-[10px]">
          <h3 className="sm:text-[36px] text-2xl  text-white  font-semibold sm:leading-[48px] leading-9   font-montserrat">
            Personal Informations
          </h3>
          <button
            className="flex items-center justify-center h-10 gap-2 px-4 text-black bg-white rounded-full"
            onClick={() => setOpen(true)}
          >
            <EditProfileSvg /> <span>Edit</span>
          </button>
        </div>
        <ShareProfile />
      </div>
      <Form />
      <p className="text-sm leading-[22px] font-normal text-white/70 sm:mt-6 mt-5">
        Need to update information that you can’t change yourself? Email us at{" "}
        <Link
          href={`mailto:support@prophytes.com`}
          target="_blank"
          className="underline"
        >
          support@prophytes.com
        </Link>
      </p>

      <EditModal setOpen={setOpen} open={open} />
    </section>
  );
};

export default PersonalInformation;
