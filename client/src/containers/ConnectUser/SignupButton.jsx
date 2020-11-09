import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import ConnectUser from './ConnectUser';
import './SignupButton.scss';

const SignupButton = props => {
  const { user } = useSelector(state => state);
  const [modalShow, setModalShow] = useState(false);
  const [signupShow, setSignupShow] = useState(true);
  
  useEffect(() => {
    if (user && user.token !== '') setSignupShow(false);
  }, [user]);

  const signup = () => {
    setModalShow(true);
  };

  return (
    <div className="SignupButton">
      {signupShow ?
        <button className="signup" onClick={signup}>
          {props.label}
        </button> :''}

      <ConnectUser
        onHide={() => setModalShow(false)}
        show={modalShow}
        showSignup={true}
        user={user}
      />
    </div>
  );
};

export default SignupButton;
