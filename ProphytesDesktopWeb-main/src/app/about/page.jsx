"use client";
import React from "react";
import Link from "next/link";
import AngleLeft from "@/public/img/icon/AngleLeft";
import LeftAngleSvg from "@/public/img/icon/LeftAngleSvg";

const About = () => {
  return (
    <section className="flex justify-center w-full px-4 py-5 bg-black sm:py-10">
      <div className="w-full max-w-4xl  bg-black rounded-[16px] shadow-2xl p-6">
        <h2 className="mb-6 sm:text-3xl text-[24px] text-center font-bold text-white font-montserrat">
          About Us
        </h2>
        <h5 className="mb-5 text-lg font-bold text-white sm:text-xl font-montserrat">
          Claim Your Prophytes Number. Protect Your Legacy.
        </h5>

        <div className="space-y-4 text-gray-800 dark:text-white">
          <p className="leading-6 text-white">
            In the Divine Nine, your membership is more than a title — it’s a
            lifetime of service, achievement, and connection.
          </p>
          <p className="leading-6 text-white">
            Verification ensures your legacy is honored, your impact recognized,
            and your network unlocked.
          </p>

          <h5
            className="mt-8 text-lg font-bold text-white sm:text-xl font-montserrat"
            style={{ marginTop: "32px" }}
          >
            Why Verify Today?
          </h5>
          <ul>
            <li className="flex items-center gap-3 ml-3 sm:ml-8">
              <p className="bg-white rounded-full size-1"></p> Lower Numbers =
              Higher Deference
            </li>
          </ul>
          <p className="text-white">
            Prophytes Numbers are assigned in order of verification. Once
            claimed, they’re gone.
          </p>
          <ul>
            <li className="flex items-center gap-3 ml-3 sm:ml-8">
              <p className="bg-white rounded-full size-1"></p> Lower Numbers =
              Instant Credibility
            </li>
          </ul>
          <p className="text-white">
            Your verified badge signals authenticity and commitment , no bots,
            no pretenders.
          </p>
          <ul>
            <li className="flex items-center gap-3 ml-3 sm:ml-8">
              <p className="bg-white rounded-full size-1"></p> Lower Numbers =
              Direct Access to the Network
            </li>
          </ul>
          <p className="text-white">
            Message verified members in your org and across all Divine Nine
            organizations.
          </p>
          <div className="">
            <h5 className="mt-6 text-lg font-bold text-white sm:mt-10 sm:text-xl font-montserrat">
              Picture This:
            </h5>
            <p className="mt-4 leading-6 text-white">
              You’re traveling to a new city. You open Prophytes, search your
              org, and instantly see verified brothers and sisters nearby ,
              ready to connect, collaborate, or welcome you in.
            </p>
          </div>
          <div className="">
            <h5 className="mt-6 text-lg font-bold text-white sm:mt-10 sm:text-xl font-montserrat">
              Membership Tiers
            </h5>
            <p className="mt-4 font-bold leading-6 text-white">
              🎓 Students (with active .edu email) FREE premium access sponsored
              by Prophytes.
            </p>
            <p className="mt-4 font-bold leading-6 text-white">
              💼 Alumni $100/year
            </p>
            <p className="mt-2 leading-6 text-white">
              Full premium access for verified alumni members.
            </p>
          </div>
          <div>
            <p className="mt-4 font-bold leading-6 text-white">
              🏆 Founders Tier $250/year (Limited to 1,000 members annually)
            </p>
            <p className="mt-2 leading-6 text-white">
              Reserved for leaders and early adopters who want elevated
              recognition, exclusive invitations, and priority access to future
              activations.
            </p>
          </div>
          <div>
            <h5 className="mt-6 text-lg font-bold text-white sm:mt-10 sm:text-xl font-montserrat">
              Economic Power. United.
            </h5>
            <p className="mt-4 text-white">
              The Divine Nine has contributed over a century of cultural, civic,
              and financial leadership. Its members collectively represent over
              $1 trillion in lifetime economic power and this platform exists to
              connect and activate that power.
            </p>
          </div>

          <p className="mt-3 font-bold text-white">
            ✅ Get Verified. Claim Your Number. Join the Most Respected Network
            in Black America.
          </p>

          <div className="">
            <Link
              href="/onboard"
              className={`relative group flex  overflow-hidden  items-center sm:mt-10 mt-6   xs:h-[60px] h-[54px]   bg-white text-black rounded-[99px] w-fit
                       transition-all duration-500 ease-in border border-white 
                        cursor-pointer after:content-[''] after:absolute after:left-auto after:right-0 after:bottom-0 after:h-full after:z-[1] after:rounded-[99px] after:w-0 after:bg-black xs:after:py-[15px] after:py-[11px] after:transition-[width] after:duration-[500ms] after:ease-[cubic-bezier(0.25,0.8,0.25,1)] hover:after:text-white hover:after:w-full hover:after:left-0 hover:after:right-auto `}
            >
              <span
                className={`font-inter relative  ml-[5px]   px-3 text-base  text-black font-bold   leading-5 rounded-[99px] transition-all duration-500 ease-in `}
              >
                <span className="relative z-[99] group-hover:text-white group-hover:transition-all group-hover:duration-500 ease-in">
                  Get Verified Now
                </span>
              </span>
              <span className="pr-3 xs:pr-5 relative z-[99]">
                <LeftAngleSvg className="text-black transition-all duration-300 ease-out group-hover:text-white" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
