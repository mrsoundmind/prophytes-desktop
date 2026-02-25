import React from "react";
import Image from "next/image";
import Link from "next/link";

import avatar from "@/public/img/home/avatar.png";
import icon from "@/public/img/icon/divine.svg";
import alumni from "@/public/img/onboading/alumni.png";
import student from "@/public/img/onboading/student.png";

const SignUpFrom = () => {
  return (
    <section className="bg-black  md:py-[100px] pt-20">
      <Image className="block m-auto max-h-[678px]" src={avatar} alt="avatar" />
      <div className="mt-[52px] bg-secondary max-w-[1160px] rounded-[10px] pt-10 pb-[50px] block m-auto">
        <div className="text-center">
          <Image className="block m-auto" src={icon} alt="icon" />
          <h3 className="text-[48px] text-black font-bold leading-[60px]">
            Divine Nine{" "}
          </h3>
        </div>
      </div>
      <h3 className="text-[48px] text-white text-center font-bold leading-[60px] uppercase py-[60px]">
        or
      </h3>
      <div className="max-w-[1160px]  py-[60px] block m-auto bg-[linear-gradient(215.79deg,rgba(230,230,230,0)_-7.27%,rgba(128,128,128,0.35)_110.29%)] rounded-[20px] border-2 border-solid border-primary">
        <div className="flex flex-col items-center">
          <div className="flex gap-10">
            <button className="size-[110px] text-[48px] text-white font-bold leading-[80px] bg-black">
              H
            </button>
            <button className="size-[110px] text-[48px] text-white font-bold leading-[80px] bg-black">
              B
            </button>
            <button className="size-[110px] text-[48px] text-white font-bold leading-[80px] bg-black">
              C
            </button>
            <button className="size-[110px] text-[48px] text-white font-bold leading-[80px] bg-black">
              U
            </button>
          </div>
          <p className="pt-[30px] pb-[38px] text-[28px] text-[#333333] leading-[40px]">
            Historically Black Colleges & Universities{" "}
          </p>
          <div className="flex gap-10">
            <Link
              href="/"
              className="flex flex-col justify-center items-center size-[262px] bg-white rounded-[10px]  shadow-[0px_0px_60px_0px_#0000000D]"
            >
              <Image src={student} alt="student" />
              <span className="text-[28px] text-black font-bold leading-[40px] mt-[10px]">
                Student
              </span>
            </Link>
            <Link
              href="/"
              className="flex flex-col justify-center items-center size-[262px] bg-white rounded-[10px]  shadow-[0px_0px_60px_0px_#0000000D]"
            >
              <Image src={alumni} alt="alumni" />
              <span className="text-[28px] text-black font-bold leading-[40px] mt-[10px]">
                Alumni
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUpFrom;
