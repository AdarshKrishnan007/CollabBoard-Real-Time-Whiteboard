import React from "react";
import CardImage from "../components/ui/Dashboard-cards/CardImage";
import { useNavigate } from "react-router-dom";
import "./Boards.css";
function Boards() {
  const navigate = useNavigate();

  const goToWhiteboard = () => {
    navigate("/whiteboard");
  };

  return (
    <div className="BoardPage">
      <div className="barButton">
        <button>All</button>
        <button>My Boards</button>
        <button>Team Boards</button>
        <button>Archived</button>
      </div>
      <div className="card-container">
        <div onClick={goToWhiteboard} style={{ cursor: "pointer" }}>
          <CardImage
            title={"Kanban Board"}
            team={"Marketing Team"}
            time={"3 hours"}
          />
        </div>

        <div onClick={goToWhiteboard} style={{ cursor: "pointer" }}>
          <CardImage
            title={"Whiteboard"}
            team={"Design Team"}
            time={"2 hours"}
          />
        </div>
      </div>
    </div>
  );
}

export default Boards;
