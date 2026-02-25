import React from "react";
import Image from "next/image";

const OrganizationContent = ({ item }) => {
  return (
    <div
      className={`px-[26px] rounded-[10px] cursor-pointer bg-[linear-gradient(184.59deg,_rgba(255,255,255,0.33)_4.27%,_rgba(128,128,128,0)_94.31%)]  transition-all duration-500 ease-out   mb-[75px] ${
        item.id == isActive ? "bg-white" : ""
      }`}
      style={{ border: `1px solid #${item.color}` }}
      onClick={() => handleOrganaization(item)}
    >
      <div
        className={`-mt-14 grid place-content-center size-[158px]  rounded-full`}
        style={{ backgroundColor: `#${item.color}` }}
      >
        <Image
          className="mt-5"
          src={item.defaultAvatar}
          width={119}
          height={97}
          alt="organaization"
        />
      </div>
      <div className="my-[10px] w-full flex justify-center">
        <Image src={item.miniLogo} width={92} height={47} alt="icon" />
      </div>
    </div>
  );
};

export default OrganizationContent;
