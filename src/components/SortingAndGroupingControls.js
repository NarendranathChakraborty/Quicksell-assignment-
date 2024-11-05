// src/components/SortingAndGroupingControls.js
import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import DisplayIcon from '../assets/Display.svg'; // Import the SVG file
import '../styles/SortingAndGroupingControls.css';

function SortingAndGroupingControls({ preferences, setPreferences }) {
  const [isDisplayOpen, setIsDisplayOpen] = useState(false);

  // Toggle display dropdown
  const toggleDisplayDropdown = () => {
    setIsDisplayOpen(!isDisplayOpen);
  };

  // Handle changes for Grouping and Ordering
  const handleGroupByChange = (e) => {
    setPreferences((prev) => ({ ...prev, groupBy: e.target.value }));
  };

  const handleSortOrderChange = (e) => {
    setPreferences((prev) => ({ ...prev, sortOrder: e.target.value }));
  };

  return (
    <div className="controls-container">
      {/* Display Dropdown */}
      <div className="dropdown display-dropdown">
        <button className="dropdown-label" onClick={toggleDisplayDropdown}>
          <img src={DisplayIcon} alt="Display Icon" className="display-icon" />
          Display <FaChevronDown className="dropdown-icon" />
        </button>

        {/* Grouping and Ordering options shown when Display is clicked */}
        {isDisplayOpen && (
          <div className="dropdown-menu">
            {/* Grouping Setting */}
            <div className="dropdown-option">
              <label htmlFor="groupBy" className="dropdown-label">Group By:</label>
              <select id="groupBy" value={preferences.groupBy} onChange={handleGroupByChange}>
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>

            {/* Ordering Setting */}
            <div className="dropdown-option">
              <label htmlFor="sortOrder" className="dropdown-label">Order By:</label>
              <select id="sortOrder" value={preferences.sortOrder} onChange={handleSortOrderChange}>
                <option value="title">Title</option>
                <option value="priority">Priority</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SortingAndGroupingControls;
