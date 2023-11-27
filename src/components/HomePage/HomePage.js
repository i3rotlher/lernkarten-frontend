import React, { useState, useEffect } from 'react';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [boxes, setBoxes] = useState([]);
  const [error, setError] = useState('');
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }

    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      const user = parseJwt(token);
      if (user && user.sub) {
        fetchBoxes(user.sub);
      }
    }
  }, [navigate, darkMode]);

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
      return null;
    }
  };  

  const fetchBoxes = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8080/karteiboxen/user/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      if (!response.ok) {
        throw new Error('Fehler beim Laden der Boxen');
      }
  
      const boxesData = await response.json();
      const boxesWithProgress = await Promise.all(boxesData.map(async (box) => {
        const progressResponse = await fetch(`http://localhost:8080/karteiboxen/${box.id}/progress`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
  
        if (!progressResponse.ok) {
          throw new Error('Fehler beim Laden des Fortschritts');
        }
  
        const progress = await progressResponse.text();
        return { ...box, progress: progress };
      }));
  
      setBoxes(boxesWithProgress);
    } catch (error) {
      setError(error.toString());
    }
  };
  
  

  const handleBoxClick = (boxId) => {
    navigate(`/box/${boxId}`);
  };

  const handleAddBoxClick = () => {
    navigate('/add-box');
  };

  const handleDeleteAccount = async () => {
    const confirmation = window.confirm("Sind Sie sicher, dass Sie Ihr Konto löschen möchten?");
    if (!confirmation) {
      return; // Abbrechen, wenn der Benutzer nicht bestätigt
    }

    try {
      const token = localStorage.getItem('token');
      const user = parseJwt(token);

      if (!user || !user.sub) {
        throw new Error('Benutzer-ID nicht gefunden');
      }

      const response = await fetch(`http://localhost:8080/users/${user.sub}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Fehler beim Löschen des Kontos');
      }

      // Konto erfolgreich gelöscht
      localStorage.removeItem('token'); // Token aus dem lokalen Speicher entfernen
      navigate('/login');
    } catch (error) {
      console.error('Fehler:', error);
      setError('Fehler beim Löschen des Kontos');
    }
  };

  return (
    <div className="home-container">
      <header className="header">
        <h1>Deine Boxen</h1>
        <button className="delete-account-btn" onClick={handleDeleteAccount}>Account Löschen</button>
      </header>
      <div className="boxes">
        {boxes.map((box) => (
          <div key={box.id} className="box" onClick={() => handleBoxClick(box.id)}>
            <span>{box.name}</span>
            <div className="progress">
              <div className="progress-bar" style={{ width: `${box.progress}%` }}>{box.progress}%</div>
            </div>
          </div>
        ))}
      </div>
      {/* Hinzufügen eines onClick-Event-Handlers zum Add-Box-Button */}
      <button className="add-box-btn" onClick={handleAddBoxClick}>+</button>
    </div>
  );
};

export default HomePage;
