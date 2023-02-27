import React, { useState } from 'react';
import axios from 'axios';

const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/api/register', { email, password });
      alert('Registration successful!');
    } catch (err) {
      setErrors(err.response.data);
    }
  };

  return (
    <div>
      <form>
      <h2>Register</h2>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} />
          {errors.email && <div>{errors.email}</div>}
      </div>
      <div>
        <label>Password:</label>
        <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} />
          {errors.password && <div>{errors.password}</div>}
      </div>
      <button onClick={handleRegister}>Register</button>
    </form>
    </div>
  );
};

export default Registration;