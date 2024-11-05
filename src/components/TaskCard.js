import React from 'react';
import '../styles/TaskCard.css';
import UserIcon from '../components/UserIcon';
import { LuMoreHorizontal } from 'react-icons/lu';
import { getStatusIcon } from '../utils/helper';

function TaskCard({ ticket, userData, hideStatusIcon = false, hideProfileIcon = false }) {
  if (!ticket) {
    console.error("Card component received undefined 'ticket' prop.");
    return null;
  }

  return (
    <div className="card">
      <div className="top-container">
        {/* Ticket ID */}
        <div className="ticket-id">{ticket.id || 'No ID'}</div>

        {/* Profile Icon */}
        {!hideProfileIcon && userData && (
          <UserIcon name={userData.name || 'Unknown'} /> 
        )}
      </div>

      <div className="middle-container">
        {/* Status Icon */}
        {!hideStatusIcon && getStatusIcon(ticket.status || 'default')}

        {/* Ticket Title */}
        <div className="title">{ticket.title || 'Untitled Task'}</div>
      </div>

      <div className="bottom-container">
        {/* More Options Icon */}
        <div className="more-icon-container">
          <LuMoreHorizontal color="#797d84" />
        </div>

        {/* Tags */}
        {Array.isArray(ticket.tag) && ticket.tag.length > 0 ? (
          ticket.tag.map((t, index) => (
            <div key={index} className="tag-container">
              <div className="tag-icon"></div>
              <div className="tag-text">{t}</div>
            </div>
          ))
        ) : (
          <div className="no-tags">No tags available</div>
        )}
      </div>
    </div>
  );
}

export default TaskCard;
