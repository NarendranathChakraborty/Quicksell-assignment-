import React from 'react';
import '../styles/TicketCard.css';

function TicketCard({ ticket }) {
  const getPriorityLabel = (priority) => {
    switch (priority) {
      case 4: return 'Urgent';
      case 3: return 'High';
      case 2: return 'Medium';
      case 1: return 'Low';
      default: return 'No Priority';
    }
  };

  return (
    <div className={`ticket-card priority-${ticket.priority}`}>
      <h3>{ticket.title}</h3>
      <p>Priority: {getPriorityLabel(ticket.priority)}</p>
    </div>
  );
}

export default TicketCard;
