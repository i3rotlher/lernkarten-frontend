import React, { useState } from 'react';
import './CreateCardPage.css'; // Stellen Sie sicher, dass Sie eine entsprechende CSS-Datei erstellen
import { useNavigate, useParams } from 'react-router-dom';

const CreateCardPage = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const navigate = useNavigate();
  const { boxId } = useParams();

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value);
  };

  const handleAnswerChange = (event) => {
    setAnswer(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const newCard = {
      frage: question,
      antwort: answer,
      karteiboxId: boxId, // Die Box-ID aus den URL-Parametern
    };
  
    try {
      const response = await fetch('http://localhost:8080/karteikarten/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(newCard)
      });
  
      if (!response.ok) {
        throw new Error('Fehler beim Hinzufügen der Karteikarte');
      }
  
      // Erfolgsmeldung anzeigen
      alert('Karteikarte erfolgreich hinzugefügt!');
      navigate(`/box/${boxId}`);
    } catch (error) {
      console.error('Fehler:', error);
      // Anzeigen einer Fehlermeldung
      alert('Fehler beim Hinzufügen der Karteikarte: ' + error.message);
    }
  };  

  return (
    <div className="create-card-container">
      <header className="create-card-header">
      <a href="#" onClick={(e) => { e.preventDefault(); navigate(-1); }}>&#x2190; Zurück</a>
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
