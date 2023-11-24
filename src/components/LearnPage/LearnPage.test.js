import { render, screen, fireEvent } from '@testing-library/react';
import LearnPage from './LearnPage';
import { BrowserRouter } from 'react-router-dom';

// Mock fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([]), // leere Liste von Karten als Antwort
    ok: true,
  })
);

beforeEach(() => {
  fetch.mockClear();
});

it('lädt Karten beim Start', async () => {
  render(<LearnPage />, { wrapper: BrowserRouter });

  // Überprüfen, ob die fetch-Methode aufgerufen wurde
  expect(fetch).toHaveBeenCalled();
});

it('markiert Karte als gewusst', async () => {
  render(<LearnPage />, { wrapper: BrowserRouter });

  // Mock fetch für das Markieren als gewusst
  fetch.mockImplementationOnce(() =>
    Promise.resolve({
      ok: true,
    })
  );

  // Klick auf den "gewusst" Button
  const knownButton = screen.getByRole('button', { name: '✓' });
  fireEvent.click(knownButton);

  // Überprüfen, ob die fetch-Methode aufgerufen wurde
  expect(fetch).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({
    method: 'POST',
  }));
});

it('markiert Karte als nicht gewusst', async () => {
  render(<LearnPage />, { wrapper: BrowserRouter });

  // Klick auf den "nicht gewusst" Button
  const unknownButton = screen.getByRole('button', { name: '✗' });
  fireEvent.click(unknownButton);

  // Überprüfen, ob keine Netzwerkanfrage für "nicht gewusst" gesendet wurde
  expect(fetch).not.toHaveBeenCalledWith(expect.any(String), expect.objectContaining({
    method: 'POST',
  }));
});

it('zeigt Fehlermeldung bei Netzwerkfehler', async () => {
  // Mock fetch, um einen Netzwerkfehler zu simulieren
  fetch.mockImplementationOnce(() => Promise.reject('Netzwerkfehler'));

  render(<LearnPage />, { wrapper: BrowserRouter });

  // Überprüfen, ob eine Fehlermeldung angezeigt wird
  const errorMessage = await screen.findByText('Fehler beim Laden der Karteikarten');
  expect(errorMessage).toBeInTheDocument();
});
