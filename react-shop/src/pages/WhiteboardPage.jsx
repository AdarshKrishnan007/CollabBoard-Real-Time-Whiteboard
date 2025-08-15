// pages/WhiteboardPage.jsx
import React, { useRef, useState, useEffect } from "react";
import WhiteboardTools from "../components/navigation/WhiteboardTools";
import "../components/navigation/WhiteboardTools.css";
import PermissionsPanel from "./PermissionsPanel";
import socket from "../components/integration/socket";
import { useParams } from "react-router-dom";
import "./WhiteboardPage.css";

const WhiteboardPage = () => {
  const { roomId } = useParams(); // Room ID from URL
  const canvasRef = useRef(null);
  const [tool, setTool] = useState("pen");
  const [color, setColor] = useState("#000000");
  const [strokeWidth, setStrokeWidth] = useState(3);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isLeader, setIsLeader] = useState(false); // Role flag
  const [sessionActive, setSessionActive] = useState(false); // Only allow drawing if active
  const [participants, setParticipants] = useState([]); // ✅ never undefined

  useEffect(() => {
    socket.connect();

    socket.emit("join-room", { roomId });

    // Get role from server
    socket.on("role", ({ isLeader, sessionActive }) => {
      setIsLeader(isLeader);
      setSessionActive(sessionActive);
    });

    // Listen for drawing updates
    socket.on("draw", handleIncomingDraw);

    // Listen for session status updates
    socket.on("session-status", ({ active }) => {
      setSessionActive(active);
    });

    // Update participants list
    socket.on("participants-update", (list) => {
      setParticipants(list);
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId]);

  const handleIncomingDraw = ({
    x,
    y,
    color,
    strokeWidth,
    tool,
    isDrawing,
  }) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    if (!isDrawing) {
      ctx.beginPath();
      return;
    }

    ctx.strokeStyle = tool === "pen" ? color : "#fff";
    ctx.lineWidth = strokeWidth;
    ctx.lineCap = "round";
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const draw = (e) => {
    if (!isDrawing || !sessionActive) return; // Block if session inactive
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    ctx.strokeStyle = tool === "pen" ? color : "#fff";
    ctx.lineWidth = strokeWidth;
    ctx.lineCap = "round";
    ctx.lineTo(x, y);
    ctx.stroke();

    socket.emit("draw", {
      roomId,
      x,
      y,
      color,
      strokeWidth,
      tool,
      isDrawing: true,
    });
  };

  const startDrawing = (e) => {
    if (!sessionActive) return;
    const ctx = canvasRef.current.getContext("2d");
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);

    socket.emit("draw", {
      roomId,
      x: e.nativeEvent.offsetX,
      y: e.nativeEvent.offsetY,
      color,
      strokeWidth,
      tool,
      isDrawing: true,
    });
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    socket.emit("draw", { roomId, isDrawing: false });
  };

  const exportImage = () => {
    const link = document.createElement("a");
    link.download = "whiteboard.png";
    link.href = canvasRef.current.toDataURL();
    link.click();
  };

  // Leader-only controls
  const startSession = () => {
    socket.emit("session-control", { roomId, active: true });
  };

  const endSession = () => {
    socket.emit("session-control", { roomId, active: false });
  };

  return (
    <div className="whiteboard-layout flex h-[90vh]">
      <aside className="tool-sidebar w-64 bg-gray-50 p-2 rounded-lg shadow-md">
        <WhiteboardTools
          tool={tool}
          setTool={setTool}
          color={color}
          setColor={setColor}
          strokeWidth={strokeWidth}
          setStrokeWidth={setStrokeWidth}
          onExport={exportImage}
        />

        {isLeader && (
          <div className="mt-4 space-y-2">
            <button
              className="bg-green-500 text-white px-4 py-2 rounded"
              onClick={startSession}
            >
              Start Session
            </button>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded"
              onClick={endSession}
            >
              End Session
            </button>
          </div>
        )}

        <p className="mt-4 text-sm">
          Session Status:{" "}
          <span className={sessionActive ? "text-green-600" : "text-red-600"}>
            {sessionActive ? "Active" : "Inactive"}
          </span>
        </p>
      </aside>

      <div className="section" style={{ display: "flex", gap: "2px" }}>
        <main className="whiteboard-canvas flex-1 p-4">
          <div className="canvas-bg">
            <canvas
              ref={canvasRef}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              className="w-full h-full cursor-crosshair"
              height={500}
              width={800}
            />
          </div>
        </main>
        <PermissionsPanel participants={participants} />
      </div>
    </div>
  );
};

export default WhiteboardPage;
