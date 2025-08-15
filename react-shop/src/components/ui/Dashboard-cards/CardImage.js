import React from "react";
import "./DashCard.css";
function CardImage({ title, team, time }) {
  return (
    <div className="imageCard">
      <img src="" alt="no-image" />
      <div className="headTitle">
        <h2>{title}</h2>
        <h2>{team}</h2>
        <h5>edited by {time}</h5>
      </div>
    </div>
  );
}

export default CardImage;
