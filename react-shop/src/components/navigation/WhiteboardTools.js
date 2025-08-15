// components/WhiteboardTools.jsx
import React from "react";

const WhiteboardTools = ({
  tool,
  setTool,
  color,
  setColor,
  strokeWidth,
  setStrokeWidth,
  onExport,
}) => {
  return (
    <div className="flex flex-wrap lg:flex-col gap-4 p-4 bg-gray-100 rounded-xl h-full">
      <button
        className={`px-4 py-2 rounded-md transition-all ${
          tool === "pen" ? "bg-blue-500 text-white" : "bg-white border"
        }`}
        onClick={() => setTool("pen")}
      >
        Pen
      </button>

      <button
        className={`px-4 py-2 rounded-md transition-all ${
          tool === "eraser" ? "bg-blue-500 text-white" : "bg-white border"
        }`}
        onClick={() => setTool("eraser")}
      >
        Eraser
      </button>

      <label className="flex flex-col text-sm">
        Color
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-10 h-10 border-none"
        />
      </label>

      <label className="flex flex-col text-sm w-24">
        Stroke
        <input
          type="range"
          min="1"
          max="20"
          value={strokeWidth}
          onChange={(e) => setStrokeWidth(Number(e.target.value))}
        />
      </label>

      <button
        onClick={onExport}
        className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
      >
        Export PNG
      </button>
    </div>
  );
};

export default WhiteboardTools;
