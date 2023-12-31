import React, { useState, useEffect } from 'react';
import './LearnPage.css';
import { useNavigate, useParams } from 'react-router-dom';

const LearnPage = () => {
  const [cards, setCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [darkMode, setDarkMode] = useState(localStorage.getItem('darkMode') === 'true');
  const navigate = useNavigate();
  const { boxId } = useParams();

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }

    const fetchCards = async () => {
      try {
        const response = await fetch(`http://localhost:8080/karteikarten/karteibox/${boxId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Fehler beim Laden der Karteikarten');
        }

        const cardsData = await response.json();
        const unknownCards = cardsData.filter(card => !card.known);
        setCards(unknownCards);
      } catch (error) {
        console.error('Fehler:', error);
        navigate('/');
      }
    };

    fetchCards();
  }, [boxId, navigate, darkMode]);

  const markCardAsKnown = async (cardId, known) => {
    try {
      const response = await fetch(`http://localhost:8080/karteikarten/${cardId}/markAsKnown`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (!response.ok) {
        throw new Error('Fehler beim Markieren der Karte');
      }

      console.log(`Karteikarte ${cardId} als ${known ? 'gewusst' : 'nicht gewusst'} markiert`);
      setCurrentCardIndex(currentCardIndex + 1);
    } catch (error) {
      console.error('Fehler:', error);
    }
  };

  const handleKnown = () => {
    if (currentCardIndex < cards.length) {
      markCardAsKnown(cards[currentCardIndex].id, true);
    }
  };

  const handleUnknown = () => {
    console.log('Karteikarte als nicht gewusst markiert');
    setCurrentCardIndex(currentCardIndex + 1);
  };

  if (cards.length === 0) {
    return <div>Keine weiteren Karten zu lernen in dieser Box</div>;
  }

  if (currentCardIndex >= cards.length) {
    return <div>Alle Karten durchgegangen</div>;
  }

  const currentCard = cards[currentCardIndex];

  return (
    <div className="learn-container">
      <header className="learn-header">
        <a href="/" onClick={(e) => { e.preventDefault(); navigate('/'); }}>&#x2190; Zur Box</a>
      </header>
      <div className="card">
        <div className="question">{currentCard.frage}</div>
        <div className="answer">{currentCard.antwort}</div>
      </div>
      <footer className="card-actions">
        <button className="known-btn" onClick={handleKnown}>✓</button>
        <button className="unknown-btn" onClick={handleUnknown}>✗</button>
      </footer>
    </div>
  );
};

export default LearnPage;
