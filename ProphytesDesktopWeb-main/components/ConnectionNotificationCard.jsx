"use client";

import {
  useMarkNotificationAsReadMutation,
  useUpdateConnectionMutation,
} from "@/src/redux/services/notificationApi";
import notificationTimeStamp from "@/src/utils/notificationTimeStamp";
import { SuccessAlert } from "@/src/utils/SuccessAlert";
import { ErrorAlert } from "@/src/utils/ErrorAlert";
import { useEffect, useState } from "react";
import ConnectionButton from "./ConnectionButton";

export default function ConnectionNotificationCard({
  notification,
  orgColor, // optional callback after accept/reject to refetch
}) {
  // RTK mutations
  const [markNotificationAsRead, { isLoading: isMarking }] =
    useMarkNotificationAsReadMutation();

  // New enum types from backend
  const connectionTypes = [
    "CONNECTION_REQUEST",
    "CONNECTION_ACCEPTED",
    "CONNECTION_REJECTED",
    "CONNECTION_CANCELLED",
    "CONNECTION_REMOVED",
  ];

  // Structured data
  const avatar =
    notification?.sender?.avatar ||
    notification?.content?.metadata?.avatar ||
    "/default-avatar.png";
  const title = notification?.content?.title || "Connection";
  const preview = notification?.content?.preview || "";
  const displayTime =
    notification?.createdAt ||
    notification?.lastEventAt ||
    new Date().toISOString();

  const isActionable = notification.type === "CONNECTION_REQUEST";

  // Handle mark-as-read click
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

  // Skip rendering non-connection notifications
  if (!connectionTypes.includes(notification.type)) return null;

  return (
    <div
      className="relative flex  gap-3 px-4 py-3 border-b border-[#02020208] cursor-pointer hover:bg-gray-50 transition-colors duration-200"
      style={{
        backgroundColor: !notification.isRead ? `#eef6fc7a` : undefined,
      }}
      onClick={handleNotificationClick}
    >
      {/* Avatar */}
      <img
        src={avatar}
        alt={notification?.sender?.fullName || "User"}
        className="flex-shrink-0 object-cover w-12 h-12 rounded-full"
      />

      {/* Text section */}
      <div className="flex-1 min-w-0">
        <p className="text-base font-semibold text-black break-words break-all whitespace-normal">
          {preview || title}
        </p>

        <p className="mt-1 text-sm text-gray-500">
          {notificationTimeStamp(displayTime)}
        </p>

        {isActionable && (
          <ConnectionButton
            notificationId={notification.id}
            isdiffrent={false}
            orgColor={orgColor}
            className="hover:text-white "
          />
        )}
      </div>

      {/* Unread dot */}
      {!notification.isRead && (
        <div
          className="absolute right-1.5 w-2 h-2 rounded-full top-1/2"
          style={{ backgroundColor: `#${orgColor}` }}
        />
      )}
    </div>
  );
}
