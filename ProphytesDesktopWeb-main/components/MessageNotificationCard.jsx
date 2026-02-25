"use client";

import { useMarkNotificationAsReadMutation } from "@/src/redux/services/notificationApi";
import { ErrorAlert } from "@/src/utils/ErrorAlert";
import notificationTimeStamp from "@/src/utils/notificationTimeStamp";
import { SuccessAlert } from "@/src/utils/SuccessAlert";

export default function MessageNotificationCard({
  notification,
  orgColor, // optional callback after accept/reject to refetch
}) {
  // RTK mutations
  const [markNotificationAsRead, { isLoading: isMarking }] =
    useMarkNotificationAsReadMutation();

  // Local loading states for buttons

  // New enum types you’re using from backend
  const messageTypes = ["MESSAGE"];

  // Use structured payload (no string parsing)
  const avatar =
    notification?.sender?.avatar ||
    notification?.content?.metadata?.avatar ||
    "/default-avatar.png";
  const title = notification?.content?.title || "Message";
  const preview = notification?.content?.preview || "";
  const displayTime =
    notification?.createdAt ||
    notification?.lastEventAt ||
    new Date().toISOString();

  // Re-attach your “click to mark as read” with toasts
  const handleNotificationClick = async () => {
    if (!notification.isRead) {
      try {
        const res = await markNotificationAsRead(notification.id).unwrap();
        SuccessAlert(res?.message || "Notification marked as read");
      } catch (err) {
        ErrorAlert(err?.data?.error || "Failed to mark notification as read");
      }
    }
  };

  // Keep your old visibility rule: hide non-connection, and hide read REQUEST cards
  if (!messageTypes.includes(notification.type)) {
    return null;
  }

  return (
    <div
      className="relative flex items-center gap-3 px-4 py-3 border-b border-[#02020208] cursor-pointer hover:bg-gray-50 transition-colors duration-200"
      style={{
        backgroundColor: !notification.isRead ? `#eef6fc7a` : undefined,
      }}
      onClick={handleNotificationClick}
    >
      <img
        src={avatar}
        alt={notification?.sender?.fullName || "User"}
        className="object-cover w-12 h-12 rounded-full"
      />

      <div className="flex-1">
        <p className="text-base font-semibold text-black">{preview || title}</p>

        <p className="mt-1 text-sm text-gray-500">
          {notificationTimeStamp(displayTime)}
        </p>
      </div>

      {/* Unread blue dot */}
      {!notification.isRead && (
        <div
          className="absolute right-1.5 w-2 h-2 rounded-full top-1/2"
          style={{ backgroundColor: `#${orgColor}` }}
        />
      )}
    </div>
  );
}
