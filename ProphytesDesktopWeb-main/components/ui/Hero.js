"use client";
import hero from "@/public/img/home/hero-03.png";

import { useUserInfoQuery } from "@/src/redux/services/userApi";
import Image from "next/image";
import { useRouter } from "next/navigation";
import MemberDirectorySkeleton from "../skeleton/MemberDirectorySkeleton";
import HeroSlider from "./HeroSlider";
import ClaimButton from "./ClaimButton";
import { useGetMembersDirectoryQuery } from "@/src/redux/services/memberApi";

const Hero = () => {
  const { data: membersDirectory, isLoading: loading } =
    useGetMembersDirectoryQuery();
  const { data: userInfo } = useUserInfoQuery();
  const route = useRouter();

  const handleScroll = () => {
    const section = document.getElementById("section2");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  const handleClick = (id) => {
    route.push(`/members/${id}`);
  };

  return (
    <section className="relative bg-black">
      <div className=" pb-8 max-w-[1920px] 3xl:px-20 2xl:px-10 px-6 mx-auto relative ">
        <div
          className="bg-center bg-no-repeat bg-contain "
          style={{ backgroundImage: `url('${hero.src}')` }}
        >
          <div className="absolute inset-0 bg-black/90"></div>
          <div className=" md:py-[100px] sm:20 py-10 relative z-10">
            <div className="flex flex-col items-center gap-6 lg:flex-row 3xl:gap-16">
              <div className="3xl:w-[950px]  lg:w-[750px] w-full">
                <h1 className="2xl:text-[48px] lg:text-[40px] md:text-[36px] xs:text-[28px] text-[24px] text-white font-bold  2xl:leading-[60px] md:leading-[50px] xs:leading-[42px] leading-[32px]    font-montserrat ">
                  Pro•phytes - /PROF-ites/ (noun) a member of a fraternity or
                  sorority with knowledge, power and influence.
                </h1>

                <div className="flex flex-wrap items-center xl:gap-[30px] gap-3 xs:mt-10 mt-5">
                  {!userInfo?.user && (
                    <ClaimButton title="Claim My Prophytes" />
                  )}
                  <button
                    onClick={handleScroll}
                    className="relative group flex  overflow-hidden  items-center  xs:h-[60px] h-[54px]   border border-secondary rounded-[99px]
                       transition-all duration-500 ease-in cursor-pointer after:content-[''] after:absolute after:left-auto after:right-0 after:bottom-0 after:h-full after:z-[1] after:rounded-[99px] after:w-0 after:bg-white xs:after:py-[15px] after:py-[11px] after:transition-[width] after:duration-[500ms] after:ease-[cubic-bezier(0.25,0.8,0.25,1)] hover:after:text-black hover:after:w-full hover:after:left-0 hover:after:right-auto  "
                  >
                    {/* bg-secondary  text-black */}
                    <span
                      className={`font-inter relative  ml-[5px] xs:py-[15px] py-[13px]  px-3 text-base  text-white font-bold   leading-5  rounded-[99px] transition-all duration-500 ease-in `}
                    >
                      <span className="relative z-[99] group-hover:text-black group-hover:transition-all group-hover:duration-500 ease-in">
                        View Verified Members
                      </span>
                    </span>
                    <span className="pr-3 xs:pr-5 relative z-[99]">
                      <svg
                        width="16"
                        height="14"
                        viewBox="0 0 18 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-white transition-all duration-300 ease-out group-hover:text-black"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M17.7497 7.75195L0.25 7.75195L0.25 6.25195L17.7497 6.25195V7.75195Z"
                          fill="currentColor"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M16.9998 6.24414C13.4723 6.24414 10.5898 9.34624 10.5898 12.6541V13.4041H12.0898V12.6541C12.0898 10.1426 14.3324 7.74414 16.9998 7.74414H17.7494V6.24414H16.9998Z"
                          fill="currentColor"
                        />
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M17.0037 7.74794C13.4762 7.74794 10.5938 4.6458 10.5938 1.33789V0.587891L12.0938 0.587891V1.33789C12.0938 3.84947 14.3363 6.24794 17.0037 6.24794H17.7534V7.74794H17.0037Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
              </div>

              <div className="3xl:w-[770px] 2xl:w-[950px] xl:w-[1000px] lg:w-[1000px] ">
                <div className="hidden gap-4 sm:grid xl:grid-cols-3 sm:grid-cols-2">
                  {loading ? (
                    Array(9)
                      .fill(0)
                      .map((_, i) => <MemberDirectorySkeleton key={i} />)
                  ) : (
                    <>
                      {membersDirectory?.data?.length > 0 &&
                        membersDirectory?.data?.map((item, i) => (
                          <div
                            key={i}
                            className={`flex items-center  py-[7px] sm:pl-[7px] pl-2 xs:pr-6 pr-0 rounded-full cursor-pointer`}
                            style={{
                              backgroundColor: `#${item?.organization?.color}`,
                            }}
                            onClick={() => handleClick(item?.id)}
                          >
                            <div className="flex items-center gap-2">
                              <div className="relative w-[85px] h-[85px] rounded-full border-white border-[1px]">
                                <Image
                                  src={item?.avatar}
                                  alt={item?.firstName}
                                  width={500}
                                  height={500}
                                  className="object-cover w-full h-full rounded-full"
                                />
                                <div
                                  className="w-[25px] h-[25px] absolute top-0 right-0 flex items-center justify-center rounded-full border-white border-[1px]"
                                  style={{
                                    backgroundColor: item?.isPaid
                                      ? `#${item?.organization?.color}`
                                      : "#16AD4B",
                                  }}
                                >
                                  <svg
                                    width="17"
                                    height="17"
                                    viewBox="0 0 21 21"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M7.48438 10.501L9.49271 12.5177L13.5177 8.48438"
                                      stroke="white"
                                      strokeWidth="1.25"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                    <path
                                      d="M9.45937 2.54258C10.0344 2.05091 10.976 2.05091 11.5594 2.54258L12.876 3.67591C13.126 3.89258 13.5927 4.06758 13.926 4.06758H15.3427C16.226 4.06758 16.951 4.79258 16.951 5.67591V7.09258C16.951 7.41758 17.126 7.89258 17.3427 8.14258L18.476 9.45925C18.9677 10.0342 18.9677 10.9759 18.476 11.5592L17.3427 12.8759C17.126 13.1259 16.951 13.5926 16.951 13.9259V15.3426C16.951 16.2259 16.226 16.9509 15.3427 16.9509H13.926C13.601 16.9509 13.126 17.1259 12.876 17.3426L11.5594 18.4759C10.9844 18.9676 10.0427 18.9676 9.45937 18.4759L8.14271 17.3426C7.89271 17.1259 7.42604 16.9509 7.09271 16.9509H5.65104C4.76771 16.9509 4.04271 16.2259 4.04271 15.3426V13.9176C4.04271 13.5926 3.86771 13.1259 3.65937 12.8759L2.53437 11.5509C2.05104 10.9759 2.05104 10.0426 2.53437 9.46758L3.65937 8.14258C3.86771 7.89258 4.04271 7.42591 4.04271 7.10091V5.66758C4.04271 4.78424 4.76771 4.05924 5.65104 4.05924H7.09271C7.41771 4.05924 7.89271 3.88424 8.14271 3.66758L9.45937 2.54258Z"
                                      stroke="white"
                                      strokeWidth="1.25"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                </div>
                              </div>
                              <div className="flex-1">
                                <h5 className="text-[14px] text-white font-bold leading-4">
                                  {item?.firstName} #{item?.id}
                                </h5>
                                <p className="text-[14px] text-white leading-5">
                                  {item?.organization?.name}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="-mt-14">
        <HeroSlider
          data={membersDirectory}
          anim="marque-left"
          loading={loading}
        />
      </div>
    </section>
  );
};

export default Hero;
