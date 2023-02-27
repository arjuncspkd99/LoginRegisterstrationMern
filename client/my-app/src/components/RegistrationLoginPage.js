import React, { useState } from 'react';
import Registration from './Registration';
import Login from './Login';

const RegistrationLoginPage = () => {
  const [isRegistering, setIsRegistering] = useState(true);

  const handleSwitchToLogin = () => {
    setIsRegistering(false);
  };

  const handleSwitchToRegistration = () => {
    setIsRegistering(true);
  };

  return (
    <div >
      {isRegistering ? <Registration /> : <Login />}
      <p>{isRegistering ? "Already have an account? " : "Don't have an account? "}<button onClick={isRegistering ? handleSwitchToLogin : handleSwitchToRegistration}>{isRegistering ? "Login" : "Register"}</button></p>
    </div>
  );
};

export default RegistrationLoginPage;