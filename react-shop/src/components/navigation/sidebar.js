// src/components/Sidebar.js
import "./sidebar.css";
import { NavLink } from "react-router-dom";

const Sidebar = ({ className }) => {
  return (
    <div className={`sidebar ${className}`}>
      <div className="sidebar-content">
        <ul className="lists">
          <li className="list">
            <NavLink to="/dashboard" className="nav-link">
              <i className="bx bx-home-alt icon"></i>
              <span className="link">Dashboard</span>
            </NavLink>
          </li>
          <li className="list">
            <NavLink to="/Boards" className="nav-link">
              <i className="bx bx-bar-chart-alt-2 icon"></i>
              <span className="link">Boards</span>
            </NavLink>
          </li>
          <li className="list">
            <a
              href="\
            "
              className="nav-link"
            >
              <i className="bx bx-bell icon"></i>
              <span className="link">Templates</span>
            </a>
          </li>
          <li className="list">
            <a
              href="\
            "
              className="nav-link"
            >
              <i className="bx bx-message-rounded icon"></i>
              <span className="link">Team</span>
            </a>
          </li>
        </ul>
        <div className="bottom-cotent">
          <li className="list">
            <a
              href="\
            "
              className="nav-link"
            >
              <i className="bx bx-cog icon"></i>
              <span className="link">Settings</span>
            </a>
          </li>
          <li className="list">
            <a
              href="\
            "
              className="nav-link"
            >
              <i className="bx bx-log-out icon"></i>
              <span className="link">Logout</span>
            </a>
          </li>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
