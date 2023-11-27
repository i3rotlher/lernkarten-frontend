import React, { useState, useEffect } from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    };

    try {
      const response = await fetch('http://localhost:8080/users/login', requestOptions);

      if (response.ok) {
        const token = await response.text(); // Der Token als Klartext
        localStorage.setItem('token', token); // Speichern des Tokens im localStorage
        navigate('/'); // Umleitung zur Homepage bei erfolgreicher Anmeldung
      } else {
        // Wenn es einen Fehler gab, setzen Sie eine Fehlermeldung
        setError('Login fehlgeschlagen. Bitte überprüfen Sie Ihre Anmeldeinformationen.');
      }
    } catch (error) {
      // Hier fangen Sie Netzwerkfehler und andere unerwartete Fehler ab
      setError('Es gab einen Fehler beim Login.');
    }
  };

  const toggleDarkMode = () => {
    localStorage.setItem('darkMode', !darkMode);
    setDarkMode(!darkMode);
  };

  return (
    <div className="login-container">
      <label className="dark-mode-switch">
        Dark Mode:
        <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
      </label>
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
        {error && <div className="error-message">{error}</div>}
      </form>
      <div className="register-link">
        Kein Account? <a href="/register">Registrieren</a>
      </div>
    </div>
  );
};

export default LoginPage;
