import React, { useState } from 'react';
import './BoxAddPage.css'; // Stellen Sie sicher, dass Sie eine entsprechende CSS-Datei erstellen

const BoxAddPage = () => {
  const [boxName, setBoxName] = useState('');
  const [description, setDescription] = useState('');

  const handleBoxNameChange = (event) => {
    setBoxName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Logik zum Hinzufügen der Box
    console.log('Box erstellen mit:', boxName, description);
    // Hier würden Sie die Logik implementieren, um die Daten an Ihr Backend zu senden
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
