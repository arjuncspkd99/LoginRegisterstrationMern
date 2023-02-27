import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/login', { email, password });
      setMessage(res.data.message);
      setError('');
      localStorage.setItem('token', res.data.token); // Store JWT token in localStorage
      navigate('/home')
    } catch (err) {
      setMessage('');
      setError(err.response.data.error);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {message && <p>{message}</p>}
      {error && <p style={{color: 'red'}}>{error}</p>}
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email:</label>
        <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} />
        <br />
        <label htmlFor="password">Password:</label>
        <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
