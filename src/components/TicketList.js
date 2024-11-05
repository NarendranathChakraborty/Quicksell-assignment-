// src/components/TicketList.js
import React from 'react';
import TaskCard from './TaskCard'; // Import the TaskCard component
import '../styles/TicketCard.css';

// Import your icons from the assets folder
import backlogIcon from '../assets/Backlog.svg';
import todoIcon from '../assets/To-do.svg';
import inProgressIcon from '../assets/in-progress.svg';
import doneIcon from '../assets/Done.svg';
import canceledIcon from '../assets/Cancelled.svg';
import plusIcon from '../assets/add.svg';
import dotsIcon from '../assets/3 dot menu.svg';

function TicketList({ tickets }) {
  const statusGroups = {
    backlog: [],
    todo: [],
    inProgress: [],
    done: [],
    canceled: []
  };

  tickets.forEach(ticket => {
    switch (ticket.status) {
      case 'Backlog':
        statusGroups.backlog.push(ticket);
        break;
      case 'Todo':
        statusGroups.todo.push(ticket);
        break;
      case 'In Progress':
        statusGroups.inProgress.push(ticket);
        break;
      case 'Done':
        statusGroups.done.push(ticket);
        break;
      case 'Canceled':
        statusGroups.canceled.push(ticket);
        break;
      default:
        break;
    }
  });

  const renderStatusColumn = (title, icon, tickets) => (
    <div className="kanban-column">
      <div className="column-header">
        <img src={icon} alt={`${title} icon`} className="status-icon" />
        <span>{title}</span>
        <div className="column-actions">
          <img src={plusIcon} alt="Add" className="action-icon" />
          <img src={dotsIcon} alt="More options" className="action-icon" />
        </div>
      </div>
      {tickets.map((ticket, index) => (
        <TaskCard key={index} task={ticket} /> // Use TaskCard to display each ticket
      ))}
    </div>
  );

  return (
    <div className="kanban-board">
      {renderStatusColumn('Backlog', backlogIcon, statusGroups.backlog)}
      {renderStatusColumn('Todo', todoIcon, statusGroups.todo)}
      {renderStatusColumn('In Progress', inProgressIcon, statusGroups.inProgress)}
      {renderStatusColumn('Done', doneIcon, statusGroups.done)}
      {renderStatusColumn('Canceled', canceledIcon, statusGroups.canceled)}
    </div>
  );
}

export default TicketList;
