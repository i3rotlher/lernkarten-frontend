import React, { useState } from 'react';
import './LoginPage.css'; // Stellen Sie sicher, dass die CSS-Datei den gleichen Namen hat
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Hier die Authentifizierungslogik implementieren ...
    // Wenn erfolgreich:
    navigate('/');
  };

  return (
    <div className="login-container">
      <h1>LERNKARTENAPP</h1>
      <form onSubmit={handleSubmit} className="login-form">
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
        <button type="submit">Login</button>
      </form>
      <div className="register-link">
        Kein Account? <a href="/register">Registrieren</a>
      </div>
    </div>
  );
};

export default LoginPage;
