// Importieren Sie die benötigten Hilfsmittel für das Testen
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoginPage from './LoginPage';

// Mock `useNavigate` von `react-router-dom`
const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}));

// Mock `fetch` Funktion
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    text: () => Promise.resolve('fake-token'),
  })
);

describe('LoginPage', () => {
  beforeEach(() => {
    // Setzt den Mock für jeden Test zurück
    fetch.mockClear();
    mockedUseNavigate.mockClear();
  });

  it('should allow a user to log in', async () => {
    const { getByPlaceholderText, getByText } = render(<LoginPage />);

    // Simulieren von Eingaben in die E-Mail- und Passwort-Felder
    fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'user@example.com' } });
    fireEvent.change(getByPlaceholderText('Passwort'), { target: { value: 'password' } });

    // Simulieren des Absendens des Formulars
    fireEvent.click(getByText('Login'));

    // Warten Sie darauf, dass der Mock-Navigationsaufruf getätigt wird
    await waitFor(() => expect(mockedUseNavigate).toHaveBeenCalledWith('/'));

    // Überprüfen Sie, ob der Token im localStorage gespeichert wurde
    expect(localStorage.getItem('token')).toBe('fake-token');
  });

  it('should show an error message for failed login attempt', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
      })
    );

    const { getByPlaceholderText, getByText, findByText } = render(<LoginPage />);

    fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'user@example.com' } });
    fireEvent.change(getByPlaceholderText('Passwort'), { target: { value: 'password' } });

    fireEvent.click(getByText('Login'));

    const errorMessage = await findByText('Login fehlgeschlagen. Bitte überprüfen Sie Ihre Anmeldeinformationen.');

    expect(errorMessage).toBeInTheDocument();
  });

  // Weitere Tests hinzufügen...
});

// Hinzufügen von Cleanup nach den Tests
afterEach(() => {
  jest.restoreAllMocks();
});
