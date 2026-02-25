"use client";

import { getSocket } from "@/src/socket";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

export default function SocketProvider({ children }) {
  const connectedOnceRef = useRef(false);
  const reduxToken = useSelector((state) => state.user.token);

  useEffect(() => {
    if (!reduxToken) return;

    const socket = getSocket();

    const setAuthAndConnect = () => {
      // Always reset auth
      socket.auth = { token: reduxToken };

      // If already connected, disconnect first
      if (socket.connected) {
        socket.disconnect();
      }

      // Then connect fresh
      socket.connect();
    };

    const onConnect = () => {
      connectedOnceRef.current = true;
    };

    socket.off("connect", onConnect);
    socket.on("connect", onConnect);

    // Always reconnect with the latest token
    setAuthAndConnect();

    // 5-second check if still connected
    const checkInterval = setInterval(() => {
      if (!socket.connected) {
        setAuthAndConnect();
      }
    }, 5000);

    const onFocus = () => setAuthAndConnect();
    const onOnline = () => setAuthAndConnect();
    const onVisible = () => {
      if (document.visibilityState === "visible") {
        setAuthAndConnect();
      }
    };

    window.addEventListener("focus", onFocus);
    window.addEventListener("online", onOnline);
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      clearInterval(checkInterval);
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("online", onOnline);
      document.removeEventListener("visibilitychange", onVisible);
      socket.off("connect", onConnect);
    };
  }, [reduxToken]); // 👈 only depends on fresh token

  return children;
}
