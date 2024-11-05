// src/components/TaskCard.js
import React from 'react';
import '../styles/TaskCard.css'; // Make sure to create this CSS file for styling

function TaskCard({ task }) {
  return (
    <div className="task-card">
      <div className="task-identifier">{task.identifier}</div>
      <div className="task-description">{task.description}</div>
      <div className="task-label">
        <img src={require('../assets/SVG - Urgent Priority grey.svg').default} alt="Label" className="label-icon" />
        <span>{task.label}</span>
      </div>
      <div className="assignee-avatar">
        <img src={task.assignee.avatarUrl} alt={task.assignee.name} className="avatar" />
      </div>
    </div>
  );
}

export default TaskCard;
