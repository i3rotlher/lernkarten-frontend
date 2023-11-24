import { render, screen, fireEvent } from '@testing-library/react';
import RegisterPage from './RegisterPage';
import { BrowserRouter } from 'react-router-dom';

// Mock fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
  })
);

beforeEach(() => {
  fetch.mockClear();
});

it('erlaubt dem Benutzer sich zu registrieren', async () => {
  render(<RegisterPage />, { wrapper: BrowserRouter });

  // Benutzereingaben simulieren
  fireEvent.change(screen.getByPlaceholderText(/email/i), {
    target: { value: 'test@example.com' },
  });
  fireEvent.change(screen.getByPlaceholderText(/passwort/i), {
    target: { value: 'password123' },
  });

  // Formular einreichen
  fireEvent.click(screen.getByRole('button', { name: /registrieren/i }));

  // Überprüfen, ob die fetch-Methode aufgerufen wurde
  expect(fetch).toHaveBeenCalledWith('http://localhost:8080/users/register', expect.any(Object));
});

it('zeigt eine Fehlermeldung bei einem Fehler der API', async () => {
  // Mock fetch, um einen Fehler zu simulieren
  fetch.mockImplementationOnce(() =>
    Promise.resolve({
      ok: false,
      json: () => Promise.resolve({ message: 'Fehler bei der Registrierung' }),
    })
  );

  render(<RegisterPage />, { wrapper: BrowserRouter });

  // Formular einreichen
  fireEvent.click(screen.getByRole('button', { name: /registrieren/i }));

  // Warten auf die Fehlermeldung
  const errorMessage = await screen.findByText(/fehler bei der registrierung/i);
  expect(errorMessage).toBeInTheDocument();
});

it('zeigt eine Fehlermeldung bei einem Netzwerkfehler', async () => {
  // Mock fetch, um einen Netzwerkfehler zu simulieren
  fetch.mockImplementationOnce(() => Promise.reject(new Error('Netzwerkfehler')));

  render(<RegisterPage />, { wrapper: BrowserRouter });

  // Formular einreichen
  fireEvent.click(screen.getByRole('button', { name: /registrieren/i }));

  // Warten auf die Fehlermeldung
  const errorMessage = await screen.findByText(/es gab einen fehler bei der registrierung\./i);
  expect(errorMessage).toBeInTheDocument();
});
