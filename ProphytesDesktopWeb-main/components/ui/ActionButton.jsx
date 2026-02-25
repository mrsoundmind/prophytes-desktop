"use client";
import { useGetConnectionStatusQuery } from "@/src/redux/services/connectionApi";
import { useUserInfoQuery } from "@/src/redux/services/userApi";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import ConnectionButton from "../ConnectionButton";
import MemberButtonSkeleton from "../skeleton/MemberButtonSkeleton";

const ActionButton = ({
  memberId,
  handleConnect,
  isPremium,
  orgColor,
  connRequestloading,
}) => {
  const newNotification = useSelector(
    (state) => state.notification.notification
  );
  const { id } = useParams();
  const router = useRouter();
  const { data: userInfo, isLoading: user_loading } = useUserInfoQuery();
  const {
    data: memberConnection,
    isLoading: memberConnectionLoading,
    refetch,
  } = useGetConnectionStatusQuery(memberId);

  const connectionTypes = [
    "CONNECTION_REQUEST",
    "CONNECTION_ACCEPTED",
    "CONNECTION_REJECTED",
    "CONNECTION_CANCELLED",
    "CONNECTION_REMOVED",
  ];

  useEffect(() => {
    if (connectionTypes.includes(newNotification.type)) refetch();
  }, [newNotification]);

  if (user_loading) {
    return <MemberButtonSkeleton />;
  }

  return (
    <div className="xs:flex items-center sm:gap-[30px] gap-4 ">
      <div className="relative lg:min-w-[130px] min-w-[110px] inline-block group w-full">
        {memberConnection?.data?.connection?.status === "pending" &&
        memberConnection?.data?.connection?.requestFrom !==
          userInfo?.user?.id ? (
          <ConnectionButton
            requestFrom={id}
            isPremium={isPremium}
            orgColor={orgColor}
            className="hover:text-white "
          />
        ) : (
          <button
            onClick={() => {
              userInfo?.user ? "" : router.push("/signin"), handleConnect();
            }}
            className={`group relative w-full flex hover:border-transparent  hover:[background-color:var(--hover-color)] justify-center xs:gap-[10px] gap-[7px] items-center font-inter text-[16px]  leading-5
      ${
        isPremium
          ? `flex items-center gap-2 px-8 py-4 rounded-xl text-white font-medium
       backdrop-blur-md border border-white/10 
       shadow-[inset_4px_4px_10px_rgba(0,0,0,0.6),inset_-4px_-4px_10px_rgba(255,255,255,0.1)]`
          : "text-black rounded-full border-primary after:rounded-full after:bg-white hover:after:border-white bg-white"
      }

      leading-5 font-bold sm:py-[15px] py-[14px] sm:px-5 px-[13px]
      border  overflow-hidden`}
            style={{
              "--hover-color": `#${orgColor}`,
            }}
          >
            {memberConnection?.data ? (
              <span
                className={`z-[9] ${
                  isPremium
                    ? "group-hover:text-white"
                    : "group-hover:text-black"
                }`}
              >
                {memberConnection?.data?.connection?.status === "pending"
                  ? "Request sent."
                  : memberConnection?.data?.connection?.status === "connect" &&
                    "Linked!"}
              </span>
            ) : (
              <span
                className={`z-[9] ${
                  isPremium
                    ? "group-hover:text-white"
                    : "group-hover:text-black"
                }`}
              >
                {connRequestloading ? `Loading...` : `Link`}
              </span>
            )}
            <span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 11 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`z-[9] relative  ${
                  isPremium ? "text-white" : "text-black"
                }`}
              >
                <g clipPath="url(#clip0_10366_57183)">
                  <path
                    d="M4.6441 7.61115L3.47062 8.78463C2.98412 9.27113 2.19627 9.27113 1.71018 8.78472C1.22399 8.29853 1.22399 7.5106 1.71008 7.02451L4.05745 4.67714C4.54354 4.19103 5.33147 4.19103 5.81757 4.67714C5.97961 4.83919 6.24235 4.83919 6.40439 4.67714C6.56644 4.5151 6.56644 4.25236 6.40439 4.09032C5.59419 3.28012 4.28082 3.28012 3.47062 4.09032L1.12327 6.43767C0.313075 7.24786 0.313075 8.56123 1.12327 9.37143C1.93338 10.1821 3.24684 10.1821 4.05747 9.37143L5.23095 8.19795C5.393 8.03591 5.393 7.77317 5.23095 7.61113C5.06891 7.44908 4.80615 7.4491 4.6441 7.61115Z"
                    fill="currentColor"
                  />
                  <path
                    d="M9.86367 0.628402C9.05347 -0.181798 7.73968 -0.181798 6.92948 0.628402L5.52156 2.03632C5.35951 2.19837 5.35951 2.46111 5.52156 2.62315C5.6836 2.78519 5.94634 2.78519 6.10838 2.62315L7.5163 1.21523C8.0024 0.729117 8.79073 0.729117 9.27684 1.21523C9.76294 1.70132 9.76294 2.48925 9.27684 2.97534L6.69504 5.55717C6.20892 6.04328 5.42102 6.04328 4.93492 5.55717C4.77288 5.39513 4.51014 5.39513 4.3481 5.55717C4.18605 5.71921 4.18605 5.98196 4.3481 6.144C5.15829 6.9542 6.47166 6.9542 7.28186 6.144L9.86367 3.56219C10.6739 2.75199 10.6739 1.4386 9.86367 0.628402Z"
                    fill="currentColor"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_10366_57183">
                    <rect
                      width="9.9587"
                      height="9.9587"
                      fill="currentColor"
                      transform="translate(0.515625 0.0205078)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ActionButton;
