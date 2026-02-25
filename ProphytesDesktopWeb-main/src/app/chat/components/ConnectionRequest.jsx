import ConnectionButton from "@/components/ConnectionButton";
import { organizations } from "@/src/configs/constants";
import { useGetNotificationsQuery } from "@/src/redux/services/notificationApi";
import Image from "next/image";
import React from "react";

const ConnectionRequest = ({ userId, orgColor }) => {
  const { data, error, isLoading, refetch } = useGetNotificationsQuery({
    userId,
    limit: 10,
    skip: 0,
    type: "CONNECTION_REQUEST",
    sort: "desc",
  });

  return (
    <div>
      {data?.data?.notifications.map((user, index) => {
        const notificationId = user?.id;
        return (
          <div
            key={`${index}`}
            className="flex items-center gap-2 px-3 py-2 bg-[#1a1a1a] transition-all duration-500 ease-in-out rounded-lg cursor-pointer"
          >
            <div className="relative flex items-center justify-center w-[50px] h-[50px] overflow-hidden border-2 border-white rounded-full">
              <Image
                src={user?.sender?.avatar}
                height={50}
                width={50}
                alt={user?.sender?.fullName}
                className="w-full h-full rounded-full"
              />
            </div>
            <div className="flex-1 ml-3">
              <h4 className="2xl:text-lg text-[15px] font-bold text-white leading-[30px] line-clamp-1">
                {user?.sender?.fullName}
              </h4>
            </div>
            <div className="flex items-center gap-3">
              <ConnectionButton
                notificationId={notificationId}
                orgColor={orgColor}
                smallBtn={true}
                className="hover:text-white"
              />
            </div>
          </div>
        );
      })}
      {data?.data?.notifications?.length === 0 && (
        <div className="py-8 text-center">
          <span className="text-lg font-semibold text-white">
            No connections request found!
          </span>
        </div>
      )}
    </div>
  );
};

export default ConnectionRequest;
