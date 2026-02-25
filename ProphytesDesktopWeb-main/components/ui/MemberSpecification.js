"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const MemberSpecification = ({ img, title, status, isPremium }) => {
  const [isPaid, setIsPaid] = useState(undefined);

  useEffect(() => {
    if (isPremium?.data?.isPaid !== undefined) {
      setIsPaid(isPremium.data.isPaid);
    }
  }, [isPremium]);

  return (
    <div>
      <div className="flex items-center justify-between mb-[10px]">
        {title ? (
          <div className={`${title ? "visible" : "invisible"}`}>
            <div className="xs:flex hidden gap-[9px] items-center">
              <Image src={img} alt="president" />
              <h3
                className={`sm:text-base text-[12px] ${
                  isPaid ? "text-black" : "text-white"
                } font-bold leading-5`}
              >
                {title ? title : "N/A"}
              </h3>
            </div>
          </div>
        ) : (
          <div></div>
        )}

        <div className="hidden xs:block">
          <h4
            className={`sm:text-xl text-[14px] text-black font-bold sm:leading-7 leading-5 ${
              isPaid ? "visible" : "invisible"
            }`}
          >
            {status}
          </h4>
        </div>
      </div>
      <div className="flex xs:hidden gap-[9px] items-center">
        <Image src={img} alt="president" />
        <h3
          className={`sm:text-base text-[12px] ${
            isPaid ? "text-black" : "text-white"
          } font-bold leading-5`}
        >
          {title ? title : "N/A"}
        </h3>
      </div>
    </div>
  );
};

export default MemberSpecification;
