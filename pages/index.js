// pages/index.js
"use client"
import React, { useState, useEffect } from 'react';

const Home = () => {
  const [inputValue, setInputValue] = useState('');
  const [displayedData, setDisplayedData] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/getData');
      const jsonData = await response.json();
      setDisplayedData(jsonData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const handleInputSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/saveData', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: 'exampleUser', data: inputValue }),
      });

      const result = await response.json();

      if (result.success) {
        loadData(); // Aktualisiere die angezeigten Daten nach dem Speichern
        setInputValue(''); // Optional: Setze den Input-Wert zurück
      } else {
        console.error('Error saving data:', result.error);
      }
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <div>
      <h1>Next.js Data Input Example</h1>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button onClick={handleInputSubmit}>Submit</button>
      </div>
     
    </div>
  );
};

export default Home;

