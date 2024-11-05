import React, { useState } from 'react';
import TaskCard from './TaskCard';
import SortingAndGroupingControls from './SortingAndGroupingControls';
import '../styles/TicketList.css';

// Import icons
import backlogIcon from '../assets/Backlog.svg';
import todoIcon from '../assets/To-do.svg';
import inProgressIcon from '../assets/in-progress.svg';
import doneIcon from '../assets/Done.svg';
import canceledIcon from '../assets/Cancelled.svg';
import plusIcon from '../assets/add.svg';
import dotsIcon from '../assets/3 dot menu.svg';

function TicketList({ tickets }) { // Receive tickets as prop
  const [preferences, setPreferences] = useState({
    groupBy: 'status', // Default grouping
    sortOrder: 'priority', // Default sorting
  });

  const groupAndSortTickets = () => {
    const groupedTickets = {
      users: {}, // For grouping by user
      priorities: {
        'No Priority': [],
        'Urgent': [],
        'High': [],
        'Medium': [],
        'Low': []
      }, // For grouping by priority
    };

    // Grouping tickets based on user preference
    tickets.forEach((ticket) => {
      // Grouping by status
      if (preferences.groupBy === 'status') {
        const groupKey = ticket.status || 'Uncategorized';
        if (!groupedTickets[groupKey]) groupedTickets[groupKey] = [];
        groupedTickets[groupKey].push(ticket);
      }

      // Grouping by user
      if (preferences.groupBy === 'user') {
        const userName = ticket.user?.name || 'Unknown User';
        if (!groupedTickets.users[userName]) groupedTickets.users[userName] = [];
        groupedTickets.users[userName].push(ticket);
      }

      // Grouping by priority
      if (preferences.groupBy === 'priority') {
        const priorityKey = ticket.priority || 'No Priority';
        groupedTickets.priorities[priorityKey].push(ticket);
      }
    });

    // Sorting tickets within each group based on the selected sort order
    const sortTickets = (group) => {
      group.sort((a, b) => {
        if (preferences.sortOrder === 'priority') {
          return b.priority - a.priority; // Sort by priority
        } else {
          return a.title.localeCompare(b.title); // Sort by title
        }
      });
    };

    // Sort each group
    Object.keys(groupedTickets).forEach((key) => {
      if (key === 'users') {
        Object.values(groupedTickets.users).forEach(sortTickets);
      } else if (key === 'priorities') {
        Object.values(groupedTickets.priorities).forEach(sortTickets);
      } else {
        sortTickets(groupedTickets[key]);
      }
    });

    return groupedTickets;
  };

  const groupedTickets = groupAndSortTickets();

  const renderUserColumn = (userName, tickets) => (
    <div className="kanban-column" key={userName}>
      <div className="column-header">
        <span>{userName}</span>
        <div className="column-actions">
          <img src={plusIcon} alt="Add" className="action-icon" />
          <img src={dotsIcon} alt="More options" className="action-icon" />
        </div>
      </div>
      <div className="task-list">
        {tickets.map((ticket, index) => (
          <TaskCard 
            key={index} 
            ticket={ticket} 
            userData={ticket.user} // Pass user data to TaskCard
          />
        ))}
      </div>
    </div>
  );

  const renderPriorityColumn = (priority, tickets) => (
    <div className="kanban-column" key={priority}>
      <div className="column-header">
        <span>{priority}</span>
        <div className="column-actions">
          <img src={plusIcon} alt="Add" className="action-icon" />
          <img src={dotsIcon} alt="More options" className="action-icon" />
        </div>
      </div>
      <div className="task-list">
        {tickets.map((ticket, index) => (
          <TaskCard 
            key={index} 
            ticket={ticket} 
            userData={ticket.user} // Pass user data to TaskCard
          />
        ))}
      </div>
    </div>
  );

  const renderStatusColumn = (title, icon, tickets) => (
    <div className="kanban-column" key={title}>
      <div className="column-header">
        <img src={icon} alt={`${title} icon`} className="status-icon" />
        <span>{title}</span>
        <div className="column-actions">
          <img src={plusIcon} alt="Add" className="action-icon" />
          <img src={dotsIcon} alt="More options" className="action-icon" />
        </div>
      </div>
      <div className="task-list">
        {tickets.map((ticket, index) => (
          <TaskCard 
            key={index} 
            ticket={ticket} 
            userData={ticket.user} // Pass user data to TaskCard
          />
        ))}
      </div>
    </div>
  );

  const renderColumns = () => {
    if (preferences.groupBy === 'user') {
      return Object.keys(groupedTickets.users).map((userName) =>
        renderUserColumn(userName, groupedTickets.users[userName])
      );
    } else if (preferences.groupBy === 'priority') {
      return Object.keys(groupedTickets.priorities).map((priority) =>
        renderPriorityColumn(priority, groupedTickets.priorities[priority])
      );
    } else {
      // Default: group by status
      return (
        <>
          {renderStatusColumn('Backlog', backlogIcon, groupedTickets['Backlog'] || [])}
          {renderStatusColumn('To-do', todoIcon, groupedTickets['Todo'] || [])} 
          {renderStatusColumn('In Progress', inProgressIcon, groupedTickets['In progress'] || [])} 
          {renderStatusColumn('Done', doneIcon, groupedTickets['Done'] || [])}
          {renderStatusColumn('Canceled', canceledIcon, groupedTickets['Canceled'] || [])}
        </>
      );
    }
  };

  return (
    <div>
      <SortingAndGroupingControls preferences={preferences} setPreferences={setPreferences} />
      <div className="kanban-board">
        {renderColumns()}
      </div>
    </div>
  );
}

export default TicketList;
