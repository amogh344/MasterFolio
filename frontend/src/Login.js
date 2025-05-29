import React, { useState } from 'react';
import './Login.css';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      alert('Please enter a valid email.');
      return;
    }

    localStorage.setItem('userEmail', email);
    onLogin(email);
  };

  return (
    <div className="login-outer-container">
      {/* Branding should be outside login-container to sit on top */}
      <div className="branding-title">Masterfolio</div>

      <div className="login-container">
        <div className="login-box">
          <h2>Login</h2>
          <form className="login-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
