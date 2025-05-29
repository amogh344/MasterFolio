import React, { useState, useEffect } from 'react';
import InvestmentForm from './InvestmentForm';
import InvestmentList from './InvestmentList';
import Login from './Login';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedEmail = localStorage.getItem('userEmail');
    const loginTime = localStorage.getItem('loginTime');

    if (savedEmail && loginTime) {
      const now = Date.now();
      const thirtyMinutes = 30 * 60 * 1000;

      if (now - loginTime < thirtyMinutes) {
        setUser(savedEmail);
      } else {
        // Timeout exceeded, clear stored data
        localStorage.removeItem('userEmail');
        localStorage.removeItem('loginTime');
      }
    }
  }, []);

  const handleLogin = (email) => {
    setUser(email);
    localStorage.setItem('userEmail', email);
    localStorage.setItem('loginTime', Date.now());
  };

  return (
    <div className="App" style={{ padding: '2rem' }}>
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : (
        <>
          <h2>Welcome, {user}</h2>
          <InvestmentForm />
          <hr />
          <InvestmentList />
        </>
      )}
    </div>
  );
}

export default App;