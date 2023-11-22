import React, { useState } from 'react';
import './RegisterPage.css'; // Stellen Sie sicher, dass Sie eine entsprechende CSS-Datei erstellen

const RegisterPage = ({ onRegisterSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Registriert mit:', email, password);
    // Hier würden Sie die Registrierungslogik mit Ihrem Backend integrieren.
    // onRegisterSuccess(); // Aufrufen, wenn die Registrierung erfolgreich ist.
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
      </form>
    </div>
  );
};

export default RegisterPage;
