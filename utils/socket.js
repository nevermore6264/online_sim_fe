import { io } from "socket.io-client";

var token = null;
if (typeof window !== "undefined") {
  token = localStorage.getItem("token");
}

export const socket = io(`https://verifysms.org/`, {
  auth: {
    token: token,
  },
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  timeout: 20000,
});

// Xử lý các sự kiện socket
socket.on("connect", () => {
  console.log("Socket connected successfully");
});

socket.on("connect_error", (error) => {
  console.error("Socket connection error:", error);
});

socket.on("disconnect", (reason) => {
  console.log("Socket disconnected:", reason);
});

socket.on("error", (error) => {
  console.error("Socket error:", error);
});
