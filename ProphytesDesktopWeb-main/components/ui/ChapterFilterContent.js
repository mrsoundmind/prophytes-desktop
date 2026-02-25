"use client";
import React, { useState } from "react";
import Image from "next/image";

import graduate from "@/public/img/icon/graduate.svg";
import univercity from "@/public/img/icon/univercity.svg";
import city from "@/public/img/icon/city.svg";
import id from "@/public/img/icon/id.svg";
import { orgContact, orgLogos } from "@/src/configs/constants";
import Link from "next/link";
import NewCity from "@/public/img/icon/NewCity";
import CarotSvg from "@/public/img/icon/CarotSvg";
import UniversityDropdown from "./UniversityDropdown";

const ChapterFilterContent = ({ item }) => {
  const [bgColor, setBgColor] = useState("");
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(item?.universities[0]?.name);
  const organization = item?.organizations;

  useState(() => {
    if (organization?.shortName === "APA") {
      setBgColor("#fff");
    } else {
      setBgColor(`#${organization?.color}`);
    }
  }, [organization?.color]);

  return (
    <div className="h-full">
      <div
        className="group relative p-8 rounded-[20px] bg-[#141616] h-full flex flex-col hover:bg-[var(--org-color)]"
        style={{ "--org-color": `#${organization?.color}` }}
      >
        <div className="flex items-center justify-center">
          <Image
            src={orgLogos[organization?.shortName]}
            height={80}
            width={80}
            alt="organization"
          />
        </div>

        {/* FIXED: make content wrapper flexible */}
        <div className="flex flex-col flex-1">
          <div>
            <h4 className="text-[24px] text-white text-center font-semibold leading-9 font-montserrat mt-6 mb-4 line-clamp-2">
              {item.chapter_name}
            </h4>

            <ul className="space-y-[14px] bg-black group-hover:bg-white duration-300 border border-[#383838] group-hover:border-transparent rounded-2xl p-5">
              <li className="flex gap-[12px] items-center text-sm text-[#FFFFFFB2] font-normal leading-[22px] group-hover:text-black duration-300">
                <span className="border-[#383838] border-[1px] h-8 w-8 rounded-full inline-flex items-center justify-center">
                  <Image
                    src="./img/icon/undergraguate.svg"
                    alt="undergraduate"
                    width={15}
                    height={13}
                    className="duration-300 group-hover:invert"
                  />
                </span>
                {item.graduation_status}
              </li>

              {item.graduation_status === "UNDERGRADUATE" &&
              item.universities.length > 0 ? (
                <div>
                  {item?.universities.length === 1 ? (
                    <div
                      className={`flex gap-[12px] items-center text-sm text-[#FFFFFFB2] font-normal leading-[22px] group-hover:text-black duration-300`}
                    >
                      <div>
                        <div className="border-[#383838] border-[1px] h-8 w-8 rounded-full inline-flex items-center justify-center">
                          <Image
                            src="./img/icon/cap.svg"
                            alt="location"
                            width={15}
                            height={13}
                            className="duration-300 group-hover:invert"
                          />
                        </div>
                      </div>

                      <span>{item?.universities[0]?.name}</span>
                    </div>
                  ) : (
                    <div
                      className={`flex gap-[12px] items-center text-sm text-[#FFFFFFB2] font-normal leading-[22px] group-hover:text-black duration-300`}
                    >
                      <div>
                        <div className="border-[#383838] border-[1px] h-8 w-8 rounded-full inline-flex items-center justify-center">
                          <Image
                            src="./img/icon/cap.svg"
                            alt="location"
                            width={15}
                            height={13}
                            className="duration-300 group-hover:invert"
                          />
                        </div>
                      </div>
                      <UniversityDropdown universities={item.universities} />
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  {item?.states?.name && (
                    <li
                      className={`flex gap-[12px] items-center text-sm text-[#FFFFFFB2] font-normal leading-[22px] group-hover:text-black duration-300`}
                    >
                      <span className="border-[#383838] border-[1px] h-8 w-8 rounded-full inline-flex items-center justify-center">
                        <NewCity className="text-white group-hover:text-black" />
                      </span>

                      <span>
                        {item?.states?.name
                          ? item?.states?.name
                          : item?.cities?.name}
                      </span>
                    </li>
                  )}
                </div>
              )}

              <li className="flex gap-[12px] items-center text-sm text-[#FFFFFFB2] leading-[22px] group-hover:text-black duration-300">
                <span className="border-[#383838] border-[1px] h-8 w-8 rounded-full inline-flex items-center justify-center">
                  <Image
                    src="./img/icon/c-number.svg"
                    alt="location"
                    width={15}
                    height={13}
                    className="duration-300 group-hover:invert"
                  />
                </span>
                Chapter Number: #{item.id}
              </li>
            </ul>
          </div>

          {/* Button stays at bottom now */}
          <div className="mt-auto pt-7">
            <Link
              href={orgContact[organization?.shortName] || "#"}
              target="_blank"
              className="group mx-auto border-[#383838]
              border-[1px] flex gap-[10px] items-center justify-center py-[12px]
              px-[15px] w-full bg-transparent text-lg font-medium
              text-[#FFFFFFB2] leading-6 rounded-full relative z-[1]
              overflow-hidden transition-all duration-300 ease-in-out
              before:content-[''] before:absolute before:top-[162%]
              before:left-1/2 before:w-[210%] before:h-[290%] before:transform
              before:-translate-x-1/2 before:-rotate-[8deg] before:rounded-[80%]
              before:z-[-1] before:bg-[var(--before-color)]
              before:duration-[800ms] hover:before:-top-[96%]
              group-hover:bg-[#141616]"
            >
              {" "}
              Contact
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChapterFilterContent;
