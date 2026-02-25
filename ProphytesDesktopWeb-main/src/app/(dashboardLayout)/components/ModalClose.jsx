import CrossSvg from "@/public/img/icon/CrossSvg";
import React from "react";

const ModalClose = ({ title, setOpen }) => {
  return (
    <div className="flex justify-between">
      <h3 className="lg:text-[28px] md:text-[22px] xs:text-xl text-[19px] font-bold lg:leading-10 leading-8 sm:mb-[30px] mb-[5px] font-montserrat text-black">
        {title}
      </h3>
      <button
        onClick={() => setOpen(false)}
        className="grid bg-black rounded-full size-9 place-content-center"
      >
        <CrossSvg />
      </button>
    </div>
  );
};

export default ModalClose;
