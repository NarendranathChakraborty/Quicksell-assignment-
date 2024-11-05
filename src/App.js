// src/App.js
import React, { useEffect, useState } from 'react';
import TicketList from './components/TicketList';
import SortingAndGroupingControls from './components/SortingAndGroupingControls';

function App() {
  const [tickets, setTickets] = useState([]);
  const [preferences, setPreferences] = useState({ groupBy: 'status', sortOrder: 'title' });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setTickets(data);
        } else {
          setTickets([]);
        }
      } catch (error) {
        setError('Failed to fetch tickets. Please try again later.');
      }
    };

    fetchTickets();
  }, []);

  return (
    <div>
      {error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : (
        <>
          <SortingAndGroupingControls 
            preferences={preferences} 
            setPreferences={setPreferences} 
          />
          <TicketList 
            tickets={tickets} 
            preferences={preferences} 
          />
        </>
      )}
    </div>
  );
}

export default App;
