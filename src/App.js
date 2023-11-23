import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import HomePage from './components/HomePage/HomePage';
import BoxDetailPage from './components/BoxDetailPage/BoxDetailPage';
import BoxAddPage from './components/BoxAddPage/BoxAddPage';
import LearnPage from './components/LearnPage/LearnPage';
import CreateCardPage from './components/CreateCardPage/CreateCardPage';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/register" element={<RegisterPage onRegisterSuccess={() => console.log('Registrierung erfolgreich!')} />} />
          <Route path="/login" element={<LoginPage onLoginSuccess={() => console.log('Login erfolgreich!')} />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/box/:boxId" element={<BoxDetailPage />} />
          <Route path="/add-box" element={<BoxAddPage />} />
          <Route path="/learn/:boxId" element={<LearnPage />} />
          <Route path="/create-card/:boxId" element={<CreateCardPage />} /> {/* Angepasste Route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
