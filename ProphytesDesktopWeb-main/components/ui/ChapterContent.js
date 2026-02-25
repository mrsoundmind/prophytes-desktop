"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

import { orgContact, orgLogos } from "@/src/configs/constants";
import ChapterSkeleton from "../skeleton/ChapterSkeleton";
import Link from "next/link";
import NewCity from "@/public/img/icon/NewCity";
import UniversityDropdown from "./UniversityDropdown";

const ChapterContent = ({ chapter, loading }) => {
  const [displayCount, setDisplayCount] = useState(8);

  useEffect(() => {
    const updateCount = () => {
      if (window.innerWidth < 640) {
        setDisplayCount(5);
      } else {
        setDisplayCount(8);
      }
    };

    updateCount();
    window.addEventListener("resize", updateCount);
    return () => window.removeEventListener("resize", updateCount);
  }, []);

  return (
    <div>
      <div>
        {loading ? (
          <div className="grid gap-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2">
            {Array.from({ length: 8 }).map((_, index) => (
              <ChapterSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div>
            {chapter.length > 0 && (
              <div className="grid gap-5 mt-5 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2">
                {chapter?.slice(0, displayCount).map((chapter, index) => {
                  const organization = chapter?.organizations;

                  return (
                    <div
                      style={{ "--org-color": `#${organization?.color}` }}
                      className={`group relative p-8 rounded-[20px] bg-[#141616] min-h-[470px] h-full duration-300 hover:bg-[var(--org-color)] flex flex-col`}
                      key={index}
                    >
                      <div className="flex items-center justify-center">
                        {orgLogos[organization?.shortName] && (
                          <Image
                            src={orgLogos[organization?.shortName]}
                            height={80}
                            width={80}
                            alt="organization"
                          />
                        )}
                      </div>

                      {/* Content wrapper */}
                      <div className="flex flex-col flex-1">
                        <div>
                          <h4 className="text-[24px] text-white text-center font-semibold leading-9 font-montserrat mt-6 mb-4 line-clamp-2">
                            {chapter.chapter_name}
                          </h4>

                          <div className="space-y-[14px] bg-black group-hover:bg-white duration-300 border border-[#383838] group-hover:border-transparent rounded-2xl p-5">
                            <div
                              className={`flex gap-[12px] items-center text-sm text-[#FFFFFFB2] font-normal leading-[22px] group-hover:text-black duration-300 group`}
                            >
                              <span className="border-[#383838] border-[1px] h-8 w-8 rounded-full inline-flex items-center justify-center">
                                <Image
                                  src="./img/icon/undergraguate.svg"
                                  alt="undergraduate"
                                  width={15}
                                  height={13}
                                  className="duration-300 group-hover:invert"
                                />
                              </span>
                              {chapter.graduation_status}
                            </div>

                            {chapter.graduation_status === "UNDERGRADUATE" &&
                              chapter.universities.length > 0 ? (
                              <div>
                                {chapter?.universities.length === 1 ? (
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

                                    <span>
                                      {chapter?.universities[0]?.name}
                                    </span>
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
                                    <UniversityDropdown
                                      universities={chapter.universities}
                                    />
                                  </div>
                                )}
                              </div>
                            ) : (
                              <div>
                                {chapter?.states?.name && (
                                  <li
                                    className={`flex gap-[12px] items-center text-sm text-[#FFFFFFB2] font-normal leading-[22px] group-hover:text-black duration-300`}
                                  >
                                    <span className="border-[#383838] border-[1px] h-8 w-8 rounded-full inline-flex items-center justify-center">
                                      <NewCity className="text-white group-hover:text-black" />
                                    </span>

                                    <span>
                                      {chapter?.states?.name
                                        ? chapter?.states?.name
                                        : chapter?.cities?.name}
                                    </span>
                                  </li>
                                )}
                              </div>
                            )}

                            <li
                              className={`flex gap-[12px] items-center text-sm text-[#FFFFFFB2] font-normal leading-[22px] group-hover:text-black duration-300`}
                            >
                              <span className="border-[#383838] border-[1px] h-8 w-8 rounded-full inline-flex items-center justify-center">
                                <Image
                                  src="./img/icon/c-number.svg"
                                  alt="location"
                                  width={15}
                                  height={13}
                                  className="duration-300 group-hover:invert"
                                />
                              </span>
                              Chapter Number: #{chapter.id}
                            </li>
                          </div>
                        </div>

                        {/* Contact button pinned at bottom */}
                        <div className="mt-auto">
                          <Link
                            href={orgContact[organization?.shortName] || "#"}
                            target="_blank"
                            className={`group mx-auto border-[#383838] border-[1px] flex gap-[10px] items-center justify-center py-[12px] px-[15px] w-full bg-transparent text-lg font-medium text-[#FFFFFFB2] leading-6 rounded-full relative z-[1] overflow-hidden transition-all duration-300 ease-in-out before:content-[''] before:absolute before:top-[162%] before:left-1/2 before:w-[210%] before:h-[290%] before:transform before:-translate-x-1/2 before:-rotate-[8deg] before:rounded-[80%] before:z-[-1] before:bg-[var(--before-color)] before:duration-[800ms] hover:before:-top-[96%] group-hover:bg-[#141616]`}
                          >
                            Contact
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChapterContent;
