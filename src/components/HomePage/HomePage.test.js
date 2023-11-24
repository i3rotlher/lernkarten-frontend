
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from './HomePage';
import { BrowserRouter as Router } from 'react-router-dom';

// Mocking fetch call
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve([
      { id: 1, name: 'Boxname 1', progress: '75' },
      { id: 2, name: 'Boxname 2', progress: '50' },
      { id: 3, name: 'Boxname 3', progress: '100' }
    ]),
    ok: true,
  }),
);

// Mocking localStorage
const localStorageMock = (function() {
  let store = {};
  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Mocking navigate function from useNavigate hook
const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));

describe('HomePage', () => {
  beforeEach(() => {
    fetch.mockClear();
    mockedNavigate.mockClear();
    localStorageMock.clear();
    localStorageMock.setItem('token', 'fake-token');
  });

  test('renders HomePage component', () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );

    // Verify that the header is in the document
    expect(screen.getByText('Deine Boxen')).toBeInTheDocument();
  });

  test('calls fetch with correct endpoint', () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );

    // Verify that the fetch was called with the correct endpoint
    expect(fetch).toHaveBeenCalledWith('http://localhost:8080/karteiboxen/user/undefined', {
      headers: {
        Authorization: 'Bearer fake-token',
      },
    });
  });

  test('renders boxes when fetch returns data', async () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );

    // Verify that the boxes are rendered on the screen
    const boxElements = await screen.findAllByRole('button', { name: /Boxname \d/ });
    expect(boxElements).toHaveLength(3);
  });

  test('navigates to add box page when add box button is clicked', () => {
    render(
      <Router>
        <HomePage />
      </Router>
    );

    // Click on the add box button
    fireEvent.click(screen.getByText('+'));

    // Verify that the navigation was called with the correct route
    expect(mockedNavigate).toHaveBeenCalledWith('/add-box');
  });

  // More tests can be added as needed...
});

