import React from "react";

import "./navbar.css";
import MenuSearch from "./MenuSearch";
function Navbar({ className }) {
  return (
    <div className={`navbar ${className}`}>
      <div className="left-side">
        <h3>Let's Collab</h3>
      </div>
      <div className="right-side">
        <img
          src="/images/groups-svgrepo-com.svg"
          className="nav-logo-img"
          alt="not visible"
        />

        <MenuSearch />
        <img
          src="/images/arrow-right-circle-svgrepo-com.svg"
          className="nav-logo-img"
          alt="not visible"
        />
      </div>
    </div>
  );
}

export default Navbar;
