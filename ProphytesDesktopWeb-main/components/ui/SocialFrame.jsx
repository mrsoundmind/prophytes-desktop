import Image from "next/image";
import user from "@/public/eric.png";
import miniLogo from "@/public/img/home/org.png";
import Badgeicon from "@/public/img/icon/Badgeicon";
import logo from "@/public/img/logo/frame-logo.png";
export default function SocialFrame() {
  return (
    <div className="w-[500px] mx-auto rounded-xl border-[3px] overflow-hidden  my-10 ">
      <div className="w-full h-[650px] relative">
        <Image src={user} alt="Profile" fill className="object-cover" />
      </div>

      <div className="relative p-5 pt-6 text-white bg-black -mt-[280px] rounded-t-xl">
        <div className="h-[140px] w-[140px] -mt-24">
          <Image src={logo} className="w-full h-full" alt="logo" />
        </div>
        <div className="flex items-start gap-3 mt-8">
          <p className="text-[28px] leading-[40px] font-semibold text-white">
            I Locked in <br /> My Legacy on <br /> Prophytes.com
          </p>

          <div className="bg-white text-black p-5 rounded-[16px] w-[220px] ml-auto">
            <div className="flex items-center justify-between border-b border-[#0000004D]/30 pb-2">
              <p className="text-2xl font-bold ">Eric Usher</p>
              <Image src={miniLogo} className="w-[50px]" alt="minoLogo" />
            </div>
            <p className="mt-3 text-2xl font-medium">Prophytes #1</p>
          </div>
        </div>

        <button className="flex gap-[10px] text-base items-center px-3 border border-[#FFFFFF80] h-[55px] rounded-full mt-5">
          <Badgeicon />
          Verified On Prophytes
        </button>
      </div>
    </div>
  );
}
