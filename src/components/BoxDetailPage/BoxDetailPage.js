import React from 'react';
import './BoxDetailPage.css'; // Stellen Sie sicher, dass Sie eine entsprechende CSS-Datei erstellen
import { useNavigate } from 'react-router-dom';

const BoxDetailPage = () => {
  const navigate = useNavigate();

  const handleLearnClick = () => {
    // Logik zum Starten des Lernprozesses
  };

  const handleAddCardClick = () => {
    navigate('/create-card');
  };

  const handleDeleteBoxClick = () => {
    // Bestätigungsdialog anzeigen und bei Bestätigung:
    // Logik zum Löschen der Box
    navigate('/');
  };
  // Beispiel-Box-Daten, ersetzen Sie diese durch echte Daten aus Ihrem Backend
  const box = {
    id: 1,
    name: 'Boxname',
    description: 'Beschreibung der Box',
    progress: 75
  };

  return (
    <div className="box-detail-container">
      <header className="box-header">
        <a href="/">&#x2190;</a> {/* Zurück-Pfeil */}
        <h1>{box.name}</h1>
        <div className="progress">
          <div className="progress-bar" style={{ width: `${box.progress}%` }}>
            {box.progress}%
          </div>
        </div>
      </header>
      <p>{box.description}</p>
      <div className="actions">
        <button className="action-btn">Box Lernen</button>
        <button className="action-btn">Karteikarte hinzufügen</button>
        <button className="action-btn delete">Box Löschen</button>
      </div>
    </div>
  );
};

export default BoxDetailPage;
