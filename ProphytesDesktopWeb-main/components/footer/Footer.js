"use client";
import Image from "next/image";
import Link from "next/link";

import apple from "@/public/img/home/apple-icon.svg";
import playStore from "@/public/img/home/play-store.svg";
import { usePathname, useRouter } from "next/navigation";

import { useUserInfoQuery } from "@/src/redux/services/userApi";

import logo from "@/public/img/logo/Prophytes-with-trademark.svg";
import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Footer = () => {
  const { data: userInfo } = useUserInfoQuery();

  const router = useRouter();
  const pathname = usePathname();
  const handleMemberClick = async (orgId) => {
    const basePath = "/members";

    if (pathname === basePath) {
      // Step 1: Clear current query params
      router.replace(basePath);

      // Step 2: Push new query after reset
      setTimeout(() => {
        router.push(`${basePath}?organizationId=${orgId}&reload=${Date.now()}`);
      }, 1000); // Small delay ensures the reset completes
    } else {
      // Not on /members, just go with query
      router.push(`${basePath}?organizationId=${orgId}`);
    }
  };

  return (
    <section className="sm:pt-[40px] pt-[50px] bg-black sm:pb-0 pb-16 ">
      <div className="container">
        <div className="flex sm:flex-row flex-col sm:gap-5 gap-6 sm:items-center  justify-between border-b border-[#E6E6E6] border-opacity-20 pb-[30px]">
          <div className="relative">
            <Link href="/">
              <Image className="sm:w-[198px] w-[163px]" src={logo} alt="logo" />
            </Link>
          </div>
          {/* <div className="flex items-center xs:gap-3 gap-[6px] sm:justify-center sm:gap-5 ">
            <Link
              className="flex xs:gap-[10px] gap-[6px] items-center justify-center w-[180px] h-[60px] border border-[#E7E7EB33] rounded-[12px] transition-all ease-in-out duration-300 hover:scale-105"
              href="https://apps.apple.com/us/app/prophytes-members-only/id955180982"
              target="_blank"
            >
              <div className="w-10 h-10">
                <Image className="w-full h-full" src={apple} alt="apple" />
              </div>
              <div>
                <span className="text-[10px]  text-white font-bold leading-4">
                  Download On The
                </span>
                <p className="text-[14px]  font-semibold font-montserrat leading-[22px]  text-white">
                  App Store
                </p>
              </div>
            </Link>
            <Link
              className="flex xs:gap-[10px] gap-[6px] items-center justify-center w-[180px] h-[60px] border border-[#E7E7EB33] rounded-[12px] transition-all ease-in-out duration-300 hover:scale-105"
              href="https://play.google.com/store/apps/details?id=com.ush.prophytes&hl=en_US&pli=1"
              target="_blank"
            >
              <div className="w-10 h-10">
                <Image className="w-full h-full" src={playStore} alt="apple" />
              </div>
              <div>
                <span className="text-[10px]   text-white font-normal leading-4  ">
                  Available On The
                </span>
                <p className="text-[14px]  font-semibold leading-[22px] font-montserrat text-white">
                  Google Play
                </p>
              </div>
            </Link>
          </div> */}
        </div>

        <div className="mt-10 sm:mt-20">
          <div className="grid lg:grid-cols-4 md:grid-cols-2  xl:gap-[73px] gap-10 pb-20">
            <div>
              <h5 className=" text-base  leading-6   text-[#B2B2B2] pb-[30px]">
                These organizations were established to provide a supportive
                network for African American students during times when they
                faced exclusion from other collegiate societies.
              </h5>
              <div className="flex gap-[10px]">
                <Link
                  className="grid transition-all duration-500 ease-out border border-[#383838] rounded-full group place-content-center size-10 hover:bg-primary hover:border-primary"
                  href="https://www.facebook.com/ProphytesApp"
                  target="_blank"
                >
                  <FontAwesomeIcon
                    className=" w-[10px] h-4 text-white group-hover:text-black "
                    icon={faFacebookF}
                  />
                </Link>
                <Link
                  className="grid transition-all duration-500 ease-out border border-[#383838] rounded-full group place-content-center size-10 hover:bg-white hover:border-primary"
                  href="https://x.com/prophytesapp"
                  target="_blank"
                >
                  <FontAwesomeIcon
                    className=" w-[16px] h-4 text-white group-hover:text-black "
                    icon={faXTwitter}
                  />
                </Link>
                <Link
                  className="grid transition-all duration-500 ease-out border border-[#383838] rounded-full group place-content-center size-10 hover:bg-white "
                  href="https://www.instagram.com/prophytesapp/"
                  target="_blank"
                >
                  <FontAwesomeIcon
                    className=" w-[16px] h-4 text-white group-hover:text-black "
                    icon={faInstagram}
                  />
                </Link>
                <Link
                  className="grid transition-all duration-500 ease-out border border-[#383838] rounded-full group place-content-center size-10 hover:bg-white "
                  href="https://www.linkedin.com/company/prophytes-app/"
                  target="_blank"
                >
                  <FontAwesomeIcon
                    className=" w-[16px] h-4 text-white group-hover:text-black "
                    icon={faLinkedinIn}
                  />
                </Link>
              </div>
            </div>
            <div>
              <h4 className="text-xl text-white leading-[30px]  font-semibold sm:mb-7 mb-5 font-montserrat">
                Member Directory
              </h4>
              <ul className="space-y-3">
                <li>
                  <p
                    className="text-[16px] cursor-pointer text-[#B2B2B2] hover:text-primary hover:ml-3 transition-all duration-500 ease-out font-normal leading-relaxed"
                    onClick={() => handleMemberClick(1)}
                  >
                    Alpha Phi Alpha
                  </p>
                </li>
                <li>
                  <p
                    className="text-[16px] cursor-pointer text-[#B2B2B2] hover:text-primary hover:ml-3 transition-all duration-500 ease-out font-normal leading-relaxed"
                    onClick={() => handleMemberClick(7)}
                  >
                    Zeta Phi Beta
                  </p>
                </li>
                <li>
                  <p
                    className="text-[16px] cursor-pointer text-[#B2B2B2] hover:text-primary hover:ml-3 transition-all duration-500 ease-out font-normal leading-relaxed"
                    onClick={() => handleMemberClick(8)}
                  >
                    Sigma Gamma Rho
                  </p>
                </li>
                <li>
                  <p
                    className="text-[16px] cursor-pointer text-[#B2B2B2] hover:text-primary hover:ml-3 transition-all duration-500 ease-out font-normal leading-relaxed"
                    onClick={() => handleMemberClick(3)}
                  >
                    Kappa Alpha Psi
                  </p>
                </li>
                <li>
                  <p
                    className="text-[16px] cursor-pointer text-[#B2B2B2] hover:text-primary hover:ml-3 transition-all duration-500 ease-out font-normal leading-relaxed"
                    onClick={() => handleMemberClick(9)}
                  >
                    Iota Phi Theta
                  </p>
                </li>
                <li>
                  <Link
                    className="text-[16px] text-[#B2B2B2] hover:text-primary hover:ml-3 transition-all duration-500 ease-out font-normal leading-relaxed"
                    href="/members"
                  >
                    More..
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl text-white leading-[30px]  font-semibold sm:mb-7 mb-5 font-montserrat">
                Chapter Directory
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    className="text-[16px] text-[#B2B2B2] hover:text-primary hover:ml-3 transition-all duration-500 ease-out font-normal leading-relaxed"
                    href="/chapters"
                  >
                    Region/District
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-[16px] text-[#B2B2B2] hover:text-primary hover:ml-3 transition-all duration-500 ease-out font-normal leading-relaxed"
                    href="/chapters"
                  >
                    Chapter Name/Code
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-[16px] text-[#B2B2B2] hover:text-primary hover:ml-3 transition-all duration-500 ease-out font-normal leading-relaxed"
                    href="/chapters"
                  >
                    Location
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-[16px] text-[#B2B2B2] hover:text-primary hover:ml-3 transition-all duration-500 ease-out font-normal leading-relaxed"
                    href="/chapters"
                  >
                    Chapter Type
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-[16px] text-[#B2B2B2] hover:text-primary hover:ml-3 transition-all duration-500 ease-out font-normal leading-relaxed"
                    href="/chapters"
                  >
                    Contact Information
                  </Link>
                </li>
                <li>
                  <Link
                    className="text-[16px] text-[#B2B2B2] hover:text-primary hover:ml-3 transition-all duration-500 ease-out font-normal leading-relaxed"
                    href="/chapters"
                  >
                    Chapter Website
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl text-white leading-[30px]  font-semibold sm:mb-7 mb-5 font-montserrat">
                Business Directory
              </h4>
              <ul className="space-y-3">
                <li>
                  <p
                    className="text-[16px] text-gray-500 font-normal"
                    // href="/"
                  >
                    Real Estate
                  </p>
                </li>
                <li>
                  <p
                    className="text-[16px] text-gray-500 font-normal"
                    // href="/"
                  >
                    Tech
                  </p>
                </li>
                <li>
                  <p
                    className="text-[16px] text-gray-500 font-normal"
                    // href="/"
                  >
                    Apparel
                  </p>
                </li>
                <li>
                  <p
                    className="text-[16px] text-gray-500 font-normal"
                    // href="/"
                  >
                    Food
                  </p>
                </li>
                <li>
                  <p
                    className="text-[16px] text-gray-500 font-normal"
                    // href="/"
                  >
                    Events
                  </p>
                </li>
                <li>
                  <p
                    className="text-[16px] text-gray-500 font-normal"
                    // href="/"
                  >
                    Consulting
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap sm:gap-8 gap-[17px] md:justify-between sm:justify-center border-t border-[#E6E6E6] border-opacity-20 py-[30px]">
          <ul className="flex flex-wrap gap-5 sm:justify-center">
            <li>
              <Link
                className="sm:text-[16px] text-[14px] sm:leading-6 leading-[22px] text-white/70 font-normal "
                href="/terms"
                target="_blank"
              >
                Terms & Conditions
              </Link>
            </li>
            <li>
              <span
                className="sm:text-[16px] text-[14px] sm:leading-6 leading-[22px] text-white/70 font-normal "
                // href="/"
              >
                &copy; Prophytes | {new Date().getFullYear()}
              </span>
            </li>
          </ul>
          <ul className="flex flex-wrap justify-center">
            <li>
              <Link
                className={`${
                  userInfo?.user ? "hidden" : "block"
                } sm:text-[16px] text-[14px] sm:leading-6 leading-[22px] text-white/70 font-normal `}
                href="/onboard"
              >
                Sign Up
              </Link>
            </li>
            <li
              className={`${
                userInfo?.user ? "hidden" : "block"
              } text-white/70 xs:px-3 px-2`}
            >
              |
            </li>
            <li>
              <Link
                className={`${
                  userInfo?.user ? "hidden" : "block"
                } sm:text-[16px] text-[14px] sm:leading-6 leading-[22px] text-white/70 font-normal `}
                href="/signin"
              >
                Log In
              </Link>
            </li>
            <li
              className={`${
                userInfo?.user ? "hidden" : "block"
              } text-white xs:px-3 px-2`}
            >
              |
            </li>
            <li>
              <Link
                className="sm:text-[16px] text-[14px] sm:leading-6 leading-[22px] text-white/70 font-normal ml-2"
                href="/about"
              >
                About
              </Link>
            </li>
            {/* <li className="px-2 text-white xs:px-3">|</li>
            <li>
              <Link
                className="xs:text-[16px] text-[14px] text-white font-normal leading-relaxed"
                href="/"
              >
                Foundation
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Footer;
