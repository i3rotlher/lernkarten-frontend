import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BoxAddPage from './BoxAddPage';
import { BrowserRouter } from 'react-router-dom';

describe('BoxAddPage', () => {
  const mockNavigate = jest.fn();
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
  }));

  beforeEach(() => {
    render(<BoxAddPage />, { wrapper: BrowserRouter });
  });

  it('sollte das Formular mit zwei Eingabefeldern und einem Button rendern', () => {
    expect(screen.getByPlaceholderText('Boxname')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Beschreibung')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /erstellen/i })).toBeInTheDocument();
  });

  it('sollte die Eingabewerte aktualisieren, wenn der Benutzer in die Felder tippt', () => {
    fireEvent.change(screen.getByPlaceholderText('Boxname'), { target: { value: 'Neue Box' } });
    fireEvent.change(screen.getByPlaceholderText('Beschreibung'), { target: { value: 'Beschreibung der neuen Box' } });
    expect(screen.getByPlaceholderText('Boxname').value).toBe('Neue Box');
    expect(screen.getByPlaceholderText('Beschreibung').value).toBe('Beschreibung der neuen Box');
  });

  it('sollte beim Absenden des Formulars navigieren', () => {
    fireEvent.click(screen.getByRole('button', { name: /erstellen/i }));
    expect(mockNavigate).toHaveBeenCalled();
  });
});
