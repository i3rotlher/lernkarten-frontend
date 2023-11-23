import React, { useState } from 'react';
import './RegisterPage.css';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:8080/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      if (response.ok) {
        // Sie könnten die Antwort des Backend auswerten, um zu bestätigen, dass die Registrierung erfolgreich war
        navigate('/'); // Umleitung zur Homepage bei erfolgreicher Registrierung
      } else {
        // Wenn es einen Fehler gab, können Sie die Fehlermeldung aus der Antwort extrahieren
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      // Hier fangen Sie Netzwerkfehler und andere unerwartete Fehler ab
      setError('Es gab einen Fehler bei der Registrierung.');
    }
  };

  return (
    <div className="register-container">
      <h1>LERNKARTENAPP</h1>
      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
          required
        />
        <input
          type="password"
          placeholder="Passwort"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <button type="submit">Registrieren</button>
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
};

export default RegisterPage;
