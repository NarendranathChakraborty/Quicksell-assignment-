// src/components/SortingAndGroupingControls.js
import React, { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import DisplayIcon from '../assets/Display.svg';
import '../styles/SortingAndGroupingControls.css';

function SortingAndGroupingControls({ preferences, setPreferences }) {
  const [isDisplayOpen, setIsDisplayOpen] = useState(false);

  const toggleDisplayDropdown = () => {
    setIsDisplayOpen(!isDisplayOpen);
  };

  const handleGroupByChange = (e) => {
    setPreferences((prev) => ({ ...prev, groupBy: e.target.value }));
  };

  const handleSortOrderChange = (e) => {
    setPreferences((prev) => ({ ...prev, sortOrder: e.target.value }));
  };

  return (
    <div className="controls-container">
      <div className="dropdown display-dropdown">
        <button className="dropdown-label" onClick={toggleDisplayDropdown}>
          <img src={DisplayIcon} alt="Display Icon" className="display-icon" />
          Display <FaChevronDown className="dropdown-icon" />
        </button>

        {isDisplayOpen && (
          <div className="dropdown-menu">
            <div className="dropdown-option">
              <label htmlFor="groupBy">Group By:</label>
              <select id="groupBy" value={preferences.groupBy} onChange={handleGroupByChange}>
                <option value="status">Status</option>
                <option value="user">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="dropdown-option">
              <label htmlFor="sortOrder">Order By:</label>
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
