import React, { useState } from 'react';
import './CreateCardPage.css'; // Stellen Sie sicher, dass Sie eine entsprechende CSS-Datei erstellen
import { useNavigate } from 'react-router-dom';

const CreateCardPage = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const navigate = useNavigate();

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logik zum Hinzufügen der Karteikarte
    navigate('/box-detail'); // Zurück zur Detailseite der Box
  };

  return (
    <div className="create-card-container">
      <header className="create-card-header">
        <a href="/">&#x2190; Karte erstellen</a> {/* Zurück-Pfeil */}
      </header>
      <form onSubmit={handleSubmit} className="create-card-form">
        <input
          type="text"
          placeholder="Frage"
          value={question}
          onChange={handleQuestionChange}
          required
        />
        <textarea
          placeholder="Antwort"
          value={answer}
          onChange={handleAnswerChange}
          required
        ></textarea>
        <button type="submit">Hinzufügen</button>
      </form>
    </div>
  );
};

export default CreateCardPage;
