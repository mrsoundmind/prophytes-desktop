"use client";
import React from "react";
import { useRouter } from "next/navigation";
import MemberButtonSkeleton from "../skeleton/MemberButtonSkeleton";
import { useGetConnectionStatusQuery } from "@/src/redux/services/connectionApi";
import Linkicon from "@/public/img/icon/Linkicon";
import { useUserInfoQuery } from "@/src/redux/services/userApi";

const ActionButtonMobile = ({
  memberId,
  handleConnect,
  isPremium,
  connRequestloading,
}) => {
  const [connectedAlready, setConnectedAlready] = React.useState(false);
  const [connectedAlreadyMsg, setConnectedAlreadyMsg] = React.useState("");

  const router = useRouter();
  const { data: userInfo, isLoading: user_loading } = useUserInfoQuery();
  const { data: memberConnection, isLoading: memberConnectionLoading } =
    useGetConnectionStatusQuery(memberId);

  React.useEffect(() => {
    const status = memberConnection?.data?.connection?.status;
    if (memberConnection && memberConnection?.status === 200) {
      setConnectedAlready(true);
      setConnectedAlreadyMsg(
        status === "pending" ? "Request sent." : "connected!"
      );
    } else {
      setConnectedAlready(false);
      setConnectedAlreadyMsg("");
    }
  }, [memberConnection]);

  if (user_loading) {
    return <MemberButtonSkeleton />;
  }

  return (
    <div className="xs:flex items-center sm:gap-[30px] gap-4 sm:mt-0 mt-1">
      <div className="relative inline-block mt-4 group xs:mt-0">
        <button
          onClick={() => {
            userInfo?.user ? handleConnect() : router.push("/signin");
          }}
          className={`group relative flex xs:gap-[10px] gap-[7px] items-center font-inter
      sm:text-[16px] text-[14px]
      transition-all duration-500 ease-out
      bg-white
      after:content-[''] after:absolute after:left-auto after:right-0 after:bottom-0
      after:h-full after:z-[0] after:w-0
      xs:after:py-[15px] after:py-[11px]
      after:transition-[width] after:duration-[500ms] after:ease-[cubic-bezier(0.25,0.8,0.25,1)]
      after:rounded-full
      hover:after:w-full hover:after:left-0 hover:after:right-auto
      hover:after:border hover:after:overflow-hidden hover:after:border-black
      ${
        isPremium
          ? "text-black  after:bg-black group-hover:border-transparent"
          : ""
      }
      leading-5 font-bold sm:py-[15px] py-[11px] sm:px-5 px-[13px]
      border rounded-full overflow-hidden`}
        >
          <Linkicon
            className={`z-[999] relative ${
              isPremium
                ? "text-black group-hover:text-white"
                : "text-white group-hover:text-black"
            }`}
          />
          {connectedAlready ? (
            <span
              className={`z-[999] text-sm ${
                isPremium ? "group-hover:text-white" : "group-hover:text-black"
              }`}
            >
              {`${connectedAlreadyMsg || "Linked!"}`}
            </span>
          ) : (
            <span
              className={`z-[999] ${
                isPremium ? "group-hover:text-white" : "group-hover:text-black"
              }`}
              // onClick={handleConnect}
            >
              {connRequestloading ? `Loading...` : `Link`}
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default ActionButtonMobile;
