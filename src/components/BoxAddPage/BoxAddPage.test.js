import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BoxAddPage from './BoxAddPage';

// Mock des useNavigate Hooks von react-router-dom
const mockedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('BoxAddPage', () => {
  test('renders BoxAddPage component', () => {
    render(<BoxAddPage />);
    
    expect(screen.getByPlaceholderText(/boxname/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/beschreibung/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /erstellen/i })).toBeInTheDocument();
  });

  test('allows user to enter box name and description', () => {
    render(<BoxAddPage />);
    
    fireEvent.change(screen.getByPlaceholderText(/boxname/i), { target: { value: 'Meine neue Box' } });
    fireEvent.change(screen.getByPlaceholderText(/beschreibung/i), { target: { value: 'Das ist eine Beschreibung.' } });
    
    expect(screen.getByPlaceholderText(/boxname/i).value).toBe('Meine neue Box');
    expect(screen.getByPlaceholderText(/beschreibung/i).value).toBe('Das ist eine Beschreibung.');
  });

  test('navigates user to homepage on successful box creation', () => {
    render(<BoxAddPage />);
    
    // Hier müssen Sie Ihre Logik zum Simulieren der Netzwerkanfrage einfügen
    
    fireEvent.click(screen.getByRole('button', { name: /erstellen/i }));
    
    // Annahme hier ist, dass die Navigation nach dem Erstellen der Box erfolgt
    expect(mockedNavigate).toHaveBeenCalledWith('/');
  });

  // Weitere Tests hier hinzufügen, um spezifische Interaktionen und Logik zu prüfen
});
