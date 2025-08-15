// PermissionsPanel.js
import React, { useState } from "react";
import "./PermissionsPanel.css";

const PermissionsPanel = ({ participants, isLeader, onPermissionChange }) => {
  return (
    <div className="panel">
      <div className="section">
        <h4>Permissions</h4>
        <div className="Permission-Field">
          {participants.map((p) => (
            <div key={p.id} className="field">
              <span className="user-name">{p.name}</span>
              <select
                value={p.permission}
                disabled={!isLeader}
                onChange={(e) => onPermissionChange(p.id, e.target.value)}
              >
                <option value="Editor">Editor</option>
                <option value="Viewer">Viewer</option>
                <option value="Owner">Owner</option>
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PermissionsPanel;
