import ConfirmSvg from "@/public/img/icon/ConfirmSvg";
import DeclineSvg from "@/public/img/icon/DeclineSvg";
import { useUpdateConnectionMutation } from "@/src/redux/services/notificationApi";
import { ErrorAlert } from "@/src/utils/ErrorAlert";
import { SuccessAlert } from "@/src/utils/SuccessAlert";
import { useEffect, useState } from "react";

export default function ConnectionButton({
  notificationId,
  requestFrom,
  isPremium,
  isdiffrent = true,
  orgColor,
  smallBtn = false,
  className,
}) {
  const [connectLoading, setConnectLoading] = useState(false);
  const [declineLoading, setDeclineLoading] = useState(false);
  // const isPremium = member?.data?.isPaid;

  const [updateConnection, { data: updateData, error: updateError }] =
    useUpdateConnectionMutation();

  // Accept request
  const handleConfirm = async () => {
    try {
      const body = {
        status: "connect",
        requestFrom,
        notificationId,
      };
      setConnectLoading(true);
      await updateConnection({
        payload: body,
      }).unwrap();
    } catch (e) {
      // handled in useEffect
    } finally {
      setConnectLoading(false);
    }
  };

  // Decline request
  const handleDecline = async () => {
    try {
      const body = {
        status: "rejected",
        requestFrom,
        notificationId,
      };
      setDeclineLoading(true);
      await updateConnection({
        notificationId: notificationId,
        payload: body,
      }).unwrap();
    } catch (e) {
      // handled in useEffect
    } finally {
      setDeclineLoading(false);
    }
  };

  // Show toasts after update, reset loaders, and notify parent to refetch
  useEffect(() => {
    if (updateData) {
      SuccessAlert("Your connection request updated!");
    }
    if (updateError) {
      ErrorAlert("Failed to update connection request");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateData, updateError]);
  return (
    <div className={`flex gap-2  ${isdiffrent ? "sm:flex-row  flex-col" : ""}`}>
      <button
        disabled={connectLoading || declineLoading}
        onClick={(e) => {
          handleConfirm();
        }}
        className={`flex items-center justify-center gap-2 text-[16px] leading-5 font-medium  cursor-pointer hover:border-transparent border hover:[background-color:var(--hover-color)]    text-base   ${
          smallBtn
            ? "flex items-center h-8 text-white border border-white/15 overflow-hidden px-1.5  rounded-full text-sm"
            : isdiffrent
            ? isPremium
              ? `flex items-center gap-2 px-8 py-4 rounded-xl text-white font-medium
       backdrop-blur-md border border-white/10 
       shadow-[inset_4px_4px_10px_rgba(0,0,0,0.6),inset_-4px_-4px_10px_rgba(255,255,255,0.1)] `
              : "text-black bg-white border-white rounded-full sm:px-10 px-6 sm:h-[52px] h-10"
            : "text-white rounded-[30px] sm:px-10 px-6 sm:h-[52px] h-10  border-black bg-black "
        }`}
        style={{
          "--hover-color": `#${orgColor}`,
        }}
      >
        {connectLoading ? "Confirm..." : "Confirm"}
        {isdiffrent && !smallBtn && (
          <ConfirmSvg
            bgColor={isPremium ? "#fff" : "#000"}
            strokeColor={isPremium ? "#000" : "#fff"}
          />
        )}
      </button>
      <button
        disabled={connectLoading || declineLoading}
        onClick={(e) => {
          handleDecline();
        }}
        className={` flex items-center justify-center gap-2 text-[16px] leading-5 font-medium  cursor-pointer border hover:[background-color:var(--hover-color)]   text-base  hover:border-transparent ${className}  ${
          smallBtn
            ? "flex items-center h-8   px-1.5  rounded-full text-sm overflow-hidden bg-white text-black"
            : isdiffrent
            ? isPremium
              ? `flex items-center gap-2 px-8 py-4 rounded-xl text-white font-medium
       backdrop-blur-md border border-white/10 
       shadow-[inset_4px_4px_10px_rgba(0,0,0,0.6),inset_-4px_-4px_10px_rgba(255,255,255,0.1)]`
              : "text-black bg-white border-white rounded-full sm:px-10 px-6 sm:h-[52px] h-10"
            : "text-black bg-white border-[#E6E6E6] rounded-full sm:px-10 px-8 sm:h-[52px] h-11"
        }`}
        style={{
          "--hover-color": `#${orgColor}`,
        }}
      >
        {isdiffrent ? (
          <span>{declineLoading ? "Declining..." : "Decline"}</span>
        ) : (
          <span>{declineLoading ? "Deleteing..." : "Delete"}</span>
        )}
        {isdiffrent && !smallBtn && (
          <DeclineSvg
            className={`${isPremium ? "text-white" : "text-black"}`}
          />
        )}
      </button>
    </div>
  );
}
