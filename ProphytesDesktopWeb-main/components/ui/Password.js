import React from "react";

const Password = () => {
  return (
    <div className="lg:py-[150px] md:py-[110px] py-20 bg-black">
      <div className="container">
        <div className="bg-white rounded-[20px] py-20 sm:px-[60px] px-5">
          <div>
            <h3 className="lg:text-[28px] md:text-[22px] xs:text-xl text-[19px]  font-bold lg:leading-10 leading-8 mb-[30px]">
              Password Information
            </h3>
            <form>
              <div className="grid lg:grid-cols-2 gap-[30px]">
                <div>
                  <label className="lg:text-xl md:text-[18px] text-base  font-bold leading-5 block mb-5">
                    Current Password*
                  </label>
                  <input
                    className={`xs:py-5 py-3 px-5 w-full bg-black text-white rounded-[10px] font-inter placeholder:text-white focus:outline-none sm:placeholder:text-base text-base  placeholder:font-normal leading-6`}
                    type="password"
                    placeholder="Enter Your Password"
                  />
                </div>
                <div>
                  <label className="lg:text-xl md:text-[18px] text-base  font-bold leading-5 block mb-5">
                    New Password*
                  </label>
                  <input
                    className={`xs:py-5 py-3 px-5 w-full bg-black text-white rounded-[10px] font-inter placeholder:text-white text-base focus:outline-none sm:placeholder:text-base placeholder:text-[15px] placeholder:font-normal leading-6`}
                    type="password"
                    placeholder="Enter Your New Password"
                  />
                </div>
              </div>
              <div>
                <h4 className="txt-xl font-bold leading-7 mt-[30px] mb-5">
                  Password Requirements:
                </h4>
                <div className="space-y-[15px]">
                  <p
                    className={`relative font-inter ml-4 text-[#333333] after:absolute after:top-[6px] after:-left-4 after:size-2 after:bg-black after:rounded-full`}
                  >
                    At Least 8 characters and up to 12 characters
                  </p>
                  <p
                    className={`relative font-inter ml-4 text-[#333333] after:absolute after:top-[6px] after:-left-4 after:size-2 after:bg-black after:rounded-full`}
                  >
                    At Least one lowercase character
                  </p>
                  <p
                    className={`relative font-inter ml-4 text-[#333333] after:absolute after:top-[6px] after:-left-4 after:size-2 after:bg-black after:rounded-full`}
                  >
                    Password must include at least one uppercase character
                  </p>
                </div>
                <button
                  className={` font-inter sm:py-5 py-4 px-12 bg-primary sm:text-base text-[14px] font-bold leading-5 text-white rounded-[999px] mt-10`}
                  type="submit"
                >
                  Save All
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Password;
