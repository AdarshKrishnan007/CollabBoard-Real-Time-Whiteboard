import React from "react";
import "./DashCard.css";
function DashCard({ cardName }) {
  return (
    <div className="top-card">
      <img
        src="/images/groups-svgrepo-com.svg"
        alt="no-icon"
        style={{ width: "30px", height: "30px" }}
      />

      <h3>{cardName}</h3>
    </div>
  );
}

export default DashCard;
