import React from 'react';
import './HomePage.css'; // Stellen Sie sicher, dass Sie eine entsprechende CSS-Datei erstellen
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const handleBoxClick = (boxId) => {
    navigate(`/box/${boxId}`);
  };

  const handleAddBoxClick = () => {
    navigate('/add-box');
  };
  // Beispiel-Daten, ersetzen Sie diese durch echte Daten aus Ihrem Backend
  const boxes = [
    { id: 1, name: 'Boxname 1', progress: 75 },
    { id: 2, name: 'Boxname 2', progress: 50 },
    { id: 3, name: 'Boxname 3', progress: 100 },
  ];

  return (
    <div className="home-container">
      <header className="header">
        <h1>Deine Boxen</h1>
        <button className="delete-account-btn">Account Löschen</button>
      </header>
      <div className="boxes">
        {boxes.map((box) => (
          <div key={box.id} className="box">
            <span>{box.name}</span>
            <div className="progress">
              <div className="progress-bar" style={{ width: `${box.progress}%` }}>{box.progress}%</div>
            </div>
          </div>
        ))}
      </div>
      <button className="add-box-btn">+</button>
    </div>
  );
};

export default HomePage;
