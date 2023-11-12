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
  }, []); // Leere Abhängigkeitsliste, um den Effekt nur beim ersten Rendern zu triggern

  const loadData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/getData');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const getColorForUser = (userId) => {
    // Hier könntest du eine Logik hinzufügen, um für jeden Benutzer eine eindeutige Farbe zu generieren.
    // Eine einfache Möglichkeit ist, den Hash der Benutzer-ID zu verwenden und daraus eine Farbe abzuleiten.
    // Dies ist jedoch nur ein einfaches Beispiel und kann verbessert werden.
    const hash = userId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const hue = hash % 360; // Begrenze den Farbton auf 0-359
    return `hsl(${hue}, 70%, 80%)`; // Verwende HSL, um die Sättigung und Helligkeit zu steuern
  };

  return (
    <div>
      <h1>Display Page</h1>
      <ul>
        {data.map(({ id, user, data }) => (
          <li key={id} style={{ backgroundColor: getColorForUser(user) }}>
            {data} (User: {user})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DisplayPage;
