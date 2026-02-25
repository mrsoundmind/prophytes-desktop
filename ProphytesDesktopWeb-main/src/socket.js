// src/socket.js
"use client";
import Cookies from "js-cookie";
import { io } from "socket.io-client";

let socket = null;

export const getSocket = () => {
  if (!socket) {
    const url = process.env.NEXT_PUBLIC_SOCKET_URL;
    if (!url) {
      console.warn("NEXT_PUBLIC_SOCKET_URL is not set");
    }

    socket = io(url, {
      autoConnect: false,
      transports: ["websocket"],
      withCredentials: true,
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 500,
      reconnectionDelayMax: 8000,
      timeout: 15000,
    });

    const setAuthFromCookie = () => {
      const token =
        Cookies.get("__token") || localStorage.getItem("token") || "";
      socket.auth = { token };
    };

    // Refresh token before each reconnect attempt
    socket.on("reconnect_attempt", () => setAuthFromCookie());

    // Helper to connect with fresh token
    socket.setAuthAndConnect = () => {
      setAuthFromCookie();
      if (!socket.connected) socket.connect();
    };
  }
  return socket;
};
