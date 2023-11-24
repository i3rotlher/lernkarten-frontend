
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import BoxDetailPage from './BoxDetailPage';

// Mocking the useParams hook
const mockUseParams = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => mockUseParams(),
  useNavigate: () => jest.fn()
}));

// Mocking fetch calls
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ id: '1', name: 'Test Box', beschreibung: 'Test Beschreibung', progress: '50' }),
    ok: true,
    text: () => Promise.resolve('50'),
  })
);

describe('BoxDetailPage', () => {
  beforeEach(() => {
    fetch.mockClear();
    mockUseParams.mockReturnValue({ boxId: '1' });
  });

  it('renders the BoxDetailPage and displays a box', async () => {
    render(
      <MemoryRouter>
        <BoxDetailPage />
      </MemoryRouter>
    );

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));

    expect(screen.getByText('Test Box')).toBeInTheDocument();
    expect(screen.getByText('Test Beschreibung')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument();
  });

  it('handles delete click', async () => {
    window.confirm = jest.fn(() => true); // Mock window.confirm to always return true
    const navigate = jest.fn();

    render(
      <MemoryRouter>
        <BoxDetailPage />
      </MemoryRouter>
    );

    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(2));
    fireEvent.click(screen.getByText('Box Löschen'));

    await waitFor(() => expect(window.confirm).toHaveBeenCalledWith('Sind Sie sicher, dass Sie diese Box löschen möchten?'));
    await waitFor(() => expect(fetch).toHaveBeenCalledTimes(3));
    await waitFor(() => expect(navigate).toHaveBeenCalledWith('/'));
  });
});

export {};
