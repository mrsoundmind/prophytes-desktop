"use client";

import {
  useGetNotificationsQuery,
  useMarkAllNotificationsAsReadMutation,
} from "@/src/redux/services/notificationApi";
import { setNotification } from "@/src/redux/slices/NotificationSlice";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ConnectionNotificationCard from "../ConnectionNotificationCard";
import MessageNotificationCard from "../MessageNotificationCard";
import { ConnectionAlert } from "@/src/utils/SuccessAlert";

export default function Notification({ userId, orgColor }) {
  const [show, setShow] = useState(false);
  const [visibleCount, setVisibleCount] = useState(10);
  const [isClient, setIsClient] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [notificationAlert, setNotificationAlert] = useState(null);
  const [browserInfo, setBrowserInfo] = useState(null);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();

  // Fetch notifications
  const { data, error, isLoading, refetch } = useGetNotificationsQuery({
    userId,
    limit: 10,
    skip: 0,
    sort: "desc",
  });

  const [markAllNotification, markAllNotificationRes] =
    useMarkAllNotificationsAsReadMutation();

  const notifications = data?.data?.notifications || [];

  const newNotification = useSelector(
    (state) => state.notification.notification
  );

  // Types
  const connectionTypes = [
    "CONNECTION_REQUEST",
    "CONNECTION_ACCEPTED",
    "CONNECTION_REJECTED",
    "CONNECTION_CANCELLED",
    "CONNECTION_REMOVED",
  ];
  const messageTypes = ["MESSAGE"];
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Actions
  const testNotification = async () => {
    if (!isClient || !notificationAlert) return;
    try {
      await notificationAlert.initializeAudio();
      await notificationAlert.showNotification("Test Notification", {
        body: "This is a test notification with sound!",
        tag: "test",
      });
    } catch (e) {
      console.error("Test notification failed:", e);
    }
  };

  const markAllAsRead = () => {
    const unreadIds = notifications
      .filter((n) => !n.isRead)
      .map((n) => Number(n.id));
    markAllNotification({ notificationIds: unreadIds });
  };

  // Mount flag
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Initialize notification module (sound + permission)
  useEffect(() => {
    if (!isClient) return;

    const initNotifications = async () => {
      try {
        const { default: notificationAlertModule } = await import(
          "@/src/utils/notificationAlert"
        );
        setNotificationAlert(notificationAlertModule);

        const info = notificationAlertModule.getCompatibilityInfo();
        setBrowserInfo(info);

        const muteStatus = notificationAlertModule.getMuteStatus();
        setIsMuted(muteStatus);

        // Request permission automatically if still default
        if (typeof window !== "undefined" && "Notification" in window) {
          if (Notification.permission === "default") {
            await notificationAlertModule.requestPermission();
          }
        }

        await notificationAlertModule.initializeAudio();
      } catch (error) {
        console.error("Failed to initialize notifications:", error);
      }
    };

    initNotifications();
  }, [isClient]);

  // One-time silent gesture unlock (covers Safari/iOS & autoplay)
  useEffect(() => {
    if (!isClient || !notificationAlert) return;

    const unlock = async () => {
      try {
        // If permission is still default, try requesting in-gesture
        if (typeof window !== "undefined" && "Notification" in window) {
          if (Notification.permission === "default") {
            try {
              await notificationAlert.ensurePermissionInGesture();
            } catch (e) {
             
            }
          }
        }

        await notificationAlert.resumeAudioContext?.();
        await notificationAlert.primeAudio?.();
      } catch (e) {
        console.warn("Gesture unlock failed:", e);
      }
    };

    const handler = () => {
      unlock();
      window.removeEventListener("click", handler, true);
      window.removeEventListener("keydown", handler, true);
      window.removeEventListener("touchstart", handler, true);
    };

    window.addEventListener("click", handler, true);
    window.addEventListener("keydown", handler, true);
    window.addEventListener("touchstart", handler, true);

    return () => {
      window.removeEventListener("click", handler, true);
      window.removeEventListener("keydown", handler, true);
      window.removeEventListener("touchstart", handler, true);
    };
  }, [isClient, notificationAlert]);

  // Handle incoming notifications
  useEffect(() => {
    if (!isClient || !userId || !newNotification) return;

    // Handle incoming notifications
    const onNotif = async (notif) => {
      try {
        refetch();
        await notificationAlert.initializeAudio();
        await notificationAlert.showNotification(notif.content.title, {
          body: notif.content.preview,
          tag: notif.type,
        });
        // console.log("onNotif", notif);
        // Do not call playSound again; showNotification already plays sound
      } catch (e) {
        console.error("Failed to show notification:", e);
      } finally {
        dispatch(setNotification({}));
      }
    };

    if (Object.keys(newNotification).length > 0) {
      onNotif(newNotification);
    }

    if (newNotification?.type === "CONNECTION_REQUEST") {
      ConnectionAlert(newNotification.content.preview, newNotification.id);
    }
  }, [isClient, userId, notificationAlert, refetch, newNotification, dispatch]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggleMute = () => {
    if (!notificationAlert) return;
    try {
      const newMuteStatus = notificationAlert.toggleMute();
      setIsMuted(newMuteStatus);
    } catch (e) {
      console.error("Failed to toggle mute:", e);
    }
  };

  // Mute/Unmute Icon
  const MuteIcon = ({ isMuted, onClick }) => (
    <button
      onClick={onClick}
      className={`p-2 rounded-full transition-all duration-200 ${
        isMuted
          ? "bg-red-100 hover:bg-red-200 text-red-600"
          : "bg-green-100 hover:bg-green-200 text-green-600"
      }`}
      title={
        isMuted
          ? "Notifications are muted - Click to unmute"
          : "Notifications are active - Click to mute"
      }
    >
      {isMuted ? (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
          />
        </svg>
      ) : (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
          />
        </svg>
      )}
    </button>
  );

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell */}
      <div
        onClick={() => setShow((s) => !s)}
        className="relative flex items-center justify-center w-12 h-12 bg-white border-2 border-gray-200 rounded-full cursor-pointer hover:border-gray-300 "
        style={{
          outline:
            process.env.NODE_ENV === "development" ? "1px solid red" : "none",
        }}
      >
        <svg
          className="w-6 h-6 text-black"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-5-5.917V5a1 1 0 10-2 0v.083A6 6 0 006 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
          />
        </svg>
        {unreadCount > 0 && (
          <span
            className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs text-white rounded-full"
            style={{ backgroundColor: `#${orgColor}` }}
          >
            {unreadCount}
          </span>
        )}
      </div>

      {/* Dropdown */}
      {show && (
        <div className="absolute sm:right-0 -right-16 mt-6 sm:w-[400px] w-[320px] bg-white shadow-lg rounded-[16px] z-10">
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <h3 className="text-xl font-bold text-black">Notifications</h3>
            {isClient && (
              <div className="flex items-center gap-2">
                <MuteIcon isMuted={isMuted} onClick={toggleMute} />
                {/* <button
                  onClick={testNotification}
                  className="px-3 py-1 text-sm text-blue-600 transition-colors bg-blue-100 rounded-full hover:bg-blue-200"
                  disabled={!notificationAlert}
                  title={
                    notificationAlert
                      ? "Send a test notification"
                      : "Initializing..."
                  }
                >
                  Test
                </button> */}
              </div>
            )}
          </div>

          {/* Muted banner */}
          {isClient && isMuted && (
            <div className="px-4 py-2 border-b bg-red-50">
              <p className="flex items-center gap-2 text-sm text-red-600">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                Notification sounds are muted
              </p>
            </div>
          )}

          {/* Loading and error states */}
          {isLoading && (
            <div className="px-4 py-8 text-center">
              <div className="inline-block w-6 h-6 border-2 border-gray-300 rounded-full border-t-blue-600 animate-spin"></div>
              <p className="mt-2 text-sm text-gray-600">
                Loading notifications...
              </p>
            </div>
          )}
          {error && (
            <div className="px-4 py-4 border-b bg-red-50">
              <p className="text-sm text-red-600">
                Failed to load notifications:{" "}
                {error?.message || "Unknown error"}
              </p>
            </div>
          )}

          {/* List */}
          <div className="relative max-h-[400px] overflow-y-auto overflow-x-hidden">
            {!isLoading && !error && notifications.length === 0 ? (
              <div className="p-8 text-center">
                <svg
                  className="w-12 h-12 mx-auto mb-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-5-5.917V5a1 1 0 10-2 0v.083A6 6 0 006 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <p className="text-base font-semibold text-gray-600 sm:text-xl">
                  No notifications at this moment!
                </p>
                <p className="mt-2 text-sm text-gray-500">
                  You're all caught up 🎉
                </p>
              </div>
            ) : (
              <>
                {notifications.map((notification, index) => {
                  // Render connection-specific card
                  if (connectionTypes.includes(notification.type)) {
                    return (
                      <ConnectionNotificationCard
                        key={notification.id || index}
                        orgColor={orgColor}
                        notification={notification}
                        onActionComplete={() => {
                          // Refetch list after accept/reject updates
                          refetch();
                        }}
                      />
                    );
                  } else if (messageTypes.includes(notification.type)) {
                    return (
                      <MessageNotificationCard
                        key={notification.id || index}
                        orgColor={orgColor}
                        notification={notification}
                        onActionComplete={() => {
                          // Refetch list after accept/reject updates
                          refetch();
                        }}
                      />
                    );
                  }
                  // Add other types here when needed
                  return null;
                })}
              </>
            )}

            {visibleCount < notifications.length && (
              <div className="sticky bottom-0 pt-2 pb-4 pl-4 pr-2 bg-white">
                <button
                  onClick={() => setVisibleCount((prev) => prev + 10)}
                  className="w-full sm:py-4 py-[11px] sm:text-base text-[14px] text-black font-bold bg-[#000000]/20 rounded-[20px] hover:bg-[#000000]/30 transition-colors"
                >
                  See previous notifications (
                  {notifications.length - visibleCount} more)
                </button>
              </div>
            )}
          </div>

          {/* Footer */}
          {isClient && notificationAlert && unreadCount > 0 && (
            <div className="px-4 py-3 border-t bg-gray-50 rounded-[16px]">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">
                  {unreadCount} unread notification
                  {unreadCount !== 1 ? "s" : ""}
                </span>
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-gray-600 hover:text-gray-800"
                >
                  {markAllNotificationRes.isLoading
                    ? "Loading..."
                    : "Mark all as read"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
