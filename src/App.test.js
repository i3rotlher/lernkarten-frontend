import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock-Komponenten für die verschiedenen Seiten
jest.mock('./components/LoginPage/LoginPage', () => () => <div>LoginPage</div>);
jest.mock('./components/RegisterPage/RegisterPage', () => () => <div>RegisterPage</div>);
jest.mock('./components/HomePage/HomePage', () => () => <div>HomePage</div>);
jest.mock('./components/BoxDetailPage/BoxDetailPage', () => () => <div>BoxDetailPage</div>);
jest.mock('./components/BoxAddPage/BoxAddPage', () => () => <div>BoxAddPage</div>);
jest.mock('./components/LearnPage/LearnPage', () => () => <div>LearnPage</div>);
jest.mock('./components/CreateCardPage/CreateCardPage', () => () => <div>CreateCardPage</div>);

describe('App Routing', () => {
  it('zeigt die HomePage auf der Hauptseite', () => {
    render(<App />);
    expect(screen.getByText('HomePage')).toBeInTheDocument();
  });

  it('zeigt die LoginPage auf dem /login Pfad', () => {
    render(<App />, { route: '/login' });
    expect(screen.getByText('LoginPage')).toBeInTheDocument();
  });

  it('zeigt die RegisterPage auf dem /register Pfad', () => {
    render(<App />, { route: '/register' });
    expect(screen.getByText('RegisterPage')).toBeInTheDocument();
  });

  // Ähnliche Tests für die anderen Routen
  it('zeigt die BoxDetailPage auf dem /box/:boxId Pfad', () => {
    render(<App />, { route: '/box/123' });
    expect(screen.getByText('BoxDetailPage')).toBeInTheDocument();
  });

  it('zeigt die BoxAddPage auf dem /add-box Pfad', () => {
    render(<App />, { route: '/add-box' });
    expect(screen.getByText('BoxAddPage')).toBeInTheDocument();
  });

  it('zeigt die LearnPage auf dem /learn/:boxId Pfad', () => {
    render(<App />, { route: '/learn/123' });
    expect(screen.getByText('LearnPage')).toBeInTheDocument();
  });

  it('zeigt die CreateCardPage auf dem /create-card/:boxId Pfad', () => {
    render(<App />, { route: '/create-card/123' });
    expect(screen.getByText('CreateCardPage')).toBeInTheDocument();
  });
});
