import React from "react";

const UserInformation = ({ label, title, marginBottom,className='' }) => {
  return (
    <div
      className={`${marginBottom ? "" : "sm:mb-0 mb-[30px]"}`}
      style={{ marginBottom: marginBottom }}
    >
      <p className="text-sm font-normal leading-[22px] text-white/70 lg:mb-3 mb-[6px]">
        {label}
      </p>
      <h4 className={`text-xl font-semibold leading-[30px] break-words break-all whitespace-normal text-white font-montserrat ${className}`}>
        {title ? title : "N/A"}
      </h4>
    </div>
  );
};

export default UserInformation;
