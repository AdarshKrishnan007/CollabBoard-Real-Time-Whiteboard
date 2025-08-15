import { io } from "socket.io-client";

// Replace with your backend URL (if local, e.g. http://localhost:5000)
const SOCKET_SERVER_URL = "http://localhost:5000";

const socket = io(SOCKET_SERVER_URL, {
  autoConnect: false, // optionally, connect manually
});

export default socket;
