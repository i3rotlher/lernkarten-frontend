import React, { useState, useEffect } from 'react';
import './BoxDetailPage.css';
import { useNavigate, useParams } from 'react-router-dom';

const BoxDetailPage = () => {
  const [box, setBox] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { boxId } = useParams();

  const parseJwt = (token) => {
    try {
      const decoded = JSON.parse(atob(token.split('.')[1]));
      return decoded.sub; // oder ein anderer Schlüssel, der die Benutzer-ID enthält
    } catch (e) {
      return null;
    }
  };
  

  useEffect(() => {
    const fetchBoxDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = parseJwt(token);
    
        if (!userId) {
          throw new Error('Benutzer-ID nicht gefunden');
        }
    
        const response = await fetch(`http://localhost:8080/karteiboxen/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error('Fehler beim Laden der Boxen');
        }
  
        const boxes = await response.json();
        const foundBox = boxes.find(b => b.id.toString() === boxId);
  
        if (foundBox) {
          const progressResponse = await fetch(`http://localhost:8080/karteiboxen/${foundBox.id}/progress`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
  
          if (!progressResponse.ok) {
            throw new Error('Fehler beim Laden des Fortschritts');
          }
  
          const progress = await progressResponse.text();
          setBox({ ...foundBox, progress: progress });
        } else {
          throw new Error('Box nicht gefunden');
        }
      } catch (error) {
        console.error('Fehler:', error);
        setError('Fehler beim Laden der Boxdetails');
      }
    };
  
    fetchBoxDetails();
  }, [boxId, navigate]);

  const handleLearnClick = () => {
    navigate(`/learn/${boxId}`);
  };

  const handleAddCardClick = () => {
    navigate(`/create-card/${boxId}`);
  };

  const handleDeleteBoxClick = async () => {
    // Anzeigen eines Bestätigungsdialogs vor dem Löschen
    if (window.confirm('Sind Sie sicher, dass Sie diese Box löschen möchten?')) {
      try {
        const response = await fetch(`http://localhost:8080/karteiboxen/${boxId}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Fehler beim Löschen der Box');
        }

        // Weiterleitung zur Homepage nach dem Löschen
        navigate('/');
      } catch (error) {
        console.error('Fehler:', error);
        // Fehlerbehandlung ...
      }
    }
  };


  if (!box) {
    return <div>Laden...</div>;
  }

  return (
    <div className="box-detail-container">
      <header className="box-header">
        <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>&#x2190;</a>
        <h1>{box.name}</h1>
        <div className="progress">
          <div className="progress-bar" style={{ width: `${box.progress}%` }}>
            {box.progress}%
          </div>
        </div>
      </header>
      <p>{box.beschreibung}</p>
      <div className="actions">
        <button className="action-btn" onClick={handleLearnClick}>Box Lernen</button>
        <button className="action-btn" onClick={handleAddCardClick}>Karteikarte hinzufügen</button>
        <button className="action-btn delete" onClick={handleDeleteBoxClick}>Box Löschen</button>
      </div>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default BoxDetailPage;
