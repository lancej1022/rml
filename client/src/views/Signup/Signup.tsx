import React from 'react';

// imports the dual purpose auth form
import LoginSignup from '../../components/LoginSignup';
import NavBar from '../../components/NavBar';

interface Props {
  user?: any;
}

const Signup: React.FC<Props> = ({ user }) => {
  return (
    <>
      <NavBar />
      {/* tell the auth form to display the appropriate classes/text for a signup view */}
      <LoginSignup currView="signup" user={user} />
    </>
  );
};

export default Signup;
