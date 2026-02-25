import React from "react";

const SuccessNote = ({ setOpenModal, title, subTitleOne, subTitleTwo }) => {
  return (
    <div>
      <h4 className="md:mt-3 mt-2 md:text-[28px] text-xl font-semibold md:leading-10 leading-[30px] text-center font-montserrat">
        {title}
      </h4>

      <p className="md:text-sm text-xs font-normal md:leading-[22px] leading-[18px] text-white/70 text-center mt-2">
        {subTitleOne}
      </p>

      <div className="md:mt-8 mt-5 rounded-xl border border-[#0D0D0D] bg-[#333333] md:p-[17px] p-3  text-center">
        <p className="md:text-base text-xs font-normal md:leading-6 leading-[18px] text-white/70">
          {subTitleTwo}
        </p>
      </div>

      <button
        onClick={() => setOpenModal(false)}
        className="w-full py-3 mt-6 text-base font-medium leading-5 text-black bg-white rounded-full shadow-[0px_6px_12px_0px_#0000008C]"
      >
        Continue to Chat
      </button>
    </div>
  );
};

export default SuccessNote;
