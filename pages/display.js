// pages/display.js

import React, { useState, useEffect } from 'react';

const DisplayPage = () => {
  const [data, setData] = useState([]);
  
useEffect(() => {
    loadData(); // Lade Daten sofort beim ersten Rendern

    // Aktualisiere die Daten alle 5 Sekunden
    const intervalId = setInterval(() => {
      loadData();
    }, 5000);

    // Bereinige den Timer, wenn die Komponente unmontiert wird
    return () => clearInterval(intervalId);
  }, []);

  const loadData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/getData');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  return (
    <div>
      <h1>Display Page</h1>
      <ul>
        {data.map(({ id, data }) => (
          <li key={id}>{data}</li>
        ))}
      </ul>
    </div>
  );
};

export default DisplayPage;

