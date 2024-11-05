// src/components/Navbar.js
import React, { useState } from "react";
import "./Navbar.css";

function Navbar({ onGroupingChange }) {
  const [selectedGroup, setSelectedGroup] = useState("Status");

  const handleGroupChange = (e) => {
    const group = e.target.value;
    setSelectedGroup(group);
    onGroupingChange(group);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <select className="navbar-dropdown" value={selectedGroup} onChange={handleGroupChange}>
          <option value="Status">By Status</option>
          <option value="User">By User</option>
          <option value="Priority">By Priority</option>
        </select>
      </div>
      <h1>Kanban Board</h1>
    </nav>
  );
}

export default Navbar;
