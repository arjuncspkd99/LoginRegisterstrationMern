import React, { useState } from 'react';
import './App.css';
import Login from './components/Login';
import Registration from './components/Registration';
import RegistrationLoginPage from './components/RegistrationLoginPage';
import Home from './components/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [showRegistration, setShowRegistration] = useState(true);
  const [showLogin, setShowLogin] = useState(false);

  const handleShowRegistration = () => {
    setShowRegistration(true);
    setShowLogin(false);
  };

  const handleShowLogin = () => {
    setShowLogin(true);
    setShowRegistration(false);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <>
                {showRegistration && <RegistrationLoginPage />}
                {showLogin && <Login />}
                {!showRegistration && !showLogin && (
                  <>
                    <button onClick={handleShowRegistration}>Register</button>
                    <button onClick={handleShowLogin}>Login</button>
                  </>
                )}
              </>
            }
          />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
