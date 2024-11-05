import React, { useEffect, useState } from 'react';
import TicketList from './components/TicketList';

function App() {
  const [tickets, setTickets] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        if (data.tickets && Array.isArray(data.tickets)) {
          setTickets(data.tickets); // Accessing tickets correctly
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
        <TicketList tickets={tickets} /> // Pass tickets to TicketList
      )}
    </div>
  );
}

export default App;
