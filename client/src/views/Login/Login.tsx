import React from 'react';

// imports the dual purpose auth form
import LoginSignup from '../../components/LoginSignup';
import NavBar from '../../components/NavBar';

interface Props {
  user?: any;
}

const Login: React.FC<Props> = ({ user }) => {
  return (
    <>
      <NavBar />
      {/* tell the auth form to display the appropriate classes/text for a login view */}
      <LoginSignup currView="login" user={user} />
    </>
  );
};

export default Login;
