import React from 'react';
import './LearnPage.css'; // Stellen Sie sicher, dass Sie eine entsprechende CSS-Datei erstellen

const LearnPage = () => {
  // Beispiel für Karteikarten-Daten, diese sollten aus Ihrem Backend kommen
  const card = {
    question: 'Frage',
    answer: 'Antwort'
  };

  // Funktionen zum Verwalten der Logik für "gewusst" oder "nicht gewusst"
  const handleKnown = () => {
    // Logik für "gewusst"
    console.log('Karteikarte als gewusst markiert');
  };

  const handleUnknown = () => {
    // Logik für "nicht gewusst"
    console.log('Karteikarte als nicht gewusst markiert');
  };

  return (
    <div className="learn-container">
      <header className="learn-header">
        <a href="/">&#x2190; Boxname</a> {/* Zurück-Pfeil und Boxname */}
        <button className="delete-btn">Löschen</button>
      </header>
      <div className="card">
        <div className="question">{card.question}</div>
        <div className="answer">{card.answer}</div>
      </div>
      <footer className="card-actions">
        <button className="known-btn" onClick={handleKnown}>✓</button>
        <button className="unknown-btn" onClick={handleUnknown}>✗</button>
      </footer>
    </div>
  );
};

export default LearnPage;
