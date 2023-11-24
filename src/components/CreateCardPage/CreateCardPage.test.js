
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import CreateCardPage from './CreateCardPage';

// Mocks localStorage
const localStorageMock = (function() {
  let store = {};
  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    removeItem(key) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
})();
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mocks fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ id: '123' }),
    text: () => Promise.resolve('some-token'),
  })
);

describe('CreateCardPage', () => {
  beforeEach(() => {
    // Resets the mock fetch before each test
    fetch.mockClear();
    localStorageMock.clear();

    // Sets up a token in localStorage
    localStorageMock.setItem('token', 'test-token');
  });

  it('renders correctly', () => {
    render(
      <MemoryRouter initialEntries={['/create-card/1']}>
        <Routes>
          <Route path="/create-card/:boxId" element={<CreateCardPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByPlaceholderText('Frage')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Antwort')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Hinzufügen' })).toBeInTheDocument();
  });

  it('submits a new card', async () => {
    const { getByPlaceholderText, getByRole } = render(
      <MemoryRouter initialEntries={['/create-card/1']}>
        <Routes>
          <Route path="/create-card/:boxId" element={<CreateCardPage />} />
        </Routes>
      </MemoryRouter>
    );

    fireEvent.change(getByPlaceholderText('Frage'), { target: { value: 'Test Frage' } });
    fireEvent.change(getByPlaceholderText('Antwort'), { target: { value: 'Test Antwort' } });
    fireEvent.click(getByRole('button', { name: 'Hinzufügen' }));

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
  });

  // Add more tests as needed...
});
