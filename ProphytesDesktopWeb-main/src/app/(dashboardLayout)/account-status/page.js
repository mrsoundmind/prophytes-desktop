/* eslint-disable react/no-unescaped-entities */
"use client";

import statusUpdateIcon from "@/public/img/status/statusUpdate.png";
import { useUserInfoQuery } from "@/src/redux/services/userApi";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
export default function StatusUpdate() {
  const { data: userInfo, isLoading: loading } = useUserInfoQuery();
  const router = useRouter();
  const [user, setUser] = useState("");
  const userStatus = useSelector((state) => state.user.status);

  useEffect(() => {
    router.refresh();
  }, []);
  useEffect(() => {
    if (userInfo) {
      setUser(userInfo?.user?.memberproof?.status);
    }
  }, [userInfo]);

  useEffect(() => {
    if (userStatus) {
      window.location.reload();
    }
  }, [userStatus]);

  return loading ? (
    <section className="bg-black h-full py-[40px] flex items-center justify-center">
      <div className="flex flex-col items-center space-y-6">
        {/* Image skeleton */}
        <div className="w-[150px] h-[150px] bg-gray-800 rounded-full animate-pulse"></div>

        {/* Card Skeleton */}
        <div className="flex flex-col w-full max-w-md p-6 space-y-6 text-center text-white rounded-lg">
          {/* Heading skeleton */}
          <div className="h-7 w-[200px] mx-auto bg-gray-800 rounded-md animate-pulse"></div>

          {/* Status Buttons Skeleton */}
          <div className="space-y-4">
            {Array(3)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="w-full h-12 bg-gray-800 rounded-full animate-pulse"
                ></div>
              ))}
          </div>

          {/* Note Skeleton */}
          <div className="bg-gray-800 min-w-[320px] md:min-w-[400px] text-black p-4 rounded-md border-l-4 border-gray-600 animate-pulse h-[100px]"></div>

          {/* Link skeleton */}
          <div className="w-[200px] h-6 mx-auto bg-gray-800 rounded-md animate-pulse mt-4"></div>
        </div>
      </div>
    </section>
  ) : (
    <section className="py-6 bg-black sm:py-10">
      {user === "Submitted" ? (
        ""
      ) : (
        <p className="text-center text-white text-[15px] leading-6 mb-5 px-4">
          ✅ Please upload your Membership ID or Certificate along with a State
          Approved Photo ID. <br className="hidden sm:block" /> Make sure your
          images are clear and readable.
        </p>
      )}

      <div className="flex items-center justify-center h-full ">
        <div className="">
          <Image
            src={statusUpdateIcon}
            alt="statusUpdate"
            className="block m-auto"
            width={150}
            height={150}
          />

          <div className="flex flex-col w-full max-w-md p-6 space-y-3 text-center text-white rounded-lg sm:space-y-6 ">
            <h3 className="lg:text-[28px] md:text-[22px] xs:text-xl text-[19px]  font-bold lg:leading-10 leading-8 font-montserrat">
              Let’s Get You Verified.
            </h3>

            {/* Status Buttons */}
            <div className="space-y-3 sm:space-y-4">
              <button
                disabled
                className={`w-full py-4 rounded-full ${user && "hidden"} ${
                  !user
                    ? "bg-gray-700 text-white "
                    : "bg-white opacity-30 text-black "
                } font-medium`}
              >
                Not Submitted
              </button>
              <button
                disabled
                className={`w-full py-4 rounded-full ${
                  user === "Submitted"
                    ? "bg-gray-700 text-white "
                    : "bg-white opacity-30 text-black "
                } font-medium ${!user && "hidden"}`}
              >
                Submitted
              </button>
              <button
                disabled
                className={`w-full py-4 rounded-full ${
                  user === "Resubmit"
                    ? "bg-gray-700 text-white "
                    : "bg-white opacity-30 text-black "
                } font-medium`}
              >
                Resubmit
              </button>
              <button
                disabled
                className={`w-full py-4 rounded-full ${
                  user === "Denied"
                    ? "bg-gray-700 text-white "
                    : "bg-white opacity-30 text-black "
                } font-medium`}
              >
                Denied
              </button>
            </div>

            {/* Note */}
            <div className="bg-white  min-w-[320px] md:min-w-[400px] text-black sm:text-base text-[14px] font-semibold sm:p-4 p-3 text-left rounded-md border-l-4 border-black leading-6">
              <strong>Note:</strong>{" "}
              {!loading && user === "Submitted" && (
                <span>
                  Your proof of membership has been submitted for review.{" "}
                  <p className="mt-3 text-black sm:text-base text-[14px] font-semibold    leading-6">
                    You’ll receive an email once your verification is approved.
                    Once verified, you’ll be issued your Prophytes Number — a
                    unique number assigned in the order of verification, used
                    for future activations, exclusive recognition, and direct
                    member connections.
                  </p>
                </span>
              )}
              {!loading && !user && (
                <span>
                  Once verified, you'll receive your Prophytes Number — your
                  official number will be assigned by order of verification and
                  used across future activations and connections.{" "}
                  <p className="mt-3 text-black sm:text-base text-[14px] font-semibold    leading-6">
                    Lower numbers will receive special recognition and
                    deference.
                  </p>
                </span>
              )}
              {!loading &&
                user === "Resubmit" &&
                `Please re-upload your "Membership Proof" Membership ID or Certificate with State Approved ID, and make sure the picture is perfectly readable`}
              {!loading &&
                user === "Denied" &&
                `Membership Proof has been denied. Contact to Prophytes Support team if something goes wrong`}
            </div>

            {!loading && user !== "Submitted" && (
              <Link
                href="/account-status/update"
                className="text-lg font-medium text-blue-400 underline cursor-pointer "
                style={{ marginTop: "20px" }}
              >
                {user === "Resubmit" || user === "Denied"
                  ? "Re-upload Membership Proof?"
                  : "Upload Membership Proof"}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
