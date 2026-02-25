"use client";
import { useUpdateConnectionMutation } from "@/src/redux/services/notificationApi";
import { ErrorAlert } from "@/src/utils/ErrorAlert";
import { SuccessAlert } from "@/src/utils/SuccessAlert";
import { useEffect, useState } from "react";

export default function NotificationCard({ notify }) {
  const [updateConnection, { isLoading, data, error }] =
    useUpdateConnectionMutation();
  const [connectLoading, setConnectLoading] = useState(false);
  const [declineLoading, setDeclineLoading] = useState(false);

  // Parse avatar URL from body
  const extractAvatarUrl = (body) => {
    const match = body?.match(/\(avatar: (.*?)\)/);
    return match && match[1] !== "no avatar" ? match[1] : null;
  };

  // Extract message without avatar part
  const extractMessage = (body) => {
    return body?.replace(/\(avatar:.*?\)/, "")?.trim();
  };

  const handleConfirm = () => {
    setConnectLoading(true);
    const payload = { status: "connect" };
    updateConnection({ notificationId: notify.id, payload });
  };

  const handleDecline = () => {
    setDeclineLoading(true);
    const payload = { status: "rejected" };
    updateConnection({ notificationId: notify.id, payload });
  };

  useEffect(() => {
    if (data) {
      setConnectLoading(false);
      setDeclineLoading(false);
      SuccessAlert("Successfully connected");
    }
    if (error) {
      setConnectLoading(false);
      setDeclineLoading(false);
      ErrorAlert("Failed to connect");
    }
  }, [data, error]);

  return (
    <div className="flex items-center gap-3">
      <img
        src={extractAvatarUrl(notify.body)}
        alt={extractAvatarUrl(notify.body)}
        className="object-cover w-12 h-12 rounded-full"
      />
      <div className="flex-1">
        <p className="text-base font-semibold text-black">
          {extractMessage(notify.body)}
        </p>
        {/* <p className="mt-1 text-xs text-gray-500">{item.time}</p> */}
        <div className="flex gap-2 mt-3">
          <button
            disabled={connectLoading || declineLoading}
            onClick={handleConfirm}
            className="px-5 py-[10px] cursor-pointer text-base font-semibold text-white bg-black rounded-full "
          >
            {connectLoading ? "Connecting..." : "Confirm"}
          </button>
          <button
            onClick={handleDecline}
            className="px-5 py-[10px] cursor-pointer text-base font-semibold  rounded-full text-black  border border-[#E7E7EB]"
          >
            {declineLoading ? "Declining..." : "Decline"}
          </button>
        </div>
      </div>
    </div>
  );
}
