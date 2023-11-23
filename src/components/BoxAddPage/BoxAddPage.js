import React, { useState } from 'react';
import './BoxAddPage.css';
import { useNavigate } from 'react-router-dom';

const BoxAddPage = () => {
  const [boxName, setBoxName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };

  const handleBoxNameChange = (event) => {
    setBoxName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = localStorage.getItem('token');
    const user = parseJwt(token);
    if (!user || !user.sub) {
      console.error('Fehler: Benutzer ist nicht eingeloggt oder die ID ist nicht verfügbar.');
      return;
    }

    const newBox = {
      name: boxName,
      beschreibung: description,
      userId: user.sub, // Setzen der Benutzer-ID aus dem Token
      karteikartenIds: []
    };

    try {
      const response = await fetch('http://localhost:8080/karteiboxen/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(newBox)
      });

      if (response.ok) {
        navigate('/'); // Zurück zur Homepage nach erfolgreicher Erstellung
      } else {
        // Fehlerbehandlung, z.B. Anzeige einer Fehlermeldung
        console.error('Fehler beim Erstellen der Box');
      }
    } catch (error) {
      console.error('Netzwerkfehler:', error);
    }
  };

  return (
    <div className="box-add-container">
      <header className="box-add-header">
        <a href="/">&#x2190;</a> {/* Zurück-Pfeil */}
        <h1>Box Erstellen</h1>
      </header>
      <form onSubmit={handleSubmit} className="box-add-form">
        <input
          type="text"
          placeholder="Boxname"
          value={boxName}
          onChange={handleBoxNameChange}
          required
        />
        <textarea
          placeholder="Beschreibung"
          value={description}
          onChange={handleDescriptionChange}
          required
        ></textarea>
        <button type="submit">Erstellen</button>
      </form>
    </div>
  );
};

export default BoxAddPage;
