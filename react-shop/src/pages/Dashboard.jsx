import React, { useState, useEffect } from "react";
import DashCard from "../components/ui/Dashboard-cards/DashCard";
import CardImage from "../components/ui/Dashboard-cards/CardImage";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  // Load whiteboards from localStorage if present, or default
  const [whiteboards, setWhiteboards] = useState(() => {
    const savedBoards = localStorage.getItem("whiteboards");
    return savedBoards
      ? JSON.parse(savedBoards)
      : [
          { id: 1, title: "Landing Page Design", time: "3 Hours" },
          { id: 2, title: "About Page Design", time: "8 Hours" },
        ];
  });

  // Update localStorage when whiteboards change
  useEffect(() => {
    localStorage.setItem("whiteboards", JSON.stringify(whiteboards));
  }, [whiteboards]);

  const createNewWhiteboard = () => {
    const newBoard = {
      id: Date.now(), // unique ID
      title: `New Whiteboard ${whiteboards.length + 1}`,
      time: "Just now",
    };
    setWhiteboards([newBoard, ...whiteboards]);
    navigate(`/whiteboard/${newBoard.id}`);
  };

  const openWhiteboard = (id) => {
    navigate(`/whiteboard/${id}`);
  };

  return (
    <div className="Dashboardstyle">
      <div className="header">
        <h1>Welcome Back Adarsh....</h1>
        <h4>Here is what happening in your workspace</h4>
        <div className="header-flex">
          <div
            style={{ cursor: "pointer" }}
            onClick={createNewWhiteboard}
            title="Create a new whiteboard session"
          >
            <DashCard cardName={"New WhiteBoard"} />
          </div>
          <DashCard cardName={"Import Template"} />
          <DashCard cardName={"Invite Team"} />
          <DashCard cardName={"Share Team Link"} />
        </div>
      </div>
      <div className="middle-section">
        <h1>Recent Boards</h1>
        <div className="Card-Image">
          {whiteboards.map((board) => (
            <div
              key={board.id}
              style={{ cursor: "pointer" }}
              onClick={() => openWhiteboard(board.id)}
            >
              <CardImage title={board.title} time={board.time} />
            </div>
          ))}
        </div>
      </div>
      <div className="bottom-section">
        <h1>Your Teams</h1>
      </div>
    </div>
  );
}

export default Dashboard;
